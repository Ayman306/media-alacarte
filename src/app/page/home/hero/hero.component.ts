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
    // if (!isPlatformBrowser(this.platformId)) return;

    const timeline = gsap.timeline({
      repeat:-1,
      scrollTrigger: {
        trigger: this.heroTexts.first.nativeElement,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      }
    });

    this.heroTexts.forEach((text, index) => {
      // Hide text initially to prevent flickering
      gsap.set(text.nativeElement, { opacity: 0 });
      
      const split = new SplitType(text.nativeElement, { types: 'lines' });
      
      gsap.set(text.nativeElement, {
        position: 'relative',
        // height: '8rem',
        overflow: 'visible',
        opacity: 1
      });

      gsap.set(split.lines, {
        position: 'absolute',
        width: '100%',
        left: '50%',
        xPercent: -50,
        padding: '0.5rem 0',
        opacity: 0
      });

      timeline
        .from(split.lines, {
          y: 50,
          opacity: 0,
          scale: 0.5,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(split.lines, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          backgroundImage: "linear-gradient(145.58deg, #EF4F4F 4.18%, #EB3154 52.09%, #D9207C 100%)",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          color: "transparent",
          ease: "power2.inOut",
        })
        .to(split.lines, {
          y: -100,
          scale: 0.5,
          color: "white",
          backgroundImage: "none",
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
          delay: 0.8
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
