import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IConfig, ConfigService } from '../app.config';
import { LoginServiceService } from './login.services';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})

export class LoginComponent implements OnInit {
    @Input()
    userDetail: any;
    config: IConfig;
    errorMessage: string;
    user: any;

    constructor(private loginService: LoginServiceService, private configService: ConfigService, public router: Router,public toastr: ToastsManager, vcr: ViewContainerRef) {
        //  this.user = { userName: "vahap", Password: "demir" };
        this.user = {};
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.config = this.configService.getAppConfig();
        if (localStorage.getItem('userAuth')) {
            this.user = JSON.parse(localStorage.getItem('userAuth'));
        }
    }

    onLoggedin() {
        this.loginService.login(this.config.logInUrl, this.user)
            .subscribe(items => {
                if (items != null&&items.length!=0) {
                    localStorage.setItem('isLoggedin', 'true');
                    //Remember me Conan..
                    localStorage.setItem('userAuth',JSON.stringify( this.user));
                    this.router.navigate(['/dashboard']);
                }
                this.toastr.error('You are awesome!', 'Error!') 
            },
            error =>  this.toastr.error('You are awesome!', 'Success!') 
            );
          
    }

}
