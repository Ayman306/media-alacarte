import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-whyus',
  imports: [CommonModule],
  templateUrl: './whyus.component.html',
  styleUrl: './whyus.component.scss'
})
export class WhyusComponent implements AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}
  topGrids = [
    {
      // title: "Strategic Approach",
      description: "We simplify media buying with data, automation, and collaboration to maximize ROI."
    },
    {
      icon:'assets/icons/campaign-outline.svg',
      title: "Campaign Planning",
      description: "Plan and optimize your ad campaigns with data-driven insights and seamless collaboration for maximum impact."
    }
  ];

  bottomGrids = [
    {
      icon:'assets/icons/media-video.svg',
      title: "Media Buying",
      description: "Effortlessly book media slots with AI-powered automation, ensuring cost efficiency and better reach.",
      bg:'bg-grey-400'
    },
    {
      icon:'assets/icons/ads-icon.svg',
      title: "Ad Distribution",
      description: "Distribute ads across multiple channels while ensuring precise targeting and real-time tracking.",
      bg:'gradient-primary text-black'
    },
    {
      icon:'assets/icons/analitic-icon.svg',
      title: "Performance Analytics",
      description: "Gain actionable insights with real-time performance tracking to maximize your ROI and refine future strategies.",
      bg:'bg-grey-400'
    }
  ];
  @ViewChild('why') whyWords!: ElementRef;
  @ViewChild('solution') solutionWords!: ElementRef;
  @ViewChild('smart') buyingWords!: ElementRef;
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Remove SplitText registration

    if (isPlatformBrowser(this.platformId)) {
      // this.animateService.bottomToTopAnimation(this.whyWords);
      this.wordBreakAnimation(this.whyWords);
      this.wordBreakAnimation(this.solutionWords);
      this.wordBreakAnimation(this.buyingWords);
      this.iconsAnimation()

  
    }
  });
  }

  wordBreakAnimation(words: ElementRef) {
    if (!words?.nativeElement) return;
    
    const text = words.nativeElement.textContent;
    const characters = text.split(' ');
    words.nativeElement.innerHTML = characters
      .map((char:string) => `<span style="display: inline-block" class="${char.toLowerCase() === 'solution' ? 'gradient-primary text-black' : ''}">${char}</span>`)
      .join(' ');

    const chars = words.nativeElement.querySelectorAll('span');
    
    gsap.set(chars, { yPercent: 100, opacity: 0 });
    gsap.to(chars, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.25,
      ease: "linear",
      scrollTrigger: {
        trigger: words.nativeElement,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  }
  iconsAnimation(){
    gsap.from('.icon', {
      yPercent: 20,
      // opacity: 0,
      stagger: 0.25,
      ease: "sine.inOut", // Changed to sine.inOut for smoother animation
      repeat: -1, // Repeat the animation indefinitely
      // repeatDelay: 0.5, // Delay between each repetition
      duration: 1.5, // Increased duration for smoother movement
      yoyo: true, // Makes the animation reverse smoothly
      scrollTrigger: {
        trigger: '.icon',
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })
  }
}
