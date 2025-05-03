import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DataServiceService } from '../_services/data-service.service';
import { ServiceRequestDetailsDto } from '../_dtos/serive-request-details-dto';

@Component({
  selector: 'app-successful-payment',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './successful-payment.component.html',
  styleUrl: './successful-payment.component.css'
})
export class SuccessfulPaymentComponent implements OnInit {

  constructor(
    private router: Router,

  ) {}

  ngOnInit() {

  }

  continue() {
    this.router.navigate(['/home']);
  }


}
