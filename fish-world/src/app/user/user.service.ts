import { Injectable } from '@angular/core';
import {  UserAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: UserAuth | undefined;
USER_KEY = '[user]'

get isLogged(): boolean {
  console.log(!!this.user);
  
  return !!this.user;
}

  constructor() {
    try {
      const isUser =  localStorage.getItem(this.USER_KEY) || "";
      this.user = JSON.parse(isUser);
    } catch (error) {
      this.user = undefined;
    }
   }
   
login() {
  this.user = {
    id:'323226565623265662',
    email: "lili@gmail.com",
    password: "password"
  }
  localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
}

  logout(){
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
}
