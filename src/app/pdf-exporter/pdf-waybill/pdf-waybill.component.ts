import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../app.config';
import { Waybill } from '../../shared/DTOs/wayBill';
import { ToastsManager } from 'ng2-toastr';
import { receivedOrderProduct } from '../../shared/DTOs/receivedOrderProduct';
import { OrderService } from '../../layout/order/order.service';
import { WaybillService } from '../../layout/waybills/waybill.service';
import { product } from '../../shared/DTOs/product';
import { ProductsService } from '../../layout/products/products.service';
declare var jsPDF: any; // Important 
@Component({
  selector: 'pdf-waybill',
  templateUrl: './pdf-waybill.component.html',
  styleUrls: ['./pdf-waybill.component.scss']
})
export class PdfWaybillComponent implements OnInit {
  config: IConfig;
  //orderDetails: receivedOrderProduct[];
  products: any[] = [];
  @Input()
  waybill: any;
  constructor(private productsService: ProductsService, private waybillService: WaybillService, private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
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
  getWayBillById(selectedWayBillId): any {

    this.waybillService.getWaybill(this.config.getWaybillUrl, this.waybill.id)
      .subscribe(items => {
        var waybill = items;
        var wayBillOutputList = [];

        waybill.waybillProducts.forEach(wb => {
          var wayBillOutput;
          //find product information.
          var product = this.products.filter(x => x.id == wb.productId)[0];
          product.numberOfPackage = wb.numberOfPackage;
          // wayBillOutput.barcodeOfProduct=product.barcodeOfProduct;
          // wayBillOutput.orderNumber=product.orderNumber;
          // wayBillOutput.productName=product.productName;
          // wayBillOutput.numberOfPackage=product.numberOfPackage;
          // wayBillOutput.quantity=product.quantity;
          // wayBillOutput.unit=product.unit;

          wayBillOutputList.push(product);
        });

        this.generatePDFForOrders(wayBillOutputList);
      },
        error => this.toastr.error('Irsaliye getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {

        }
      );
  }

  getProducts() {

    this.productsService.getProducts(this.config.getProductsWithRelationalEntitiesUrl, null)
      .subscribe(items => {
        this.products = items;
        this.getWayBillById(this.waybill.id);
        // this.generatePDFForOrders(wayBill.waybillProducts);
      },
        error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {

        }
      );
  }

  generatePDFForOrders(waybillProducts) {
    var doc = new jsPDF('p', 'pt');

    doc.autoTable([], [], { margin: { top: 275 } });
    //Define columns name
    var col = ["Barkod", "Siparis No", "Ürün", "Siparis Edilen(Koli)"];
    var rows = [];

    let waybillId = this.waybill.id;
    let customerName = this.waybill['customer'].customerName;
    let customerId = this.waybill.customer.id;
    let branchName = this.waybill.address.branchName;
    let street = this.waybill.address.street;
    let postcode = this.waybill.address.postCode;
    let cityName = this.waybill.address.city.name;
    let wayBillDate = new Date(this.waybill.waybillDate).toLocaleDateString("en-GB");


    let ad = this.waybill.customer.customerName;
    //prepare columns data 
    for (let i = 0; i < waybillProducts.length; i++) {
      var temp = [waybillProducts[i]['barcodeOfProduct'], waybillProducts[i]['orderNumber'], waybillProducts[i]['productName'],
      waybillProducts[i]['numberOfPackage'] + ' (' + waybillProducts[i]['quantity'] + '/' + waybillProducts[i]['unit']['name'] + ')'
      ];
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
      doc.text("Lieferdatum :" + wayBillDate, 440, 190);

      doc.text("Lieferdatum :" + wayBillDate + " " + street + " " + postcode + " / " + cityName, data.settings.margin.left, 270);
    };

    var options = {
      beforePageContent: header,
      margin: {
        top: 80
      },
      startY: doc.autoTableEndPosY() + 20
    };

    doc.autoTable(col, rows, options);

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
