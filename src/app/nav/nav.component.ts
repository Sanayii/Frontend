import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../_services/notification.service';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-nav',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,FontAwesomeModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit,OnChanges {
  faBell = faBell;
  unreadCount = 0;
  constructor(private notificationService: NotificationService,
    public login:AccountService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.notificationService.notifications$.subscribe(nots => {
      this.unreadCount = nots.filter(n => n.isRead==false).length;
    });
  }

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(nots => {
      this.unreadCount = nots.filter(n => n.isRead==false).length;
    });
  }
  logout() {
    this.login.logout();
    this.router.navigate(['/home']);
  }


}
