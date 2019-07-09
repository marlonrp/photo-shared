import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  constructor(private http: HttpClient) {}

  public listFromUser(userName: string) {
    return this.http.get<Photo[]>(API + '/' + userName + '/photos');
  }

  public listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString());

    return this.http.get<Photo[]>(API + '/' + userName + '/photos', { params });
  }

  public upload(formData: FormData) {
    return this.http.post(`${API}/photos/upload`, formData);
  }

  public findById(id: number) {
    return this.http.get<Photo>(`${API}/photos/${id}`);
  }

  public getComments(photoId: number) {
    return this.http.get<[PhotoComment]>(`${API}/photos/${photoId}/comments`);
  }

  public addComment(photoId: number, commentText: string) {
    return this.http.post(`${API}/photos/${photoId}/comments`, { commentText });
  }
}
