import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  url= environment.apiUrl+"/users"
 
  constructor(private http:HttpClient) { }
  getUsers() {
    return this.http.get(this.url);
  }

  createUser(data:any) {
    return this.http.post(this.url, data)
  }

  deleteUser(id){
    const deleteUrl = this.url+"/"+id
    return this.http.delete(deleteUrl)
  }

  updateUser(id, data) {
    const updateUrl = this.url+"/"+id
    return this.http.put(updateUrl, data)

  }
}
