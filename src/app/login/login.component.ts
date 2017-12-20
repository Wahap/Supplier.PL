import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { IConfig, ConfigService } from '../app.config';
import { LoginServiceService } from '../shared/services/login.services';

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

    constructor(private loginService: LoginServiceService,private configService: ConfigService,public router: Router) {
      //  this.user = { userName: "vahap", Password: "demir" };
      this.user={};
    }

    ngOnInit() {
        this.config = this.configService.getAppConfig();
    }

    onLoggedin() {
        console.log(this.user);
        this.loginService.login(this.config.logInUrl, this.user)
        .subscribe(items => {
          if (items != null) {         
            // this.userDetail = this.dataSharingService.setUserQuery(items);
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard']);

          }
        },
        error => this.errorMessage = <any>error

        );
    
    }
}
