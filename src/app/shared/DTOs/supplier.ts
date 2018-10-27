import { City } from "./city";

export class Supplier
{
    id:number;
    cityId:number;
    companyName:string;
    email:string;
    isActive:boolean;
    lastName:string;
    name:string;
    phone:string;
    postCode:string;
    street:string;

    city:City;

}