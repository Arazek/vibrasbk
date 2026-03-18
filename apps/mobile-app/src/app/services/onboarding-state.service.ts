import { Injectable } from '@angular/core';
import { DancingRole, Level, Estilo } from '@shared/types';

export interface OnboardingState {
  dancingRole: DancingRole | null;
  level: Level | null;
  styles: Estilo[];
  academy: string;
}

@Injectable({ providedIn: 'root' })
export class OnboardingStateService {
  private state: OnboardingState = {
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
    this.state = { dancingRole: null, level: null, styles: [], academy: '' };
  }

  isComplete(): boolean {
    return !!this.state.dancingRole && !!this.state.level && this.state.styles.length > 0;
  }
}
