import { Component, OnInit, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'
import { NgModel } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//UI Matrial import
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { DiscountService } from '../_services/discount.service';
import { Discount } from '../_Models/discount';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-discount-history',
  imports: [RouterLink,RouterOutlet,MatButtonModule,MatIconModule,
    MatProgressSpinnerModule,MatCardModule,MatPaginator,MatSort,CommonModule],
  templateUrl: './discount-history.component.html',
  styleUrl: './discount-history.component.css'
})
export class DiscountHistoryComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private discountService: DiscountService,
    private router: Router,
    private token: TokenService
  ) {}


    id!: string | null;
    discounts: Discount[] =[];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.token.getUserIdFromToken();
    this.discountService.getDiscount(this.id!).subscribe((d: Discount[]) => {
      this.discounts = d;
    });
  }

  // Pagination
pageSize = 10;
pageIndex = 0;
totalRequests = 0;
onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}
}
