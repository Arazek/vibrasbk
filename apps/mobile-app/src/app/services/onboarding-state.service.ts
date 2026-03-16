import { Injectable } from '@angular/core';
import { Rol, Nivel, Estilo } from '@shared/types';

export interface OnboardingState {
  rol: Rol | null;
  nivel: Nivel | null;
  estilos: Estilo[];
  academia: string;
}

@Injectable({ providedIn: 'root' })
export class OnboardingStateService {
  private state: OnboardingState = {
    rol: null,
    nivel: null,
    estilos: [],
    academia: '',
  };

  get(): OnboardingState {
    return this.state;
  }

  set(partial: Partial<OnboardingState>): void {
    this.state = { ...this.state, ...partial };
  }

  reset(): void {
    this.state = { rol: null, nivel: null, estilos: [], academia: '' };
  }

  isComplete(): boolean {
    return !!this.state.rol && !!this.state.nivel && this.state.estilos.length > 0;
  }
}
