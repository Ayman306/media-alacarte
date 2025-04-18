import { CommonModule } from '@angular/common';
import { Component, ViewChildren, QueryList, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  activeGrid: number = 0;

  setActiveGrid(index: number) {
    this.activeGrid = index;
    
    // Reset all animations
    gsap.set('.content-wrapper', { opacity: 0 });
    gsap.set('.service-title', { y: 100, opacity: 0 });
    gsap.set('.service-description', { y: 100, opacity: 0 });
    gsap.set('.service-button', { y: 100, opacity: 0 });

    // Animate active card
    const timeline = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" }
    });

    timeline
      .to(`.content-wrapper-${index}`, { opacity: 1, duration: 0.5 })
      .to(`.service-title-${index}`, { y: 0, opacity: 1 })
      .to(`.service-description-${index}`, { y: 0, opacity: 1 }, "-=0.4")
      .to(`.service-button-${index}`, { y: 0, opacity: 1 }, "-=0.4");
  }
  services=[
      {
        title:"Advertising",
        description:"Run & optimize ads across multiple platforms effortlessly.",
        image:"./assets/images/service-img-1.jpg"
      },
      {
        title:"Agencies",
        description:"Manage and optimize your agency's online presence effortlessly.",
        image:"./assets/images/service-img-2.jpg"
      },
      {
        title:"Media Owners",
        description:"Manage your media's online presence effortlessly.",
        image:"./assets/images/service-img-3.jpg"
      },
    ]
}

