import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { AnimationService } from '../../../../core/services/animation.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule
  ]
})
export class HeaderComponent implements AfterViewInit {
  constructor(private animationService: AnimationService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('loginBtn') loginBtn!: ElementRef;
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  @ViewChildren('mobileNavItem') mobileNavItems!: QueryList<ElementRef>;
  @ViewChild('mobileLoginBtn') mobileLoginBtn!: ElementRef;


  isMenuOpen = false;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

    setTimeout(() => {
      this.animationService.bottomToTopStaggerAnimation(this.navItems.toArray());
      this.animationService.bottomToTopAnimation(this.loginBtn);
      this.animationService.bottomToTopAnimation(this.logo);
    }, 0);
  }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Menu opening animation
      gsap.fromTo('.md\\:hidden.fixed',
        { x: '100%' },
        { x: 0, duration: 0.5, ease: 'power2.out' }
      );
      // Staggered animation for menu items
      gsap.fromTo(this.mobileNavItems.toArray().map(item => item.nativeElement),
        {
          x: 50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // Login button animation
      gsap.fromTo(this.mobileLoginBtn.nativeElement,
        {
          y: 10,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          delay: 0.8
        }
      );
    } else {
      // Menu closing animation
      document.body.style.overflow = 'auto';
      gsap.to('.md\\:hidden.fixed', {
        x: '-100%',
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set([
            this.mobileNavItems.toArray().map(item => item.nativeElement),
            this.mobileLoginBtn.nativeElement
          ], { clearProps: 'all' });
        }
      });
    }
  }
}
