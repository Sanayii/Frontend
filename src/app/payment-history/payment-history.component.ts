import { Component,OnInit, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-payment-history',
  imports: [RouterLink,RouterOutlet,MatButtonModule,MatIconModule,
      MatProgressSpinnerModule,MatCardModule,MatPaginator,MatSort],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent {

}
