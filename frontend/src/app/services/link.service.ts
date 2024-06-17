import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateLink } from '../models/createLink';
import { Link } from '../models/link';


@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private http: HttpClient) { }

  createLink(link: CreateLink) {
    return this.http.post<Link>(environment.API_URL + "/link/create", link);
  }
}
