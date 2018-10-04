import { ProductPriceGroup } from "./productPriceGroup";

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
    productPriceGroups:ProductPriceGroup[];

    //Using only UI Properties
    bronzePriceGroup:ProductPriceGroup;
    silverPriceGroup:ProductPriceGroup;
    goldPriceGroup:ProductPriceGroup;

}