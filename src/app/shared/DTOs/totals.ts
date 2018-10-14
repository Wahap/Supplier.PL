export class Totals
{
    constructor()
    {
        this.totalPackages=0;
        this.totalPieces=0;
        this.totalNetPrice=0;
        this.totalPurchasePrice=0;
        this.totalTaxPrice=0;
        this.totalGrossPrice=0;
        this.totalItems=0;
        this.extraDiscount=0;
        this.discount=0;
        this.subNetTotalPrice=0;
        this.subGrossTotalPrice=0;

    }

    totalPackages:number;
    totalPieces:number;
    totalNetPrice:number;//netSubTotalPrice-extraDiscount
    subNetTotalPrice:number;
    totalPurchasePrice:number;
    totalTaxPrice:number;
    totalGrossPrice:number;//subGrossTotalPrice-discount
    subGrossTotalPrice:number;//
    totalItems:number;
    extraDiscount:number;
    discount:number;//iskonto// subGrossTotalPrice*discountRate/100
}