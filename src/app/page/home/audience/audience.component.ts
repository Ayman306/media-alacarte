import { isPlatformBrowser } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
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
  ) {}

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    if (isPlatformBrowser(this.platformId)) {

    setTimeout(() => {
      
      this.initCountAnimation();
    }, 0);
  }
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
    gsap.to(this.counter2.nativeElement, {
      innerHTML: 1000000,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: this.counter2.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        const value = Math.floor(this.counter2.nativeElement.innerHTML);
        this.counter2.nativeElement.innerHTML = value >= 1000000 ? '1M' : value.toLocaleString();
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
