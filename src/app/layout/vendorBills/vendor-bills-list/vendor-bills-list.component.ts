import { Component, OnInit, Input } from '@angular/core';
import { ConfigService, IConfig } from '../../../app.config';
import { VendorBillService } from '../vendor-bill.service';
import { VendorBill } from '../../../shared/DTOs/vendorBill';

@Component({
  selector: 'app-vendor-bills-list',
  templateUrl: './vendor-bills-list.component.html',
  styleUrls: ['./vendor-bills-list.component.scss']
})
export class VendorBillsListComponent implements OnInit {
  config: IConfig;
  loading:boolean=true;
  billListColumns:any[];
  existsInputData:boolean=false;
  @Input() allBills:VendorBill[]=[];
  selectedBill:VendorBill;
  showUpdateBillDialog:boolean=false;
  showPrintDialog:boolean=false;
  constructor(private configService: ConfigService,private vendorBillService:VendorBillService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if(!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllVendorBills();

    }
    else//Data coming from another component
    {
this.loading=false;
    }
    
    this.billListColumns = [   
      { field: 'billNumber', header: 'Fatura.No' },
      { field: 'supplier', header: 'Toptancı' },
      { field: 'isPaid', header: 'Ödenme Durumu' },
      { field: 'update', header: 'Güncelle' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];
  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.existsInputData=true;
    
  }
  fillAllVendorBills()
  {
    this.vendorBillService.getAllVendorBills(this.config.getAllVendorBillsUrl,null).subscribe(bills=>{
      this.allBills=bills;
      this.loading=false;
    });
  }
  onIsPaidChange(bill)
  {
    this.vendorBillService.saveVendorBill(this.config.saveVendorBillUrl,bill).subscribe(response=>{


    });
  }
  deleteBill(bill:VendorBill)
  {
   
    
    
     if(confirm("Faturayı Silmek istediğinize emin misiniz?"))
     {
       this.loading=true;
      this.vendorBillService.deleteVendorBill(this.config.deleteVendorBillUrl,bill).subscribe(result=>{
        this.fillAllVendorBills();
      });
     }
    
  }
  updateBill(bill:VendorBill)
  {
    
    this.selectedBill=bill;
    this.showUpdateBillDialog = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    // });
  }
  onBillPreview(bill:VendorBill)
  {
    this.selectedBill=bill;
this.showPrintDialog=true;
  }
  onCloseNewBillDialog()
  {
    this.selectedBill=null;
  }
  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }
  windowsWidth() {
    return (window.screen.width * 0.80 - 120) + "px";
  }
}
