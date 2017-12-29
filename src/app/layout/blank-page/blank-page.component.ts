import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BlankPageService } from './blank-page.service';
import { ConfigService, IConfig } from '../../app.config';
import { User } from '../../shared/DTOs/user';

//This component and its service have been created for testing porpuse.
@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    config: IConfig;
    user:User;
    constructor(private blankPageServices: BlankPageService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);

    }
    ngOnInit() {
        this.config = this.configService.getAppConfig();
    }
    showSuccess() {
        this.toastr.success('Conan 20 lira ver senin icin adam picakliyim', 'Success!');
    }
    getProducts() {
        this.blankPageServices.getProducts(this.config.getProductsUrl, this.user)
            .subscribe(items => {
                if (items != null && items.length != 0) {
                var data=items;
                }
            },
            error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.', 'Error!')
            );
    }

}
