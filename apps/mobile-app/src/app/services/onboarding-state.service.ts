import { Injectable } from '@angular/core';
import { Role, Level, Estilo } from '@shared/types';

export interface OnboardingState {
  role: Role | null;
  level: Level | null;
  styles: Estilo[];
  academy: string;
}

@Injectable({ providedIn: 'root' })
export class OnboardingStateService {
  private state: OnboardingState = {
    role: null,
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
    this.state = { role: null, level: null, styles: [], academy: '' };
  }

  isComplete(): boolean {
    return !!this.state.role && !!this.state.level && this.state.styles.length > 0;
  }
}
