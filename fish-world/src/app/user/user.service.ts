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
  KEY = '[auth]';
  userSubscription: Subscription;

 

  constructor(private http: HttpClient) {
    
    const storedUser = localStorage.getItem(this.KEY);
    console.log(storedUser);
    
    if (storedUser) {
      this.user$$.next(JSON.parse(storedUser));
    }
  
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {
    return !!this.user;
    
  }
  getToken() {
    return localStorage.getItem(this.KEY)
  }
  get isUserId(): string {
    console.log(this.user?._id);
    return this.user?._id || '';
  }

  login(email: string, password: string) {
    return this.http
      .post<UserAuth>('/api/login', { email, password })
      .pipe(tap((user) => {
        this.user$$.next(user);
        console.log(user);
        if (user?.token) {
          localStorage.setItem(this.KEY, JSON.stringify(user));
        }
      })
      )
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
      .pipe(tap((user) => {
        this.user$$.next(user)
        if (user) {
          localStorage.setItem(this.KEY, JSON.stringify(user))
        }
      }
      ));
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap(() => {
        this.user$$.next(undefined);
        localStorage.removeItem(this.KEY);
      }));
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
