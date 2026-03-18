import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonChip, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { DanceStyle } from '@shared/types';

@Component({
  selector: 'app-style-chip-grid',
  standalone: true,
  imports: [CommonModule, IonChip, IonLabel, IonSpinner],
  styles: [`
    .chips-grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--lgui-gap-sm);
      margin-bottom: var(--lgui-gap-xl);
    }
    .style-chip {
      height: 2.25rem;
      font-size: var(--lgui-fs-body);
      font-weight: var(--lgui-fw-medium);
    }
  `],
  template: `
    <div *ngIf="loading" class="loading-container">
      <ion-spinner color="primary" name="dots"></ion-spinner>
    </div>
    <div *ngIf="!loading" class="chips-grid">
      <ion-chip
        *ngFor="let style of styles"
        [color]="isSelected(style.slug) ? 'primary' : 'medium'"
        class="style-chip"
        (click)="toggle(style.slug)">
        <ion-label>{{ style.name }}</ion-label>
      </ion-chip>
    </div>
  `,
})
export class StyleChipGridComponent {
  @Input() styles: DanceStyle[] = [];
  @Input() selected: string[] = [];
  @Input() loading = false;
  @Output() selectionChange = new EventEmitter<string[]>();

  isSelected(slug: string): boolean {
    return this.selected.includes(slug);
  }

  toggle(slug: string): void {
    const next = this.isSelected(slug)
      ? this.selected.filter(s => s !== slug)
      : [...this.selected, slug];
    this.selectionChange.emit(next);
  }
}
