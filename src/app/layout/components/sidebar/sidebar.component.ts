import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    currentUser:any;

  
    constructor(private authService:AuthService) {
       
       
        this.currentUser=this.authService.currentUser;
    }
    
    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
