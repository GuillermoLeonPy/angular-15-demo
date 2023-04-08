import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    
  }
  apiurl='http://localhost:3000/user'
  rolesapiurl='http://localhost:3000/role'

  GetAll(){
      return this.http.get(this.apiurl);
  }

  getAllRoles(){
    return this.http.get(this.rolesapiurl);
}

  GetBycode(code:any){
    return this.http.get(this.apiurl + '/' + code);
  }

  Proceedregister(inputdata:any){
    return this.http.post(this.apiurl, inputdata);
  }

  Updateuser(code:any,inputdata:any){
    return this.http.put(this.apiurl + '/' + code, inputdata);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username') != null;
  }

  getUserRole(){
    return sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole')?.toString() : '';
  }
}
