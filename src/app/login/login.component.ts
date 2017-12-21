import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { IConfig, ConfigService } from '../app.config';
import { LoginServiceService } from '../shared/services/login.services';
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
    public user: User;


    constructor(private loginService: LoginServiceService, private configService: ConfigService, public router: Router) {
        // this.user = { userName: "vahap", password: "demir" };
        this.user = new User();
       
    }

    ngOnInit() {
        this.config = this.configService.getAppConfig();
        this.errorMessage="test test";
    }

    onLoggedin() {
        console.log(this.user);

        this.loginService.login(this.config.logInUrl, this.user)
            .subscribe(items => {
                if (items.length != 0) {
                    // this.userDetail = this.dataSharingService.setUserQuery(items);
                    localStorage.setItem('isLoggedin', 'true');
                    this.router.navigate(['/dashboard']);

                }
                error => this.errorMessage = <any>error
            },
            error => this.errorMessage = <any>error

            );

    }
}
