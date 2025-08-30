import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private url: string = environment.url + '/user';

  constructor(private httpClient: HttpClient) {}

  search(search: string): Observable<UserModel[]> {
    console.log( this.url + '/search?termo=' + search);
    return this.httpClient.get<UserModel[]>(
      this.url + '/search?termo=' + search
    );
  }

  getAll(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.url);
  }
  getById(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.url + `/${id}`);
  }

  create(model: UserModel) {
    return this.httpClient.post(this.url, model);
  }

  update(id: number, model: UserModel) {
    console.log(this.url + `/${id}`);
    return this.httpClient.put(this.url + `/${id}`, model);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + `/${id}`);
  }
}
