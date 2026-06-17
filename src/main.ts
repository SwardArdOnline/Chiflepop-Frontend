import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AccessibilityToolbarComponent } from './app/ui/accessibility-toolbar/accessibility-toolbar';
import { AccessibilityService } from './app/services/accessibility.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccessibilityToolbarComponent],
  template: `
    <a href="#" class="a11y-skip-link" (click)="$event.preventDefault(); skipToContent()">Saltar al contenido principal</a>
    <router-outlet></router-outlet>
    <app-accessibility-toolbar />
  `
})
export class App {
  constructor(private a11y: AccessibilityService) {}

  skipToContent(): void {
    const el = document.querySelector('main, [role="main"], router-outlet');
    if (el) {
      (el as HTMLElement).focus();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

bootstrapApplication(App, {
  providers: [provideRouter(routes),
    provideHttpClient()
  ]
});
