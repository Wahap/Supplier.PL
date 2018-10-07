import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IConfig, ConfigService } from '../app.config';
import { LoginServiceService } from './login.services';
import { User } from '../shared/DTOs/user';

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
    user: User;
    isRemembered : boolean;
    loading:boolean=false;
    constructor(private loginService: LoginServiceService, private configService: ConfigService, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
        //  this.user = { userName: "vahap", Password: "demir" };
         this.user =new User;
        this.toastr.setRootViewContainerRef(vcr);
        this.isRemembered = false;
    }

    ngOnInit() {
        this.config = this.configService.getAppConfig();

        if (localStorage.getItem('userAuth')) {
            this.user = JSON.parse(localStorage.getItem('userAuth'));
        }
    }

    onLoggedin() {
        this.loading=true;
        this.loginService.login(this.config.logInUrl, this.user)
            .subscribe(user => {
                this.loading=false;
                if (user != null && user.name) {
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('userToken', user.token);
                    //Remember me Conan..
                    this.rememberMe();
                    this.router.navigate(['/products']);
                }
                this.toastr.error('Lutfen Sifre yada Kullanici Adinizi Kontrol Ediniz', 'Error!')
            },
            error =>   this.toastr.error('Lutfen Sifre yada Kullanici Adinizi Kontrol Ediniz', 'Error!')
            );

    }
    rememberMe() {
        this.isRemembered == true ? localStorage.setItem('userAuth', JSON.stringify(this.user)) :"";
    }

}
