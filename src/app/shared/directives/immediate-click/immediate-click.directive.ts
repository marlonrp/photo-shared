import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Directive({
    selector: '[appImmediateClick]'
})
export class AppImmediateClick implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private platFormDetector: PlatformDetectorService
    ) {}

    ngOnInit() {
        this.platFormDetector.isPlatformBrowser &&
        this.element.nativeElement.click();
    }
}
