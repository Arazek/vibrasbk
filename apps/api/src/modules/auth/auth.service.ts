import { Injectable, ConflictException, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, Rol, Nivel } from '../users/entities/user.entity';
import { RegisterDto } from './dtos/register.dto';

export interface AuthResponseData {
  accessToken: string;
  user: {
    id: string;
    alias: string;
    ciudad: string;
    rol: string;
    nivel: string;
    estilos: string[];
    academiaId?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseData> {
    const existingAlias = await this.usersRepository.findOne({ where: { alias: dto.alias } });
    if (existingAlias) {
      throw new ConflictException(`Alias "${dto.alias}" is already taken`);
    }
    const existingEmail = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (existingEmail) {
      throw new ConflictException(`Email "${dto.email}" is already registered`);
    }

    const validRoles = Object.values(Rol);
    const validNiveles = Object.values(Nivel);

    if (!validRoles.includes(dto.rol as Rol)) {
      throw new BadRequestException(`Invalid rol: ${dto.rol}`);
    }
    if (!validNiveles.includes(dto.nivel as Nivel)) {
      throw new BadRequestException(`Invalid nivel: ${dto.nivel}`);
    }
    if (!Array.isArray(dto.estilos) || dto.estilos.length === 0) {
      throw new BadRequestException(`Se requiere al menos un estilo`);
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepository.create({
      alias: dto.alias,
      email: dto.email,
      passwordHash,
      ciudad: 'Cartagena',
      rol: dto.rol as Rol,
      nivel: dto.nivel as Nivel,
      estilos: dto.estilos,
      academiaId: dto.academiaId,
    });
    await this.usersRepository.save(user);

    return this.signToken(user);
  }

  async login(email: string, password: string): Promise<AuthResponseData> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }
    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, alias: user.alias, rol: user.rol };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        alias: user.alias,
        ciudad: user.ciudad,
        rol: user.rol,
        nivel: user.nivel,
        estilos: user.estilos,
        academiaId: user.academiaId || undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
