export interface IConfig {
	logInUrl: string;
	getUsers: string;
	calculate: string;

	getProductsUrl: string;
	getProductsByPriceTypeUrl: string;
	saveProductsUrl:string;
	getProductsWithRelationalEntitiesUrl:string;
	getPriceGroupsUrl:string;

	getCategoriesUrl: string;
	getAllUnitsUrl: string;
	getAllBrandsUrl: string;
	getAllCitiesUrl: string;
	getSuppliersUrl:string;
	getCustomersUrl:string;
	saveCustomerUrl:string;
	saveOrDeleteAddress:string;
	getAllOrderByStatusUrl:string;
	getOrderDetails:string;
	saveReceivedOrder:string;

	getLastWaybillUrl:string;
	getWaybillUrl:string;
	saveWaybillUrl:string;
	getAllWaybillsUrl:string;
	deleteWaybillUrl:string;

	getLastBillUrl:string;
	getBillUrl:string;
	saveBillUrl:string;
	saveProductPrice:string;
	getAllBillsUrl:string;
	deleteBillUrl:string;


};
import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {


	getAppConfig(): IConfig {

	
	//	let serverLoginPath = 'https://supplier.azurewebsites.net/api/', serverLoginPathDebug = 'http://localhost:4315/api/';
		let serverLoginPath = 'https://devsupplier.azurewebsites.net/api/', serverLoginPathDebug = 'http://localhost:4315/api/';
	

		let serverUserNotificationPath = '';
		let debug = true;

		let getUsers = (debug ? serverLoginPathDebug + "authentication/login" : serverLoginPath + "userCont/getusers");
		//let logInUrl = (debug ? serverLoginPathDebug + "userCont/login" : serverLoginPath + "userCont/login");
		let logInUrl = (debug ? serverLoginPathDebug + "User/login" : serverLoginPath + "User/login");
		let getLogOutURl = (debug ? serverLoginPathDebug + "authentication/logout" : serverLoginPath + "authentication/logout");
		let calculate = (debug ? serverLoginPathDebug + "Operation" : serverLoginPath + "Operation");
		//ProductController 
		let getProductsUrl = (debug ? serverLoginPathDebug + "Product/getallproducts" : serverLoginPath + "Product/getallproducts");
		let getProductsByPriceTypeUrl = (debug ? serverLoginPathDebug + "Product/getallproductsbypricetype" : serverLoginPath + "Product/getallproductsbypricetype");
		let getProductsWithRelationalEntities = (debug ? serverLoginPathDebug + "Product/getallproductswithrelationalentities" : serverLoginPath + "Product/getallproductswithrelationalentities");
		let saveProductsUrl = (debug ? serverLoginPathDebug + "Product/saveproduct" : serverLoginPath + "Product/saveproduct");
		let getPriceGroupsUrl = (debug ? serverLoginPathDebug + "Product/getallpricegroups" : serverLoginPath + "Product/getallpricegroups");
		let saveProductPrice  = (debug ? serverLoginPathDebug + "Product/saveproductprices" : serverLoginPath + "Product/saveproductprices");
		
		
		let getCategoriesUrl = (debug ? serverLoginPathDebug + "Common/getallcategories" : serverLoginPath + "Common/getallcategories");
		let getAllUnitsUrl = (debug ? serverLoginPathDebug + "Common/getallunits" : serverLoginPath + "Common/getallunits");
		let getAllBrandsUrl = (debug ? serverLoginPathDebug + "Common/getallbrands" : serverLoginPath + "Common/getallbrands");
		let getAllCitiesUrl = (debug ? serverLoginPathDebug + "Common/getallcities" : serverLoginPath + "Common/getallcities");
		let getSuppliersUrl = (debug ? serverLoginPathDebug + "Common/getallsupplier" : serverLoginPath + "Common/getallsupplier");
		let getCustomersUrl = (debug ? serverLoginPathDebug + "Customer/getallcustomers" : serverLoginPath + "Customer/getallcustomers");
		let saveCustomerUrl = (debug ? serverLoginPathDebug + "Customer/savecustomer" : serverLoginPath + "Customer/savecustomer");
		let saveOrDeleteAddress = (debug ? serverLoginPathDebug + "Customer/" : serverLoginPath + "Customer/");
		let getAllOrderByStatusUrl = (debug ? serverLoginPathDebug + "order/getReceivedOrderProductsByStatus" : serverLoginPath + "order/getReceivedOrderProductsByStatus");
		let getOrderDetails = (debug ? serverLoginPathDebug + "order/getReceivedOrderProducts" : serverLoginPath + "order/getReceivedOrderProducts");
		let saveReceivedOrder = (debug ? serverLoginPathDebug + "order/updatereceivedorder" : serverLoginPath + "order/updatereceivedorder");

		let getLastWaybillUrl = (debug ? serverLoginPathDebug + "waybill/getlastwaybill" : serverLoginPath + "waybill/getlastwaybill");
		let saveWaybillUrl = (debug ? serverLoginPathDebug + "waybill/save" : serverLoginPath + "waybill/save");
		let getAllWaybillsUrl = (debug ? serverLoginPathDebug + "waybill/getallwaybills" : serverLoginPath + "waybill/getallwaybills");
		let deleteWaybillUrl = (debug ? serverLoginPathDebug + "waybill/deletewaybill" : serverLoginPath + "waybill/deletewaybill");
		let getWaybillUrl = (debug ? serverLoginPathDebug + "waybill/getwaybill" : serverLoginPath + "waybill/getwaybill");

		let getLastBillUrl = (debug ? serverLoginPathDebug + "bill/getlastbill" : serverLoginPath + "bill/getlastbill");
		let saveBillUrl = (debug ? serverLoginPathDebug + "bill/save" : serverLoginPath + "bill/save");
		let getAllBillsUrl = (debug ? serverLoginPathDebug + "bill/getallbills" : serverLoginPath + "bill/getallbills");
		let deleteBillUrl = (debug ? serverLoginPathDebug + "bill/deletebill" : serverLoginPath + "bill/deletebill");
		let getBillUrl = (debug ? serverLoginPathDebug + "bill/getbill" : serverLoginPath + "bill/getbill");
		
		return {
			logInUrl: logInUrl,
			getUsers: getUsers,
			calculate: calculate,
			getProductsUrl: getProductsUrl,
			getPriceGroupsUrl:getPriceGroupsUrl,
			getProductsByPriceTypeUrl:getProductsByPriceTypeUrl,
			getCategoriesUrl: getCategoriesUrl,
			getProductsWithRelationalEntitiesUrl:getProductsWithRelationalEntities,
			getAllUnitsUrl: getAllUnitsUrl,
			getAllBrandsUrl: getAllBrandsUrl,
			getAllCitiesUrl: getAllCitiesUrl,
			getSuppliersUrl:getSuppliersUrl,
			saveProductsUrl:saveProductsUrl,
			getCustomersUrl:getCustomersUrl,
			saveCustomerUrl:saveCustomerUrl,
			saveOrDeleteAddress:saveOrDeleteAddress,
			getAllOrderByStatusUrl:getAllOrderByStatusUrl,
			getOrderDetails:getOrderDetails,
			saveReceivedOrder:saveReceivedOrder,
			getLastWaybillUrl:getLastWaybillUrl,
			saveWaybillUrl:saveWaybillUrl,
			getAllWaybillsUrl:getAllWaybillsUrl,
			deleteWaybillUrl:deleteWaybillUrl,
			getWaybillUrl:getWaybillUrl,
			
			getLastBillUrl:getLastBillUrl,
			saveBillUrl:saveBillUrl,
			getAllBillsUrl:getAllBillsUrl,
			deleteBillUrl:deleteBillUrl,
			getBillUrl:getBillUrl,
			saveProductPrice:saveProductPrice

		}
	}
};