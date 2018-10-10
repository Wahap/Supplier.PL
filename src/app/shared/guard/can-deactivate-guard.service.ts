import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
export interface CanComponentDeactivate {
  isDirty:boolean;
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }  
  canDeactivate(component: CanComponentDeactivate, 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
     if(component.isDirty)
     {
     return confirm("Bazı değişikliklerinizi kaydetmediniz...Devam etmek istiyor musunuz?");
     }
      return true;  

}
}
