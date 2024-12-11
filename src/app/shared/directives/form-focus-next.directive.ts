import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormFocusNext]',
  standalone: true
})
export class FormFocusNextDirective {

  constructor(private el: ElementRef) { }
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      const form = this.el.nativeElement.form;
      const elements = Array.from(form.elements) as HTMLElement[];
      const index = elements.indexOf(this.el.nativeElement);
      if (index > -1 && index + 1 < elements.length) {
        elements[index + 1].focus();
      }
    }
  }
}
