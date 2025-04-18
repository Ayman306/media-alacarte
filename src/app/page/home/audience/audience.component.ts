import { isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.scss']
})
export class AudienceComponent implements AfterViewInit {
  @ViewChild('counter1') counter1!: ElementRef;
  @ViewChild('counter2') counter2!: ElementRef;
  @ViewChild('counter3') counter3!: ElementRef;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (isPlatformBrowser(this.platformId)) {

    setTimeout(() => {
      
      this.initCountAnimation();
    }, 0);
  }
})
}

  private initCountAnimation() {
    // Counter 1: 0 to 110
    let counter1Value = { value: 0 };
    gsap.to(counter1Value, {
      value: 110,
      duration: 3,
      ease: "power1.out",
      scrollTrigger: {
        trigger: this.counter1.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        const currentValue = Math.round(counter1Value.value);
        this.counter1.nativeElement.textContent = `${currentValue}+`;
      }
    });

    // Counter 2: 0 to 1M
    let counter2Value = { value: 0 };
    gsap.to(counter2Value, {
      value: 1000000,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.counter2.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        const currentValue = Math.floor(counter2Value.value);
        this.counter2.nativeElement.textContent = currentValue >= 1000000 ? '1M' : currentValue.toLocaleString();
      }
    });

    // Counter 3: 0 to 98.99
    let counter3Value = { value: 0 };
    gsap.to(counter3Value, {
      value: 98.99,
      duration: 3,
      ease: "power1.out",
      scrollTrigger: {
        trigger: this.counter3.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        const currentValue = counter3Value.value;
        this.counter3.nativeElement.textContent = `${currentValue.toFixed(2)}%`;
      }
    });
  }
}
