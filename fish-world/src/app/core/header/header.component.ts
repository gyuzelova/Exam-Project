import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, 
  private userService: UserService) {}

  get isLoggedIn(): boolean { 
  return this.userService.isLogged;
}

logout(): void {
  this.userService.logout().subscribe({
next: () => {
  this.router.navigate(['/home']);
},
error: () => {
  this.router.navigate(['/login']);
}
  });
  
}
}
