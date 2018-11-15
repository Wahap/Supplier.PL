import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WareHouse } from '../../../shared/DTOs/wareHouse';
import { StockService } from '../../stock/stock.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { WareHouseProduct } from '../../../shared/DTOs/wareHouseProduct';

@Component({
  selector: 'app-ware-house-details',
  templateUrl: './ware-house-details.component.html',
  styleUrls: ['./ware-house-details.component.scss']
})
export class WareHouseDetailsComponent implements OnInit {
  config:IConfig;
wareHouse:WareHouse=new WareHouse();
wareHouseStockValue:number=0;
showWareHouseForm:boolean=false;
productListCols: any[];
wareHouseProductsCols: any[];
productsInWareHouse:WareHouseProduct[]=[];
stockTaking:boolean=false;
loading:boolean=false;
  constructor(private route:ActivatedRoute,private stockService:StockService,private configService:ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.productListCols = [
       
      { field: 'barcodeOfProduct', header: 'Barkod' },
      { field: 'productName', header: 'Ürün' },
      { field: 'package', header: 'Koli' },
      { field: 'value', header: 'Değeri(€)' }
    ];

    this.wareHouseProductsCols = [
       
      { field: 'barcodeOfProduct', header: 'Barkod' },
      { field: 'productName', header: 'Ürün' },
      { field: 'systemStock', header: 'Sistemdeki Miktar' },
      { field: 'countingStock', header: 'Sayılan Miktar' }
    ];
    this.route.params.subscribe(params=>{
      console.log(params);
      this.wareHouse.id=params.id;
     
      this.getWareHouse();

    });

  
  }

  getWareHouse()
  {
    this.loading=true;
    this.stockService.getWareHouse(this.config.getWareHouseUrl,this.wareHouse).subscribe(wareHouse=>{
      this.loading=false;
      this.wareHouse=wareHouse;
      console.log(this.wareHouse);
      this.productsInWareHouse=[];
      this.wareHouseStockValue=0;
      this.wareHouse.wareHouseProducts.forEach((item)=>{
        this.wareHouseStockValue+=item.package*item.product.unitsInPackage*item.product.netSalePrice;
        if(item.package>0)
        {
          this.productsInWareHouse.push(item);
        }
      });
      
    },error=>{
      this.toastr.error("Depo Getirilirken hata oluştu...");
    });
  }

  saveWareHouseProducts()
  {
    let products=this.wareHouse.wareHouseProducts.filter(x=>x.status=="edited");
    this.stockService.saveWareHouseProducts(this.config.saveWareHouseProductsUrl,products).subscribe(response=>{
      this.toastr.success("Ürünler depoya kaydedildi... Stoklar güncellendi...");
        this.getWareHouse();
        this.stockTaking=false;
    },error=>{
      this.toastr.error("Ürünler kaydedilirken bir hata meydana geldi...");
    })
  }
  takeStock()
  {
    this.stockTaking=true;
  }

  decreaseWareHouseProduct(product:WareHouseProduct)
  {
    product.status="edited";

    if(product.package>0)
    {
      product.package--;
    }
    else
    {
      product.package=0;
    }
   
  }

  increaseWareHouseProduct(product:WareHouseProduct)
  {
   
    product.status="edited";
      product.package++;
    
   
  }

  
  setPackage(product:WareHouseProduct)
  {
   
    product.status="edited";
    if(product.package<1)
    {
      product.package=0;
    }
    
   
  }
  onWareHouseSaved(editedWareHouse:WareHouse)
  {
    this.showWareHouseForm=false;
  }
  windowsHeight() {
    return (window.outerHeight * 0.80 - 120) + "px";
  }

}
