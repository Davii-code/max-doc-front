import {Component, computed, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {SidnavConteudoComponent} from './component/sidnav-conteudo/sidnav-conteudo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, MatIcon, MatIconButton, MatToolbar, MatSidenav, SidnavConteudoComponent,MatSidenavContent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'billing-system-angula';

  collapsed=signal(true);

  sidenavWidth = computed(()=>this.collapsed() ? '60px':'250px')
}
