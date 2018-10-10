export interface IConfig {
	logInUrl: string;
	getUsers: string;
	calculate: string;

	getProductsUrl: string;
	getPassiveProductsUrl: string;
	getProductsByPriceTypeUrl: string;
	saveProductsUrl:string;
	getProductsWithRelationalEntitiesUrl:string;
	getGroupPricesUrl:string;
	getAllGroupsPricesUrl:string;
	saveProductGroupPricesUrl:string;

	getCategoriesUrl: string;
	getAllUnitsUrl: string;
	getAllBrandsUrl: string;
	getAllCitiesUrl: string;
	getSuppliersUrl:string;
	getCustomersUrl:string;
	getCustomerPricesUrl:string;
	saveCustomerUrl:string;
	saveCustomerProductPriceUrl:string;
	saveAddressUrl:string;
	deleteAddressUrl:string;
	getAllOrderByStatusUrl:string;
	getOrderDetails:string;
	saveReceivedOrder:string;

	//WaybillUrls
	getLastWaybillUrl:string;
	getWaybillUrl:string;
	saveWaybillUrl:string;
	getAllWaybillsUrl:string;
	deleteWaybillUrl:string;
	getWaybillProductsUrl:string;
	convertWaybillToBillUrl:string;
	getThisWeekWaybillsUrl:string;
	getThisMonthWaybillsUrl:string;
	filterWaybillsUrl:string;
//Bill Urls
	getLastBillUrl:string;
	getBillUrl:string;
	saveBillUrl:string;
	getAllBillsUrl:string;
	deleteBillUrl:string;
	getBillProductsUrl:string;
	getNextBillNumberUrl:string;
	checkBillNumberIsValidUrl:string;
	uploadImageUrl: string;
	getThisWeekBillsUrl:string;
	getThisMonthBillsUrl:string;
	filterBillsUrl:string;
	
	//VendorBillUrls
	getVendorBillUrl:string;
	saveVendorBillUrl:string;
	getAllVendorBillsUrl:string;
	deleteVendorBillUrl:string;
	getVendorBillProductsUrl:string;
	getThisWeekVendorBillsUrl:string;
	getThisMonthVendorBillsUrl:string;
	filterVendorBillsUrl:string;
	
	//DiscountRates
	getAllDiscountRatesUrl:string;
	//Common
	saveCityUrl:string;
	getPaymentTypesUrl:string;
	savePaymentUrl:string;
	getBillPaymentsUrl:string;
	deletePaymentUrl:string;


};
import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {


	getAppConfig(): IConfig {

	
		//let serverLoginPath = 'https://supplier.azurewebsites.net/api/', serverLoginPathDebug = 'http://localhost:4315/api/';
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
		let getPassiveProductsUrl = (debug ? serverLoginPathDebug + "Product/getPassiveProducts" : serverLoginPath + "Product/getPassiveProducts");
		let getProductsByPriceTypeUrl = (debug ? serverLoginPathDebug + "Product/getProductsByPriceType" : serverLoginPath + "Product/getProductsByPriceType");
		let getProductsWithRelationalEntities = (debug ? serverLoginPathDebug + "Product/getallproductswithrelationalentities" : serverLoginPath + "Product/getallproductswithrelationalentities");
		let saveProductsUrl = (debug ? serverLoginPathDebug + "Product/saveproduct" : serverLoginPath + "Product/saveproduct");
		let getGroupPricesUrl=(debug ? serverLoginPathDebug + "Product/getGroupPrices" : serverLoginPath + "Product/getGroupPrices");
		let getAllGroupsPricesUrl=(debug ? serverLoginPathDebug + "Product/getAllGroupsPrices" : serverLoginPath + "Product/getAllGroupsPrices");
		let saveProductGroupPricesUrl=(debug ? serverLoginPathDebug + "Product/saveProductGroupPrices" : serverLoginPath + "Product/saveProductGroupPrices");
		
		let getCategoriesUrl = (debug ? serverLoginPathDebug + "Common/getallcategories" : serverLoginPath + "Common/getallcategories");
		let getAllUnitsUrl = (debug ? serverLoginPathDebug + "Common/getallunits" : serverLoginPath + "Common/getallunits");
		let getAllBrandsUrl = (debug ? serverLoginPathDebug + "Common/getallbrands" : serverLoginPath + "Common/getallbrands");
		let getAllCitiesUrl = (debug ? serverLoginPathDebug + "Common/getallcities" : serverLoginPath + "Common/getallcities");
		let getSuppliersUrl = (debug ? serverLoginPathDebug + "Common/getallsupplier" : serverLoginPath + "Common/getallsupplier");
		let getCustomersUrl = (debug ? serverLoginPathDebug + "Customer/getallcustomers" : serverLoginPath + "Customer/getallcustomers");
		let getCustomerPricesUrl = (debug ? serverLoginPathDebug + "Customer/getcustomerprices" : serverLoginPath + "Customer/getcustomerprices");
		let saveCustomerUrl = (debug ? serverLoginPathDebug + "Customer/savecustomer" : serverLoginPath + "Customer/savecustomer");
		let saveCustomerProductPriceUrl = (debug ? serverLoginPathDebug + "Customer/savecustomerproductprice" : serverLoginPath + "Customer/savecustomerproductprice");
		let saveAddressUrl = (debug ? serverLoginPathDebug + "Customer/saveAddress" : serverLoginPath + "Customer/saveAddress");
		let deleteAddressUrl = (debug ? serverLoginPathDebug + "Customer/deleteAddress" : serverLoginPath + "Customer/deleteAddress");
		let getAllOrderByStatusUrl = (debug ? serverLoginPathDebug + "order/getReceivedOrderProductsByStatus" : serverLoginPath + "order/getReceivedOrderProductsByStatus");
		let getOrderDetails = (debug ? serverLoginPathDebug + "order/getReceivedOrderProducts" : serverLoginPath + "order/getReceivedOrderProducts");
		let saveReceivedOrder = (debug ? serverLoginPathDebug + "order/updatereceivedorder" : serverLoginPath + "order/updatereceivedorder");

		//WaybillUrls
		let getLastWaybillUrl = (debug ? serverLoginPathDebug + "waybill/getlastwaybill" : serverLoginPath + "waybill/getlastwaybill");
		let saveWaybillUrl = (debug ? serverLoginPathDebug + "waybill/save" : serverLoginPath + "waybill/save");
		let getAllWaybillsUrl = (debug ? serverLoginPathDebug + "waybill/getallwaybills" : serverLoginPath + "waybill/getallwaybills");
		let deleteWaybillUrl = (debug ? serverLoginPathDebug + "waybill/deletewaybill" : serverLoginPath + "waybill/deletewaybill");
		let getWaybillUrl = (debug ? serverLoginPathDebug + "waybill/getwaybill" : serverLoginPath + "waybill/getwaybill");
		let getWaybillProductsUrl = (debug ? serverLoginPathDebug + "waybill/getwaybillproducts" : serverLoginPath + "waybill/getwaybillproducts");
		let convertWaybillToBillUrl = (debug ? serverLoginPathDebug + "waybill/convertWaybillToBill" : serverLoginPath + "waybill/convertWaybillToBill");
		let getThisWeekWaybillsUrl = (debug ? serverLoginPathDebug + "waybill/getThisWeekWaybills" : serverLoginPath + "waybill/getThisWeekWaybills");
		let getThisMonthWaybillsUrl = (debug ? serverLoginPathDebug + "waybill/getThisMonthWaybills" : serverLoginPath + "waybill/getThisMonthWaybills");
		let filterWaybillsUrl = (debug ? serverLoginPathDebug + "waybill/filterWaybills" : serverLoginPath + "waybill/filterWaybills");
		
		
		//Bill Urls
		let getLastBillUrl = (debug ? serverLoginPathDebug + "bill/getlastbill" : serverLoginPath + "bill/getlastbill");
		let saveBillUrl = (debug ? serverLoginPathDebug + "bill/save" : serverLoginPath + "bill/save");
		let getAllBillsUrl = (debug ? serverLoginPathDebug + "bill/getallbills" : serverLoginPath + "bill/getallbills");
		let deleteBillUrl = (debug ? serverLoginPathDebug + "bill/deletebill" : serverLoginPath + "bill/deletebill");
		let getBillUrl = (debug ? serverLoginPathDebug + "bill/getbill" : serverLoginPath + "bill/getbill");
		let getBillProductsUrl=(debug ? serverLoginPathDebug + "bill/getBillproducts" : serverLoginPath + "bill/getBillproducts");
		let getNextBillNumberUrl=(debug ? serverLoginPathDebug + "bill/getNextBillNumber" : serverLoginPath + "bill/getNextBillNumber");
		let checkBillNumberIsValidUrl=(debug ? serverLoginPathDebug + "bill/checkBillNumberIsValid" : serverLoginPath + "bill/checkBillNumberIsValid");
		let getThisWeekBillsUrl = (debug ? serverLoginPathDebug + "bill/getThisWeekBills" : serverLoginPath + "bill/getThisWeekBills");
		let getThisMonthBillsUrl = (debug ? serverLoginPathDebug + "bill/getThisMonthBills" : serverLoginPath + "bill/getThisMonthBills");
		let filterBillsUrl = (debug ? serverLoginPathDebug + "bill/filterBills" : serverLoginPath + "bill/filterBills");

		//Vendors Urls
		let saveVendorBillUrl = (debug ? serverLoginPathDebug + "VendorBill/save" : serverLoginPath + "VendorBill/save");
		let getAllVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/getallbills" : serverLoginPath + "VendorBill/getallbills");
		let deleteVendorBillUrl = (debug ? serverLoginPathDebug + "VendorBill/deletebill" : serverLoginPath + "VendorBill/deletebill");
		let getVendorBillUrl = (debug ? serverLoginPathDebug + "VendorBill/getbill" : serverLoginPath + "VendorBill/getbill");
		let getVendorBillProductsUrl=(debug ? serverLoginPathDebug + "VendorBill/getBillproducts" : serverLoginPath + "VendorBill/getBillproducts");
		let getThisWeekVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/getThisWeekBills" : serverLoginPath + "VendorBill/getThisWeekBills");
		let getThisMonthVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/getThisMonthBills" : serverLoginPath + "VendorBill/getThisMonthBills");
		let filterVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/filterBills" : serverLoginPath + "VendorBill/filterBills");

		
		let uploadImageUrl = (debug ? serverLoginPathDebug + "Uploader/Upload" : serverLoginPath + "Uploader/Upload");
		//Common
		let getAllDiscountRatesUrl = (debug ? serverLoginPathDebug + "Common/getAllDiscountRates" : serverLoginPath + "Common/getAllDiscountRates");
		let saveCityUrl = (debug ? serverLoginPathDebug + "Common/saveCity" : serverLoginPath + "Common/saveCity");
		let getPaymentTypesUrl = (debug ? serverLoginPathDebug + "Common/getPaymentTypes" : serverLoginPath + "Common/getPaymentTypes");
		let savePaymentUrl = (debug ? serverLoginPathDebug + "Bill/savePayment" : serverLoginPath + "Bill/savePayment");
		let getBillPaymentsUrl = (debug ? serverLoginPathDebug + "Bill/getBillPayments" : serverLoginPath + "Bill/getBillPayments");
		let deletePaymentUrl = (debug ? serverLoginPathDebug + "Bill/deletePayment" : serverLoginPath + "Bill/deletePayment");

		return {
			logInUrl: logInUrl,
			saveCityUrl:saveCityUrl,
			getUsers: getUsers,
			calculate: calculate,
			getProductsUrl: getProductsUrl,
			getPassiveProductsUrl:getPassiveProductsUrl,
			getProductsByPriceTypeUrl:getProductsByPriceTypeUrl,
			getGroupPricesUrl:getGroupPricesUrl,
			getAllGroupsPricesUrl:getAllGroupsPricesUrl,
			getCategoriesUrl: getCategoriesUrl,
			getProductsWithRelationalEntitiesUrl:getProductsWithRelationalEntities,
			getAllUnitsUrl: getAllUnitsUrl,
			getAllBrandsUrl: getAllBrandsUrl,
			getAllCitiesUrl: getAllCitiesUrl,
			getSuppliersUrl:getSuppliersUrl,
			saveProductsUrl:saveProductsUrl,
			saveProductGroupPricesUrl:saveProductGroupPricesUrl,
			getCustomersUrl:getCustomersUrl,
			getCustomerPricesUrl:getCustomerPricesUrl,
			saveCustomerUrl:saveCustomerUrl,
			saveCustomerProductPriceUrl:saveCustomerProductPriceUrl,
			saveAddressUrl:saveAddressUrl,
			deleteAddressUrl:deleteAddressUrl,
			getAllOrderByStatusUrl:getAllOrderByStatusUrl,
			getOrderDetails:getOrderDetails,
			saveReceivedOrder:saveReceivedOrder,
			//Waybills
			getLastWaybillUrl:getLastWaybillUrl,
			saveWaybillUrl:saveWaybillUrl,
			getAllWaybillsUrl:getAllWaybillsUrl,
			deleteWaybillUrl:deleteWaybillUrl,
			getWaybillUrl:getWaybillUrl,
			getWaybillProductsUrl:getWaybillProductsUrl,
			convertWaybillToBillUrl:convertWaybillToBillUrl,
			getThisWeekWaybillsUrl:getThisWeekWaybillsUrl,
			getThisMonthWaybillsUrl:getThisMonthWaybillsUrl,
			filterWaybillsUrl:filterWaybillsUrl,
			//Bills
			getLastBillUrl:getLastBillUrl,
			saveBillUrl:saveBillUrl,
			getAllBillsUrl:getAllBillsUrl,
			deleteBillUrl:deleteBillUrl,
			getBillUrl:getBillUrl,
			getBillProductsUrl:getBillProductsUrl,
			getNextBillNumberUrl:getNextBillNumberUrl,
			checkBillNumberIsValidUrl:checkBillNumberIsValidUrl,
			getThisWeekBillsUrl:getThisWeekBillsUrl,
			getThisMonthBillsUrl:getThisMonthBillsUrl,
			uploadImageUrl:uploadImageUrl,
			savePaymentUrl:savePaymentUrl,
			filterBillsUrl:filterBillsUrl,

			//VendorBills
			saveVendorBillUrl:saveVendorBillUrl,
			getAllVendorBillsUrl:getAllVendorBillsUrl,
			deleteVendorBillUrl:deleteVendorBillUrl,
			getVendorBillUrl:getVendorBillUrl,
			getVendorBillProductsUrl:getVendorBillProductsUrl,
			getThisWeekVendorBillsUrl:getThisWeekVendorBillsUrl,
			getThisMonthVendorBillsUrl:getThisMonthVendorBillsUrl,
			filterVendorBillsUrl:filterVendorBillsUrl,
			//Common
			getAllDiscountRatesUrl:getAllDiscountRatesUrl,
			getPaymentTypesUrl:getPaymentTypesUrl,
			getBillPaymentsUrl:getBillPaymentsUrl,
			deletePaymentUrl:deletePaymentUrl

		}
	}
};