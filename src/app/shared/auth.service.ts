import { Injectable } from '@angular/core';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class AuthService {

  constructor() 
  {
   
    
   }

   get currentUser()
   {
     let token=localStorage.getItem("userToken");
     if(!token) return null;

     let decodedToken=new JwtHelper().decodeToken(token);;
     return decodedToken;
   }

   isLoggedIn()
   {
    let token=localStorage.getItem("userToken");
    return token!=null;
   }

}
