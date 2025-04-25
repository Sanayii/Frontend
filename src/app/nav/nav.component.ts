import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../_services/notification.service';
@Component({
  selector: 'app-nav',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,FontAwesomeModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  faBell = faBell;
  unreadCount = 0;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(nots => {
      this.unreadCount = nots.filter(n => n.unread).length;
    });
  }
  
}
