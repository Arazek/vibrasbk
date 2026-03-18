import { Component, Input } from '@angular/core';
import { IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [IonList, IonItem],
  template: `
    <div class="field-label">{{ label }}</div>
    <ion-list lines="none" class="form-list">
      <ion-item>
        <ng-content></ng-content>
      </ion-item>
    </ion-list>
  `,
})
export class FormFieldComponent {
  @Input() label = '';
}
