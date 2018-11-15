import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { WareHouse } from '../../../shared/DTOs/wareHouse';
import { StockService } from '../../stock/stock.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ware-house-list',
  templateUrl: './ware-house-list.component.html',
  styleUrls: ['./ware-house-list.component.scss']
})
export class WareHouseListComponent implements OnInit {
  config:IConfig;
wareHouses:WareHouse[]=[];
showWareHouseForm:boolean=false;
constructor(private stockService:StockService,private configService:ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef,public route:Router) 
{
  this.toastr.setRootViewContainerRef(vcr);
 }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getWareHouses();
  }

  getWareHouses()
  {
    this.stockService.getWareHouses(this.config.getWareHousesUrl,null).subscribe(wareHouses=>{
      this.wareHouses=wareHouses;
    },error=>{
      this.toastr.error("Depolar getirilirken hata oluştu...");
    });
  }
  onWareHouseSaved(wareHouse:WareHouse)
  {
    this.wareHouses.push(wareHouse);
    this.showWareHouseForm=false;
  }
  onWareHouseClick(wareHouse:WareHouse)
  {
    this.route.navigateByUrl("wareHouse/details/"+wareHouse.id);
  }

}
