import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import gsap from 'gsap';
import { relative } from 'path';
import SplitType from 'split-type';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChildren('heroText') heroTexts!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.initializeHeroAnimation();
  }

  private initializeHeroAnimation() {
    const timeline = gsap.timeline({ repeat: -1 });
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.height = '8rem'; // Increased height
    container.style.overflow = 'visible'; // Allow overflow
    this.heroTexts.first.nativeElement.parentNode.appendChild(container);

    this.heroTexts.forEach((text, index) => {
      const split = new SplitType(text.nativeElement, { types: 'lines' });
      gsap.set(split.lines, {
        position: 'absolute',
        width: '100%',
        left: '50%',
        xPercent: -50,
        padding: '0.5rem 0' // Added padding
      });

      timeline
        .from(split.lines, {
          y: 80,
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: "power3.out",
        })
        .to(split.lines, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          backgroundImage: "linear-gradient(145.58deg, #EF4F4F 4.18%, #EB3154 52.09%, #D9207C 100%)",
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          color: "transparent",
          ease: "power2.inOut",
        })
        .to(split.lines, {
          y: -80,
          scale: 0.5,
          color: "white",
          backgroundImage: "none",
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
          delay: 0.4
        });
    });

    timeline.timeScale(0.3);
  }
}
