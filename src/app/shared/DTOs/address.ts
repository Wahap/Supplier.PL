import { City } from "./city";

export  class Address
{
    /**
     *
     */
    constructor() {
      this.id=0;
        
    }
    id:number;
    customerId:number;
    cityId:number;
    city:City;
    postCode:string;
    street:string;
    branchName:string;
    isActive:boolean;
    
}