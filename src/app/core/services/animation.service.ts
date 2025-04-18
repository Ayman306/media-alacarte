import { Injectable, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  initIconAnimation(){
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
  initNavAnimation(
    navItems: ElementRef[],
    logo: ElementRef,
    loginBtn: ElementRef
  ) {
    if (!navItems?.length || !logo?.nativeElement || !loginBtn?.nativeElement) {
      return;
    }

    // Navbar items animation
    gsap.from(navItems.map(item => item.nativeElement), {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Logo animation
    gsap.from(logo.nativeElement, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out'
    });

    // Login button animation
    gsap.from(loginBtn.nativeElement, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  }

  bottomToTopStaggerAnimation(elements: ElementRef[]) {
    if (!elements?.length) {
      return;
    }
    gsap.from(elements.map(element => element.nativeElement), {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      delay:1
    })
  }
  bottomToTopAnimation(element: ElementRef) {
    if (!element?.nativeElement) {
      return;
    }
    gsap.from(element.nativeElement, {
      opacity: 0,
      y: 20,
      duration: 2,
      ease: 'power3.out',
      delay:0.5
    })
  }
}
