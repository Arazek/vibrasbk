import { Injectable } from '@angular/core';

export type AppTheme = 'noir' | 'purple' | 'warm' | 'crimson' | 'electric' | 'emerald' | 'copper';

export const THEMES: { id: AppTheme; label: string; preview: string }[] = [
  { id: 'noir',     label: 'Noir',     preview: '#1C1C1E' },
  { id: 'purple',   label: 'Purple',   preview: '#1E1B2E' },
  { id: 'warm',     label: 'Warm',     preview: '#1E1B12' },
  { id: 'crimson',  label: 'Crimson',  preview: '#1F0E0E' },
  { id: 'electric', label: 'Electric', preview: '#0D1221' },
  { id: 'emerald',  label: 'Emerald',  preview: '#0F1C10' },
  { id: 'copper',   label: 'Copper',   preview: '#1C1508' },
];

const STORAGE_KEY = 'vibe_theme';
const DEFAULT_THEME: AppTheme = 'noir';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: AppTheme = DEFAULT_THEME;

  init() {
    const stored = localStorage.getItem(STORAGE_KEY) as AppTheme | null;
    this.apply(stored && THEMES.some(t => t.id === stored) ? stored : DEFAULT_THEME);
  }

  getTheme(): AppTheme {
    return this.current;
  }

  setTheme(theme: AppTheme) {
    localStorage.setItem(STORAGE_KEY, theme);
    this.apply(theme);
  }

  private apply(theme: AppTheme) {
    this.current = theme;
    document.documentElement.dataset['theme'] = theme;
  }
}
