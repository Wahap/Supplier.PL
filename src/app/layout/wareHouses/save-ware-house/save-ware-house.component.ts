import { Component, OnInit, ViewContainerRef,EventEmitter, Output, Input } from '@angular/core';
import { WareHouse } from '../../../shared/DTOs/wareHouse';
import { IConfig, ConfigService } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-save-ware-house',
  templateUrl: './save-ware-house.component.html',
  styleUrls: ['./save-ware-house.component.scss']
})
export class SaveWareHouseComponent implements OnInit {
  config:IConfig;
  @Input() wareHouse:WareHouse=new WareHouse();
  @Output() onWareHouseSaved=new EventEmitter();
  constructor(private stockService:StockService,private configService:ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
  }
ngOnChanges() {
  
}
  saveWareHouse()
  {
    this.stockService.saveWareHouse(this.config.saveWareHouseUrl,this.wareHouse).subscribe(wareHouse=>{
      this.toastr.success("Depo Kaydedildi...");
      this.onWareHouseSaved.emit(wareHouse);
    },error=>{
      this.toastr.error("Depo kaydedilirken bir hata meydana geldi...");
    });
  }

}
