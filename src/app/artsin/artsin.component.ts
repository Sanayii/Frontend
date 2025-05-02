import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtsinService } from '../_services/artsin.service';
import { artisan } from '../_Models/artsin';
import { ArtisanServiceRequest } from '../_Models/artisan-service-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-artsin',

  imports: [CommonModule,FormsModule,MatButtonModule,MatIconModule,
    MatProgressSpinnerModule,MatCardModule,MatPaginator,MatSort,CommonModule],
  templateUrl: './artsin.component.html',
  styleUrl: './artsin.component.css'
})
export class ArtsinComponent {
  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtsinService,
    private router: Router) {}


Artisan: artisan = new artisan();
id!: string | null;

avgRating!: number ;

ArtisanServices: ArtisanServiceRequest[] =[];

ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.artisanService.getById(this.id!).subscribe(d => {
    this.Artisan = d;
  });

  this.artisanService.getArtisanServic(this.id!).subscribe((d: ArtisanServiceRequest[]) => {
    this.ArtisanServices = d;
  });

  }

getRatingAvg()
{
  for(let i=0; i < this.ArtisanServices.length; i++ )
  {
    this.avgRating += this.ArtisanServices[i].rating;
  }
  return this.avgRating/(this.ArtisanServices.length);
}


// Method to convert rating to a list of stars
getStars(rating: number): string[] {
  const fullStars = Math.floor(rating);  // Full stars
  const emptyStars = 5 - fullStars;  // Empty stars
  const starsArray: string[] = [];

  // Push full stars (★)
  for (let i = 0; i < fullStars; i++) {
    starsArray.push('fa-star');
  }

  // Push empty stars (☆)
  for (let i = 0; i < emptyStars; i++) {
    starsArray.push('fa-star-o');
  }

  return starsArray;
}

// Pagination
pageSize = 10;
pageIndex = 0;
totalRequests = 0;
onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'bg-warning text-dark';
      case 'Completed': return 'bg-success text-white';
      case 'Rejected': return 'bg-danger text-white';
      case 'InProgress': return 'bg-info text-dark';
      case 'Failed': return 'bg-secondary text-white';
      default: return 'bg-light text-muted';
    }
  }

   getStatusIcon(status: string): string {
      switch (status) {
        case 'Pending': return 'hourglass_empty';
        case 'Completed': return 'check_circle';
        case 'Rejected': return 'cancel';
        case 'InProgress': return 'autorenew';
        case 'Failed': return 'error_outline';
        default: return 'help';
      }
    }

}
