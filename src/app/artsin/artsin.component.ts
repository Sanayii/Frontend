import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtsinService } from '../_services/artsin.service';
import { artisan } from '../_Models/artsin';
import { ArtisanServiceRequest } from '../_Models/artisan-service-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artsin',
  imports: [CommonModule,FormsModule],
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

}
