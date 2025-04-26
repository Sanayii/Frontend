import { Component } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout-request',
  imports: [MatSort,RouterLink,MatIcon,MatIconModule,MatButtonModule,CommonModule],
  standalone: true,
  templateUrl: './checkout-request.component.html',
  styleUrl: './checkout-request.component.css'
})
export class CheckoutRequestComponent {
  selectedRating = 0;

  setRating(star: number) {
    this.selectedRating = star;
  }

}
