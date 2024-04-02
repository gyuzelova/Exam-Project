import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fish } from './types/post';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  getFishs() {
    return this.http.get<Fish[]>('/api/'); // check path
  }

  getAllFishs() {
    return this.http.get<Fish[]>('/api/catalog'); // check path
  }

  getCurrentFish(id: string) {
    return this.http.get<Fish>(`/api/edit/${id}`);
  }
  getCurrentPostFish(id: string) {
    return this.http.get<Fish>(`/api/details/${id}`);
  }

  createPostFish(name: string,
    image: string,
    type: string,
    description: string,
  ) {
    return this.http.post<Fish>('/api/create',
      {
        name,
        image,
        type,
        description
      });
  }

  updatePostFish(
    id: string,
    name: string,
    image: string,
    type: string,
    description: string) {
    return this.http.put<Fish>(`/api/edit/${id}`, {
      name,
      image,
      type,
      description,
    });
  }

  deletePostFish(id: string) {
    return this.http.delete<Fish>(`/api/delete/${id}`);
  }

  likeFish(id: string) {
    return this.http.get<Fish>(`/api/liked/${id}`);
  }

  // POSTS
  getPostFish(limit?: number) {
    const { apiUrl } = environment;
    let url = `${apiUrl}/`;

    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Fish[]>(url);
  }

}
