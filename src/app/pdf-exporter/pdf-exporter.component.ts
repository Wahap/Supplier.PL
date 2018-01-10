import { Component, OnInit, Input } from '@angular/core';
declare var jsPDF: any; // Important 
@Component({
  selector: 'pdf-exporter',
  templateUrl: './pdf-exporter.component.html',
  styleUrls: ['./pdf-exporter.component.scss']
})
export class PdfExporterComponent implements OnInit {
  @Input()
  jsonData:any;
  

  
  
  constructor() {
    
   }
   exportPDF() {

    var doc = new jsPDF();
    var col = ["Barkod","Sipariş No", "Ürün","Sipariş Edilen(Koli)"];
    var rows = [];
    for(let i=0;i<this.jsonData.length; i++){
      // for(var key in item[i]){
           var temp = [ this.jsonData[i]['product']['barcodeOfProduct'],this.jsonData[i]['product']['orderNumber'],this.jsonData[i]['product']['productName'],
           this.jsonData[i]['product']['numberOfPackage']+  this.jsonData[i]['product']['quantity']+'/'+this.jsonData[i]['product']['unit']['name']
          ];
           rows.push(temp);
       //}
   }
    // for(let i=0;i<this.jsonData.length; i++)
    // for(var key in this.jsonData[i]){
    //     var temp = [key, this.jsonData[key]];
    //     rows.push(temp);
    // }

    doc.autoTable(col, rows);

    doc.save('Test.pdf');
   let data  
  }

  ngOnInit() {
  }

}
