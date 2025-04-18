import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/component/header/header.component';
import { HeroComponent } from "./hero/hero.component";
import { ServicesComponent } from './services/services.component';
import { WhyusComponent } from './whyus/whyus.component';
import { AudienceComponent } from "./audience/audience.component";
import { CardComponent } from "./card/card.component";
import { FooterComponent } from "../shared/component/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, ServicesComponent, WhyusComponent, AudienceComponent, CardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
