import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    FirstName: '',
    LastName: '',
    CountryCode: '',
    MobileNo: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    UserType: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  postUser(user: User) {
    console.log(JSON.stringify(user));
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }
  login(authCredentials) {
    //console.log("Auth",JSON.stringify(authCredentials));
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);

  }
  deleteToken() {
    localStorage.removeItem('token');

  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUserPayLoad() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayLoad = atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
    else {
      return null;
    }

  }
  isLoggedIn() {
    var userPayload = this.getUserPayLoad();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  OTPverify(email){
    return this.http.post(environment.apiBaseUrl + '/OTP',{Email:email.toString()},this.noAuthHeader);
  }
}

