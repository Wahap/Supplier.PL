import { ProductPriceGroup } from "./productPriceGroup";
import { Category } from "./category";

export class Product
{
    id:number;
    barcodeOfPackage:string;
    barcodeOfProduct:string;
    brandId:number;
    categoryId:number;
    createdDate:Date;
    deleteDate:Date;
    descripton:string;
    imageUrl:string;
    isActive:boolean;
    productName:string;
    netSalePrice: number;
    orderNumber:number;
    purchasePrice:number;
    quantity:number;
    supplierId:number;
    tax:number;
    unitId:number;
    unitsInPackage:number;
    updateDate:Date;
    stockAmount:number;
    criticalStockAmount:number;
    productPriceGroups:ProductPriceGroup[];
    
    //Navigation Properties
    category:Category;
    //Using only UI Properties
    package:number;//using how many package is adding to waybill,bill...
    bronzePriceGroup:ProductPriceGroup;
    silverPriceGroup:ProductPriceGroup;
    goldPriceGroup:ProductPriceGroup;
    //using for which process is calling (adding,deleting or editing)
    status:string;

}