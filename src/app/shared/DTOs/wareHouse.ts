import { WareHouseProduct } from "./wareHouseProduct";

export class WareHouse
{
    /**
     *
     */
    constructor() {
       this.id=0;
        
    }
    id:number;
    name:string;
    isPrimary:boolean;
    wareHouseProducts:WareHouseProduct[]=[];
}