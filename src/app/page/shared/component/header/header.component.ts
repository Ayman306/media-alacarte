import { Component, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationService } from '../../../../core/services/animation.service';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements AfterViewInit {
  constructor(private animationService: AnimationService) {}
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('loginBtn') loginBtn!: ElementRef;
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  
  
  isMenuOpen = false;

  ngAfterViewInit() {
    setTimeout(() => {
      // this.initLogoAnimation();
      // this.initNavItemsAnimation();
      this.animationService.bottomToTopStaggerAnimation(this.navItems.toArray());
      this.animationService.bottomToTopAnimation(this.loginBtn);
      this.animationService.bottomToTopAnimation(this.logo);
      
    }, 0);
  }
  // private initNavItemsAnimation() {
  //   if (this.navItems) {
  //     gsap.from(this.navItems.toArray().map(item => item.nativeElement), {
  //       opacity: 0,
  //       y: 10,
  //       stagger: 0.2,
  //       duration: 1,
  //       ease: 'power3.out',
  //       delay: 1
  //     });
  //   }
  // }

  // private initLogoAnimation() {
  //   gsap.from([this.logo.nativeElement,this.loginBtn.nativeElement], {
  //     opacity: 0,
  //     y: 10,
  //     duration:2,
  //     ease: 'power3.out',
  //     delay:0.3
  //   });
  // }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
