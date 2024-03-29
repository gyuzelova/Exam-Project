import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fish } from './types/post';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  
  getFishs() {
    const { apiUrl } = environment;
    return this.http.get<Fish[]>(`${apiUrl}/`); // check path
  }

  getCurrentPostFish(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Fish>(`${apiUrl}/${id}`);
  }

  createPostFish( name: string,
    image: string,
    type: string,
    description: string,
    likedList: string[]) {
      const { apiUrl } = environment;
    return this.http.post<Fish>(`${apiUrl}/create`, 
    { name,
      image,
      type,
      description,
      likedList});
  }

  updatePostFish(id: string, 
    name: string,
    image: string,
    type: string,
    description: string,
    likedList: string[]) {
      const { apiUrl } = environment;
    return this.http.put<Fish>(`${apiUrl}/${id}/edit`, { id, name,
      image,
      type,
      description,
      likedList});
  }

  deletePostFish(id: string) {
    const { apiUrl } = environment;
    return this.http.delete<Fish>(`/api/themes/${id}/delete`);
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
