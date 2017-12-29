export interface IConfig {
	logInUrl: string;
	getUsers: string;
	calculate: string;
	getProductsUrl: string;


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

		return {
			logInUrl: logInUrl,
			getUsers: getUsers,
			calculate: calculate,
			getProductsUrl: getProductsUrl

		}
	}
};