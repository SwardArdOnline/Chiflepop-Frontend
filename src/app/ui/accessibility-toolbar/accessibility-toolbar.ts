import { Component } from '@angular/core';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
  selector: 'app-accessibility-toolbar',
  standalone: true,
  templateUrl: './accessibility-toolbar.html',
  styleUrl: './accessibility-toolbar.css'
})
export class AccessibilityToolbarComponent {
  protected panelOpen = false;

  constructor(protected a11y: AccessibilityService) {}

  togglePanel(): void {
    this.panelOpen = !this.panelOpen;
  }

  closePanel(): void {
    this.panelOpen = false;
  }

  protected fontSizeLabel(): string {
    switch (this.a11y.fontSize()) {
      case 'normal': return 'Normal';
      case 'large': return 'Grande';
      case 'x-large': return 'Muy Grande';
    }
  }
}
