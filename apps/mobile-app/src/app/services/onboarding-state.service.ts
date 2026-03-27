import { Injectable } from '@angular/core';
import { DancingRole, Level, Estilo } from '@shared/types';

export interface OnboardingState {
  countryId: string | null;
  cityId: string | null;
  dancingRole: DancingRole | null;
  level: Level | null;
  styles: Estilo[];
  academy: string;
}

@Injectable({ providedIn: 'root' })
export class OnboardingStateService {
  private state: OnboardingState = {
    countryId: null,
    cityId: null,
    dancingRole: null,
    level: null,
    styles: [],
    academy: '',
  };

  get(): OnboardingState {
    return this.state;
  }

  set(partial: Partial<OnboardingState>): void {
    this.state = { ...this.state, ...partial };
  }

  reset(): void {
    this.state = { countryId: null, cityId: null, dancingRole: null, level: null, styles: [], academy: '' };
  }

  isComplete(): boolean {
    return !!this.state.countryId && !!this.state.cityId && !!this.state.dancingRole && !!this.state.level && this.state.styles.length > 0;
  }
}
