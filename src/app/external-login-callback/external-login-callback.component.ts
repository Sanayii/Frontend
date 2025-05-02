import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-external-login-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './external-login-callback.component.html',
  styleUrls: ['./external-login-callback.component.css']
})
export class ExternalLoginCallbackComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.handleExternalLoginCallback();
  }

  private handleExternalLoginCallback(): void {
    // نحاول الحصول على التوكن من الـ queryParams
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        // إذا كان هناك توكن في الرابط
        localStorage.setItem('token', params['token']);
        this.accountService.isLogged = true;
        this.router.navigate(['/home']);
      } else {
        // لو مفيش توكن في الرابط، بنطلبه من الخادم
        this.accountService.externalLoginCallback().subscribe({
          next: (response) => {
            if (response?.token) {
              localStorage.setItem('token', response.token);
              this.accountService.isLogged = true;
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.error('Error during external login callback', err);
            this.router.navigate(['/login'], {
              queryParams: { error: 'external_login_failed' }
            });
          }
        });
      }
    });
  }
}
