import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { receivedOrderProduct } from '../../shared/DTOs/receivedOrderProduct';
import { product } from '../../shared/DTOs/product';
import { ProductsService } from '../../layout/products/products.service';
import { BillService } from '../../layout/bills/bill.service';
declare var jsPDF: any; // Important 
@Component({
  selector: 'pdf-bill',
  templateUrl: './pdf-bill.component.html',
  styleUrls: ['./pdf-bill.component.scss']
})
export class PdfBillComponent implements OnInit {
  config: IConfig;
  //orderDetails: receivedOrderProduct[];
  products: any[] = [];
  @Input()
  bill: any;
  constructor(private productsService: ProductsService, private billService: BillService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  exportPDF() {
    this.getProducts();
    // this.orderService.getAllOrderDetails(this.config.getOrderDetails, this.waybill)
    //   .subscribe(items => {
    //     if (items != null && items.length != 0) {
    //       this.orderDetails = items;
    //       this.generatePDFForOrders();
    //       this.toastr.success('Pdf Olusturuldu!', 'Success!');
    //     } else
    //       this.toastr.error('Urun Listesi Bos, PDF Olusturulamadi', 'Error!');

    //   },
    //     error => this.toastr.error('Pdf Olusturulurken hata ile karsilasildi.', 'Error!'),
    //     () => {
    //       //finally bloke ..!
    //       // No errors, route to new page
    //     }
    //   );


  }
  getBillById(selectedWayBillId): any {

    this.billService.getBill(this.config.getBillUrl, this.bill.id)
      .subscribe(items => {
        var bill = items;
        var billOutputList = [];

        bill.billProducts.forEach(wb => {
          var billOutput;
          //find product information.
          var product = this.products.filter(x => x.id == wb.productId)[0];
          product.numberOfPackage = wb.numberOfPackage;
          // wayBillOutput.barcodeOfProduct=product.barcodeOfProduct;
          // wayBillOutput.orderNumber=product.orderNumber;
          // wayBillOutput.productName=product.productName;
          // wayBillOutput.numberOfPackage=product.numberOfPackage;
          // wayBillOutput.quantity=product.quantity;
          // wayBillOutput.unit=product.unit;

          billOutputList.push(product);
        });

        this.generatePDFForOrders(billOutputList);
      },
        error => this.toastr.error('Fatura getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {

        }
      );
  }

  getProducts() {

    this.productsService.getProducts(this.config.getProductsWithRelationalEntitiesUrl, null)
      .subscribe(items => {
        this.products = items;
        this.getBillById(this.bill.id);
        // this.generatePDFForOrders(wayBill.waybillProducts);
      },
        error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {

        }
      );
  }

  generatePDFForOrders(billProducts) {
    var doc = new jsPDF('p', 'pt');

    doc.autoTable([], [], { margin: { top: 275 } });
    //Define columns name
    var col = ["Pos","Menge(Koli)","Barcode", "Art-Nr", "Text", ];
    var rows = [];

    let waybillId = this.bill.id;
    let customerName = this.bill['customer'].customerName;
    let customerId = this.bill.customer.id;
    let branchName = this.bill.address.branchName;
    let street = this.bill.address.street;
    let postcode = this.bill.address.postCode;
    let cityName = this.bill.address.city.name;
    let billDate = new Date(this.bill.billDate).toLocaleDateString("en-GB");
    let totalNumberOfPackage=0;


    //prepare columns data 
    for (let i = 0; i < billProducts.length; i++) {
      var temp = [i+1, billProducts[i]['numberOfPackage'] + ' (' + billProducts[i]['quantity'] + '/' + billProducts[i]['unit']['name'] + ')',
      billProducts[i]['barcodeOfProduct'], billProducts[i]['orderNumber'], billProducts[i]['productName']];
      //calculate total.
      totalNumberOfPackage+= billProducts[i]['numberOfPackage'];
      rows.push(temp);
    }


    //Define header
    var header = function (data) {
      doc.setFontSize(12);
      doc.setTextColor(40);
      doc.setFontStyle('inactive-row');
      doc.text("GÖRAL Vertriebs GMBH Kenan Aydin , Ohligser Str. 22 , 42329 Wuppertal", data.settings.margin.left, 75);
      //  doc.setFontSize(14); istedigimiz an degistirebiliyoruz fontu.
      doc.text(customerName, data.settings.margin.left, 100);
      doc.text(branchName + " " + street + " " + postcode, data.settings.margin.left, 125);
      doc.setFontSize(14);
      doc.text(cityName, 150);

      doc.setFontSize(12);
      doc.text("LIEFERSCHEIN:" + waybillId, data.settings.margin.left, 250);
      doc.text("Kunden Nr:" + customerId, 440, 175);
      doc.text("Lieferdatum :" + billDate, 440, 190);

      doc.text("Lieferdatum :" + billDate + " " + street + " " + postcode + " / " + cityName, data.settings.margin.left, 270);
    };

    var options = {
      beforePageContent: header,
      margin: {
        top: 80
      },
      startY: doc.autoTableEndPosY() + 20
    };

    doc.autoTable(col, rows, options);
    let finalY = doc.autoTable.previous.finalY; // The y position on the page
    doc.setFontSize(12);
    doc.text("GESAMT KOLLI: "+totalNumberOfPackage, 60,finalY+15);
    var img = new Image;
    img.onload = function () {
      doc.addImage(this, 450, 75);
      doc.save("LIEFERSCHEIN:_" + waybillId + ".pdf");
    };
    img.crossOrigin = "";  // for demo as we are at different origin than image
    img.src = "assets/images/goral.png";

    //  doc.save("SiparisNo:" + orderNumber + ".pdf");
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
  }

}
