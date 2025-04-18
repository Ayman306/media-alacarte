import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef, PLATFORM_ID, Inject, ViewChild, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChildren('heroText') heroTexts!: QueryList<ElementRef>;
  @ViewChild('textWrapper') textWrapper!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeHeroAnimation();
        this.initializeTextRightToLeftAnimation('.moving-text-wrapper'); // Add this line
        this.initializeTextLeftToRightAnimation('.moving-text-wrapper-2'); // Add this line
      }, 0);
    }
  })

  }

  private initializeHeroAnimation() {
    const timeline = gsap.timeline({
      repeat: -1
    });

    // Set initial state
    this.heroTexts.forEach(text => {
      gsap.set(text.nativeElement, { 
        display: 'none',
        y: 20,
        position: 'relative'
      });
    });

    this.heroTexts.forEach((text) => {
      timeline
        .set(text.nativeElement, {
          display: 'block'
        })
        .to(text.nativeElement, {
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(text.nativeElement, {
          backgroundImage: "linear-gradient(145.58deg, #EF4F4F 4.18%, #EB3154 52.09%, #D9207C 100%)",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          webkitTextFillColor: "transparent",
          color: "transparent",
          paddingBottom: "4px", // Add padding to prevent text cutoff
          duration: 1
        })
        .to(text.nativeElement, {
          y: -100,
          duration: 0.8,
          opacity:0,
          delay: 1,
          ease: "power2.in"
        })
        .set(text.nativeElement, {
          display: 'none'
        });
    });

    timeline.timeScale(1);
  }


  private initializeTextRightToLeftAnimation(className:string) {
    if (!this.textWrapper) return;
    // Create infinite scroll animation
    const scrollTween = gsap.to(className, {
      xPercent: -100,
      duration: 20,
      ease: "none",
      repeat: -1,
      infinite: true
    });

    // Create scroll trigger for direction control
    ScrollTrigger.create({
      trigger: "#page2",
      start: "top 100%",
      end: "bottom 20%",
      onUpdate: (self) => {
        const direction = self.direction;
          scrollTween.timeScale(direction > 0 ? 2 : -2);
      },
      onEnter: () => scrollTween.play(),
      onLeave: () => scrollTween.play(),
      onEnterBack: () => scrollTween.play(),
      onLeaveBack: () => {
        scrollTween.progress(0);
        scrollTween.pause();
      }
    });
  }
  private initializeTextLeftToRightAnimation(className:string) {
    if (!this.textWrapper) return;
    
    const scrollTween = gsap.fromTo(className, 
      {
        xPercent: -100,
      },
      {
        xPercent: 0,
        duration: 20,
        ease: "none",
        repeat: -1,
        immediateRender: true
      }
    );

    ScrollTrigger.create({
      trigger: "#page2",
      start: "top 100%",
      end: "bottom 20%",
      onUpdate: (self) => {
        const direction = self.direction;
        scrollTween.timeScale(direction > 0 ? 2 : -2);
      },
      onEnter: () => scrollTween.play(),
      onLeave: () => scrollTween.play(),
      onEnterBack: () => scrollTween.play(),
      onLeaveBack: () => {
        scrollTween.progress(0);
        scrollTween.pause();
      }
    });
  }
}
