import { Component, OnInit,Input } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { Bill } from '../../../shared/DTOs/Bill';

@Component({
  selector: 'app-waybills-list',  
  templateUrl: './waybills-list.component.html',
  styleUrls: ['./waybills-list.component.scss']
})
export class WaybillsListComponent implements OnInit {
  config: IConfig;
  loading:boolean=true;
  @Input() allWaybills:Waybill[]=[];
  selectedWayBill:Waybill;
  allCustomers:Customer[]=[];
  dialogVisible:boolean=false;
  showPrintDialog:boolean=false;
  waybillListColumns:any[];
  existsInputData:boolean=false;
  constructor(private configService: ConfigService,private waybillService:WaybillService,private customerService:CustomersService,public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if(!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllWaybills();
    }
    else//Data coming from another component
    {
this.loading=false;
    }
    
    this.waybillListColumns = [
      { field: 'id', header: 'Irs.No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'customerName', header: 'Müşteri' },
      { field: 'address', header: 'Adres' },
      { field: 'update', header: 'Güncelle' },
      { field: 'convert', header: 'Dönüştür' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];

   // this.fillAllCustomers();
  }
ngOnChanges(waybills): void {
  this.existsInputData=true;
  
  //this.allWaybills=waybills;
  
  
}
  fillAllWaybills()   
  {
    this.waybillService.getAllWaybills(this.config.getAllWaybillsUrl,null).subscribe(waybills=>{
      this.allWaybills=waybills;
      console.log(waybills);
      this.loading=false;
    });
  }

  fillAllCustomers()
  {
    this.customerService.getCustomers(this.config.getCustomersUrl,null).subscribe(customers=>{
      this.allCustomers=customers;
      
    });
  }

  deleteWaybill(waybill)
  {
   
  
   
     if(confirm("irsaliyeyi Silmek istediğinize Emin Misiniz?"))
     {
      this.waybillService.deleteWaybill(this.config.deleteWaybillUrl,waybill).subscribe(result=>{
        this.fillAllWaybills();
      });
     }
   
  }
  convertWaybillToBill(waybill:Waybill)
  {
    
    if(confirm("irsaliyeyi Faturaya Dönüştürülecek. Devam etmek istiyor musunuz?"))
    {
      this.waybillService.convertWaybillToBill(this.config.convertWaybillToBillUrl,waybill).subscribe((bill:Bill)=>{
      waybill.convertedBillNumber=bill.billNumber;
      });
    }
   
  }
  updateWaybill(waybill:Waybill)
  {
    
    this.selectedWayBill=waybill;
    this.dialogVisible = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    // });
  }
  onWaybillPreview(waybill:Waybill)
  {
    this.selectedWayBill=waybill;
this.showPrintDialog=true;
  }
  onCloseNewWaybillDialog()
  {
    this.selectedWayBill=null;
  }

  windowsHeight() {
    return (window.innerHeight) + "px";
  }
  windowsWidth() {
    return (window.screen.width * 0.85 - 120) + "px";
  }

}
