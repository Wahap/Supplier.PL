import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { OrderService } from '../layout/order/order.service';
import { ConfigService, IConfig } from '../app.config';
import { ToastsManager } from 'ng2-toastr';
import { receivedOrderProduct } from '../shared/DTOs/receivedOrderProduct';
declare var jsPDF: any; // Important 
@Component({
  selector: 'pdf-exporter',
  templateUrl: './pdf-exporter.component.html',
  styleUrls: ['./pdf-exporter.component.scss']
})
export class PdfExporterComponent implements OnInit {
  config: IConfig;
  orderDetails: receivedOrderProduct[];
  @Input()
  orderData: any;


  constructor(private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   // this.orderstatus=orderStatus;
  }
  exportPDF() {
    
    this.orderService.getAllOrderDetails(this.config.getOrderDetails, this.orderData)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.orderDetails = items;
          this.generatePDFForOrders();
          this.toastr.success('Pdf Olusturuldu!', 'Success!');
        }else
        this.toastr.error('Urun Listesi Bos, PDF Olusturulamadi', 'Error!');

      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );


  
  }

  generatePDFForOrders()
  {
    var doc = new jsPDF('p', 'pt');

    doc.autoTable([], [], { margin: { top: 50 } });
    //Define columns name
    var col = ["Barkod", "Siparis No", "Ürün", "Siparis Edilen(Koli)"];
    var rows = [];

    let orderNumber =  this.orderDetails[0]['receivedOrderId'];
    //prepare columns data 
    for (let i = 0; i < this.orderDetails.length; i++) {
      var temp = [this.orderDetails[i]['product']['barcodeOfProduct'], this.orderDetails[i]['product']['orderNumber'], this.orderDetails[i]['product']['productName'],
      this.orderDetails[i]['numberOfPackage'] +' ('+ this.orderDetails[i]['product']['quantity'] + '/' + this.orderDetails[i]['product']['unit']['name']+')'
      ];
      rows.push(temp);
    }


    //Define header
    var header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('inactive-row');
      doc.set
      //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
      doc.text("Siparis No: " +orderNumber, data.settings.margin.left, 50);
    };

    var options = {
      beforePageContent: header,
      margin: {
        top: 80
      },
      startY: doc.autoTableEndPosY() + 20
    };

    doc.autoTable(col, rows, options);

    doc.save("SiparisNo:"+orderNumber+".pdf");
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
  }

}
