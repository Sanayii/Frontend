import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_component/header/header.component';
import { ServicesComponent } from './_component/services/services.component';
import { LandingComponent } from './_component/landing/landing.component';
import { AboutComponent } from './_component/about/about.component';
import { RegisterComponent } from './_component/register/register.component';
import { LoginComponent } from './_component/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,LandingComponent,ServicesComponent,AboutComponent,RouterLink,
    RegisterComponent,LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sanayii';
}
