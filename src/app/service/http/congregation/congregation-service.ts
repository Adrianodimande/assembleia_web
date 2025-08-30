import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CongregationModel } from '../../../models/congregationModel ';

@Injectable({
  providedIn: 'root',
})
export class CongregationService {
  private url: string = environment.url + '/congregation';

  constructor(private httpClient: HttpClient) {}

  search(search: string): Observable<CongregationModel[]> {
    console.log(this.url + '/search?termo=' + search);
    return this.httpClient.get<CongregationModel[]>(
      this.url + '/search?termo=' + search
    );
  }

  getAll(): Observable<CongregationModel[]> {
  console.log(this.url);
    return this.httpClient.get<CongregationModel[]>(this.url);
  }
  getById(id: number): Observable<CongregationModel> {
    return this.httpClient.get<CongregationModel>(this.url + `/${id}`);
  }

  create(model: CongregationModel) {
    return this.httpClient.post(this.url, model);
  }

  update(id: number, model: CongregationModel) {
    console.log(this.url + `/${id}`);
    return this.httpClient.put(this.url + `/${id}`, model);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + `/${id}`);
  }
}
