export class Totals
{
    constructor()
    {
        this.totalPackages=0;
        this.totalPieces=0;
        this.totalNetPrice=0;
        this.totalTaxPrice=0;
        this.totalGrossPrice=0;
        this.totalItems=0;
        this.extraDiscount=0;
        this.discount=0;

    }

    totalPackages:number;
    totalPieces:number;
    totalNetPrice:number;
    totalTaxPrice:number;
    totalGrossPrice:number;//Brüt Fiyat
    totalItems:number;
    extraDiscount:number;
    discount:number;//iskonto
}