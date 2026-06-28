import { Injectable, signal, effect } from '@angular/core';

type FontSize = 'normal' | 'large' | 'x-large';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly STORAGE_KEY = 'chiflepop-a11y';

  highContrast = signal(false);
  fontSize = signal<FontSize>('normal');
  showAltText = signal(false);
  screenReaderMode = signal(false);
  dyslexiaFont = signal(false);

  constructor() {
    this.loadFromStorage();
    effect(() => this.applyToDOM());
  }

  toggleHighContrast(): void {
    this.highContrast.update(v => !v);
    this.saveToStorage();
  }

  cycleFontSize(): void {
    this.fontSize.update(current => {
      const sizes: FontSize[] = ['normal', 'large', 'x-large'];
      const idx = sizes.indexOf(current);
      return sizes[(idx + 1) % sizes.length];
    });
    this.saveToStorage();
  }

  toggleShowAltText(): void {
    this.showAltText.update(v => !v);
    this.saveToStorage();
  }

  toggleScreenReaderMode(): void {
    this.screenReaderMode.update(v => !v);
    this.saveToStorage();
  }

  toggleDyslexiaFont(): void {
    this.dyslexiaFont.update(v => !v);
    this.saveToStorage();
  }

  resetAll(): void {
    this.highContrast.set(false);
    this.fontSize.set('normal');
    this.showAltText.set(false);
    this.screenReaderMode.set(false);
    this.dyslexiaFont.set(false);
    this.saveToStorage();
  }

  private applyToDOM(): void {
    const html = document.documentElement;
    html.setAttribute('data-high-contrast', String(this.highContrast()));
    html.setAttribute('data-font-size', this.fontSize());
    html.setAttribute('data-show-alt-text', String(this.showAltText()));
    html.setAttribute('data-screen-reader', String(this.screenReaderMode()));
    html.setAttribute('data-dyslexia-font', String(this.dyslexiaFont()));
  }

  private saveToStorage(): void {
    const state = {
      highContrast: this.highContrast(),
      fontSize: this.fontSize(),
      showAltText: this.showAltText(),
      screenReaderMode: this.screenReaderMode(),
      dyslexiaFont: this.dyslexiaFont(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  private loadFromStorage(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) return;
    try {
      const state = JSON.parse(saved);
      this.highContrast.set(state.highContrast ?? false);
      this.fontSize.set(state.fontSize ?? 'normal');
      this.showAltText.set(state.showAltText ?? false);
      this.screenReaderMode.set(state.screenReaderMode ?? false);
      this.dyslexiaFont.set(state.dyslexiaFont ?? false);
    } catch {
      /* ignore corrupt data */
    }
  }
}
