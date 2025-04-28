import { Component, OnInit, PipeTransform } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//UI Matrial import
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-services-requests-history',
  imports: [RouterLink,MatButtonModule,MatIconModule,
    MatProgressSpinnerModule,MatCardModule,MatPaginator],
  templateUrl: './services-requests-history.component.html',
  styleUrl: './services-requests-history.component.css'
})
export class ServicesRequestsHistoryComponent {



}
