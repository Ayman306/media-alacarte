import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/component/header/header.component';
import { HeroComponent } from "./hero/hero.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
