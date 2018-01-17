import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[Custom]'
})
export class CustomDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { 
    // this.el = el.nativeElement;
  }

  @HostListener('keyup', ['$event']) onKeyDown(e: Event) {
    let value = (<HTMLInputElement>event.target).value;
    // console.log(this.el.parentElement.style.backgroundColor = e.target.value)
    // this.renderer.setElementStyle(this.el, 'backgroundColor', e.target.value);
    this.renderer.setElementStyle(this.el.nativeElement.parentElement, 'backgroundColor', value);
    window.document.body.style.backgroundColor = value;
  }
  // onKey(event: KeyboardEvent) { // with type info
  //   this.values += (<HTMLInputElement>event.target).value + ' | ';
  // }
}
