export interface IConfig {
	logInUrl: string;
	getUsers: string;
	calculate: string;
	getProductsUrl: string;
	saveProductsUrl:string;
	getCategoriesUrl: string;
	getAllUnitsUrl: string;
	getAllBrandsUrl: string;
	getAllCitiesUrl: string;
	getSuppliersUrl:string;
	getCustomersUrl:string;
	saveCustomerUrl:string;


};
import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {


	getAppConfig(): IConfig {

		//	let serverLoginPath = 'http://calculatorservices.azurewebsites.net/api/',serverLoginPathDebug='http://localhost:4068/api/';
		let serverLoginPath = 'https://supplier.azurewebsites.net/api/', serverLoginPathDebug = 'http://localhost:4315/api/';

		let serverUserNotificationPath = '';
		let debug = false;

		let getUsers = (debug ? serverLoginPathDebug + "authentication/login" : serverLoginPath + "userCont/getusers");
		//let logInUrl = (debug ? serverLoginPathDebug + "userCont/login" : serverLoginPath + "userCont/login");
		let logInUrl = (debug ? serverLoginPathDebug + "User/login" : serverLoginPath + "User/login");
		let getLogOutURl = (debug ? serverLoginPathDebug + "authentication/logout" : serverLoginPath + "authentication/logout");
		let calculate = (debug ? serverLoginPathDebug + "Operation" : serverLoginPath + "Operation");
		let getProductsUrl = (debug ? serverLoginPathDebug + "Product/getallproducts" : serverLoginPath + "Product/getallproducts");
		let saveProductsUrl = (debug ? serverLoginPathDebug + "Product/saveproduct" : serverLoginPath + "Product/saveproduct");
		let getCategoriesUrl = (debug ? serverLoginPathDebug + "Common/getallcategories" : serverLoginPath + "Common/getallcategories");
		let getAllUnitsUrl = (debug ? serverLoginPathDebug + "Common/getallunits" : serverLoginPath + "Common/getallunits");
		let getAllBrandsUrl = (debug ? serverLoginPathDebug + "Common/getallbrands" : serverLoginPath + "Common/getallbrands");
		let getAllCitiesUrl = (debug ? serverLoginPathDebug + "Common/getallcities" : serverLoginPath + "Common/getallcities");
		let getSuppliersUrl = (debug ? serverLoginPathDebug + "Common/getallsupplier" : serverLoginPath + "Common/getallsupplier");
		let getCustomersUrl = (debug ? serverLoginPathDebug + "Customer/getallcustomers" : serverLoginPath + "Customer/getallcustomers");
		let saveCustomerUrl = (debug ? serverLoginPathDebug + "Customer/savecustomer" : serverLoginPath + "Customer/savecustomer")
	
		return {
			logInUrl: logInUrl,
			getUsers: getUsers,
			calculate: calculate,
			getProductsUrl: getProductsUrl,
			getCategoriesUrl: getCategoriesUrl,
			getAllUnitsUrl: getAllUnitsUrl,
			getAllBrandsUrl: getAllBrandsUrl,
			getAllCitiesUrl: getAllCitiesUrl,
			getSuppliersUrl:getSuppliersUrl,
			saveProductsUrl:saveProductsUrl,
			getCustomersUrl:getCustomersUrl,
			saveCustomerUrl:saveCustomerUrl

		}
	}
};