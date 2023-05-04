import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgDefault]'
})
export class ImgDefaultDirective {

  // Loading Imagen Default
  @HostListener('error') handleError(): void {
    const elemNative = this.elemHost.nativeElement
    console.log('Imagen no encontrada', this.elemHost)
    elemNative.src = '../../../assets/image/scan.png'
  }

  constructor(private elemHost: ElementRef) { }

}
