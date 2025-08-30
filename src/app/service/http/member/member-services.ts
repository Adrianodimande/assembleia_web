import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MemberModel } from '../../../models/memberModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberServices {
  private url: string = environment.url + '/member';

  constructor(private httpClient: HttpClient) {}

  search(search: string): Observable<MemberModel[]> {
    console.log( this.url + '/search?termo=' + search);
    return this.httpClient.get<MemberModel[]>(
      this.url + '/search?termo=' + search
    );
  }

  getAll(): Observable<MemberModel[]> {
    return this.httpClient.get<MemberModel[]>(this.url);
  }
  getById(id: number): Observable<MemberModel> {
    return this.httpClient.get<MemberModel>(this.url + `/${id}`);
  }

  create(model: MemberModel) {
    return this.httpClient.post(this.url, model);
  }

  update(id: number, model: MemberModel) {
    console.log(this.url + `/${id}`);
    return this.httpClient.put(this.url + `/${id}`, model);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + `/${id}`);
  }
}
