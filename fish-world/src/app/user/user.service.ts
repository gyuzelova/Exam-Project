import { Injectable, OnDestroy } from '@angular/core';
import {  UserAuth, UserProfilData } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private user$$ = new BehaviorSubject<UserAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  
  user: UserAuth | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }
  get isUserId(): string {
    return this.user?._id || '';
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
     
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<UserAuth>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  register(
    email: string,
    gender: string,
    password: string,
    rePassword: string,
  
  ) {
    return this.http
      .post<UserAuth>('/api/register', {
        email,
        gender,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)
      ));
  }

  logout() {
    console.log('Im in Logout-UserService');
    
    return this.http
      .post('/api/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  // getProfile() {
  //   return this.http
  //     .get<UserAuth>('/api/profile')
  //     .pipe(tap((user) => this.user$$.next(user)));
  // }
  getUser() {
    return this.http
      .get<UserAuth>('/api/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getProfileData( id: string) {
    return this.http
      .get<UserProfilData>(`/api/profile/${id}`)    
  }

  // getProfilFish() {
  //   return this.http
  //     .get<UserAuth>(`/api/profile/fish`)    
  // }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
