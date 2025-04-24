import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sanayii';
}
