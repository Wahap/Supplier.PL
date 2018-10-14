import { Component, OnInit, Input } from '@angular/core';
import { ReturnBill } from '../../../shared/DTOs/returnBill';
import { ReturnBillService } from '../return-bill.service';
import { IConfig, ConfigService } from '../../../app.config';

@Component({
  selector: 'app-return-bill-list',
  templateUrl: './return-bill-list.component.html',
  styleUrls: ['./return-bill-list.component.scss']
})
export class ReturnBillListComponent implements OnInit {
  billListColumns:any[];
  config: IConfig;
  @Input() allBills:ReturnBill[]=[];
  existsInputData:boolean=false;
  loading:boolean=true;
  selectedBill:ReturnBill;
  showUpdateBillDialog:boolean=false;
  showPrintDialog:boolean=false;
  constructor(private returnBillService:ReturnBillService,private configService: ConfigService) { }
  
  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if(!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllBills();

    }
    else//Data coming from another component
    {
this.loading=false;
    }
    this.billListColumns = [   
      { field: 'billNumber', header: 'Fatura.No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'isPaid', header: 'Ödenme Durumu' },
      { field: 'update', header: 'Güncelle' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];
  }

  ngOnChanges() {
   
   this.existsInputData=true;
  }
  updateBill(bill:ReturnBill)
  {
    
    this.selectedBill=bill;
    this.showUpdateBillDialog = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    // });
  }
  fillAllBills()
  {
    this.returnBillService.getAllReturnBills(this.config.getAllReturnBillsUrl,null).subscribe(bills=>{
      this.allBills=bills;
      this.loading=false;
    });
  }

  deleteBill(bill:ReturnBill)
  {
   
    
    
     if(confirm("Faturayı Silmek istediğinize emin misiniz?"))
     {
       this.loading=true;
      this.returnBillService.deleteReturnBill(this.config.deleteReturnBillUrl,bill).subscribe(result=>{
       let indis=this.allBills.findIndex(returnBill=>returnBill.id==bill.id);
       this.allBills.splice(indis,1);
       this.loading=false;
      });
     }
    
  }
  onBillPreview(bill:ReturnBill)
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

}
