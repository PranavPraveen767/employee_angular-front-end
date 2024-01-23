import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //to return boolean
  isLogged(){
    return !!localStorage.getItem("name")

  }
}
