import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BlankPageService } from './blank-page.service';
import { ConfigService, IConfig } from '../../app.config';
import { User } from '../../shared/DTOs/user';
import { CommonService } from '../../shared/common.service';
import { brand } from '../../shared/DTOs/brand';
import { category } from '../../shared/DTOs/category';
import { NgForm }    from '@angular/forms';
import * as jsPDF from 'jspdf'
//This component and its service have been created for testing porpuse.
@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    providers: [
        { provide: 'Window',  useValue: window }
      ]
})
export class BlankPageComponent implements OnInit {
    config: IConfig;
    user: User;
    brands: brand[];
    selectedBrand: any;
    categories: category[];
    selectedCategory: category;
    model: any=[];
    items=[];
    constructor( @Inject('Window') private window: Window,private commonServices: CommonService, private blankPageServices: BlankPageService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this.model = { username: '', password: '' };
    }

    
  download() {

    var doc = new jsPDF();
    doc.text(20, 20, 'Hello Kenan Gardas!');
    doc.text(20, 30, '20 lira ver senin icin adam picakliyim');
    doc.addPage();
    doc.text(20, 20, 'test');

    // Save the PDF
    doc.save('ConanLtdSiparisler.pdf');
}
    ngOnInit() {
        this.config = this.configService.getAppConfig();
        this.getCategories();
        this.items = [
            {label: 'Step 1'},
            {label: 'Step 2'},
            {label: 'Step 3'}
        ];
     
    }
    showSuccess() {
        this.toastr.success('Conan 20 lira ver senin icin adam picakliyim', 'Success!');
    }
    getProducts() {
        this.blankPageServices.getProducts(this.config.getProductsUrl, this.user)
            .subscribe(items => {
                if (items != null && items.length != 0) {
                    var data = items;
                }
            },
            error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.', 'Error!')
            );
    }
    getCategories() {
        this.commonServices.getCategories(this.config.getCategoriesUrl, this.user)
            .subscribe(items => {
                if (items != null && items.length != 0) {
                    this.categories = items;
                }
            },
            error => this.toastr.error('Kategoriler getirilirken hata ile karsilasildi.', 'Error!')
            );
    }
    getAllUnits() {
        this.commonServices.getAllUnits(this.config.getAllUnitsUrl, this.user)
            .subscribe(items => {
                if (items != null && items.length != 0) {
                    this.brands = items;
                }
            },
            error => this.toastr.error('Tum Unitler getirilirken hata ile karsilasildi.', 'Error!')
            );
    }
    getAllBrands() {
        this.commonServices.getAllBrands(this.config.getAllBrandsUrl, this.user)
            .subscribe(items => {
                if (items != null && items.length != 0) {
                    this.brands = items;
                }
            },
            error => this.toastr.error('Tum Unitler getirilirken hata ile karsilasildi.', 'Error!')
            );
    }
    getAllCities() {
        this.commonServices.getAllCities(this.config.getAllCitiesUrl, this.user)
            .subscribe(items => {
                if (items != null && items.length != 0) {
                    var data = items;
                }
            },
            error => this.toastr.error('Tum Unitler getirilirken hata ile karsilasildi.', 'Error!')
            );
    }


}
