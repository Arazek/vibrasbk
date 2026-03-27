import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';

// Exclude non-SBK-relevant Spanish-speaking territories
const EXCLUDED_CODES = ['GQ', 'EH']; // Equatorial Guinea, Western Sahara

// Mapping from ISO code to English name as used by countriesnow.space
const COUNTRY_ENGLISH_NAMES: Record<string, string> = {
  AR: 'Argentina', BO: 'Bolivia', CL: 'Chile', CO: 'Colombia',
  CR: 'Costa Rica', CU: 'Cuba', DO: 'Dominican Republic', EC: 'Ecuador',
  SV: 'El Salvador', GT: 'Guatemala', HN: 'Honduras', MX: 'Mexico',
  NI: 'Nicaragua', PA: 'Panama', PY: 'Paraguay', PE: 'Peru',
  ES: 'Spain', UY: 'Uruguay', VE: 'Venezuela',
};

interface RestCountryItem {
  name: { common: string };
  cca2: string;
  capital?: string[];
  latlng?: number[];
  translations?: { spa?: { common?: string } };
}

interface CountriesNowItem {
  country: string;
  cities: string[];
}

@Injectable()
export class CountriesService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,
    @InjectRepository(City)
    private cityRepo: Repository<City>,
    private dataSource: DataSource,
  ) {}

  async onApplicationBootstrap() {
    const countryCount = await this.countryRepo.count();
    if (countryCount === 0) {
      await this.seedCountries();
    }
    const cityCount = await this.cityRepo.count();
    if (cityCount === 0) {
      await this.seedCities();
    }
    await this.migrateExistingUsers();
  }

  private async seedCountries(): Promise<void> {
    try {
      const res = await fetch(
        'https://restcountries.com/v3.1/lang/spa?fields=name,cca2,capital,latlng,translations',
      );
      const data: RestCountryItem[] = await res.json();

      const countries = data
        .filter((c) => !EXCLUDED_CODES.includes(c.cca2))
        .map((c) =>
          this.countryRepo.create({
            name: c.translations?.spa?.common ?? c.name.common,
            code: c.cca2,
            capital: c.capital?.[0] ?? '',
            lat: c.latlng?.[0] ?? null,
            lng: c.latlng?.[1] ?? null,
          }),
        );

      await this.countryRepo.save(countries);
      console.log(`Seeded ${countries.length} countries.`);
    } catch (err) {
      console.error('Failed to seed countries from RestCountries API:', err);
    }
  }

  private async seedCities(): Promise<void> {
    try {
      const res = await fetch('https://countriesnow.space/api/v0.1/countries');
      const json: { error: boolean; data: CountriesNowItem[] } = await res.json();
      if (json.error) return;

      const countries = await this.countryRepo.find();
      const codeToCountry = new Map(countries.map((c) => [c.code, c]));

      // Build reverse map: english name → country entity
      const englishToCountry = new Map<string, Country>();
      for (const [code, englishName] of Object.entries(COUNTRY_ENGLISH_NAMES)) {
        const country = codeToCountry.get(code);
        if (country) englishToCountry.set(englishName.toLowerCase(), country);
      }

      const cityEntities: City[] = [];
      for (const item of json.data) {
        const country = englishToCountry.get(item.country.toLowerCase());
        if (!country) continue;

        for (const cityName of item.cities) {
          if (!cityName?.trim()) continue;
          cityEntities.push(this.cityRepo.create({ name: cityName.trim(), countryId: country.id }));
        }
      }

      // Batch insert to avoid overwhelming the DB
      const BATCH = 500;
      for (let i = 0; i < cityEntities.length; i += BATCH) {
        await this.cityRepo.save(cityEntities.slice(i, i + BATCH));
      }
      console.log(`Seeded ${cityEntities.length} cities.`);
    } catch (err) {
      console.error('Failed to seed cities from countriesnow API:', err);
    }
  }

  private async migrateExistingUsers(): Promise<void> {
    try {
      const spain = await this.countryRepo.findOne({ where: { code: 'ES' } });
      if (!spain) return;

      const schema = process.env.DB_SCHEMA || 'vibrasbk';
      const result = await this.dataSource.query(
        `UPDATE ${schema}.users SET country_id = $1 WHERE country_id IS NULL`,
        [spain.id],
      );
      if (result[1] > 0) {
        console.log(`Migrated ${result[1]} existing users to Spain (countryId).`);
      }
    } catch (err) {
      console.error('Failed to migrate existing users countryId:', err);
    }
  }

  findAll(): Promise<Country[]> {
    return this.countryRepo.find({ order: { name: 'ASC' } });
  }

  findOne(id: string): Promise<Country | null> {
    return this.countryRepo.findOne({ where: { id } });
  }

  findByCode(code: string): Promise<Country | null> {
    return this.countryRepo.findOne({ where: { code } });
  }

  findCitiesByCountry(countryId: string): Promise<City[]> {
    return this.cityRepo.find({
      where: { countryId },
      order: { name: 'ASC' },
    });
  }
}
