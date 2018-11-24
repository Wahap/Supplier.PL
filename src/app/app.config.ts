export interface IConfig {
	logInUrl: string;
	getUsers: string;
	calculate: string;

	getProductsUrl: string;
	getTopProductsUrl: string;
	getTopProductsByYearUrl: string;
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
	//CustomersUrls
	getCustomersUrl:string;
	getPassiveCustomersUrl:string;
	getCustomerPricesUrl:string;
	saveCustomerUrl:string;
	saveCustomerProductPriceUrl:string;
	saveAddressUrl:string;
	deleteAddressUrl:string;
	getTopCustomersUrl:string;
	getTopCustomersByYearUrl:string;

	getAllOrderByStatusUrl:string;
	getOrderDetails:string;
	//ReceivedOrders
	saveReceivedOrderUrl:string;
	getAllReceivedOrdersUrl:string;
	getReceivedOrderProductsUrl:string;
	deleteReceivedOrderUrl:string;
	convertOrderToWaybillUrl:string;
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
	getUnpaidBillsUrl:string;
	getOverDueBillsUrl:string;
	getYearlyBillReportUrl:string;
	getMonthlyBillReportUrl:string;
	//ReturnBills
	getNextReturnBillNumberUrl:string;
	saveReturnBillUrl:string;
	deleteReturnBillUrl:string;
	getAllReturnBillsUrl:string;
	getThisWeekReturnBillsUrl:string;
	getThisMonthReturnBillsUrl:string;
	filterReturnBillsUrl:string;
	getReturnBillProductsUrl:string;
	//VendorBillUrls
	getVendorBillUrl:string;
	saveVendorBillUrl:string;
	getAllVendorBillsUrl:string;
	deleteVendorBillUrl:string;
	getVendorBillProductsUrl:string;
	getThisWeekVendorBillsUrl:string;
	getThisMonthVendorBillsUrl:string;
	filterVendorBillsUrl:string;
	//StockUrls
	saveWareHouseUrl:string;
	getWareHousesUrl:string;
	getWareHouseUrl:string;
	saveWareHouseProductsUrl:string;
	//DiscountRates
	getAllDiscountRatesUrl:string;
	//Common
	saveCityUrl:string;
	saveBrandUrl:string;
	saveUnitUrl:string;
	saveSupplierUrl:string;
	saveCategoryUrl:string;
	getPaymentTypesUrl:string;
	savePaymentUrl:string;
	getBillPaymentsUrl:string;      
	getReturnBillPaymentsUrl:string;
	getVendorBillPaymentsUrl:string;
	deletePaymentUrl:string;
	createLogUrl:string;
	getIpAddressUrl:string;
	getDashBoardDataUrl:string;


};
import { Injectable } from '@angular/core';
import { TOOLTIP_PANEL_CLASS } from '@angular/material';
@Injectable()
export class ConfigService {




	getAppConfig(): IConfig {

	
		let serverLoginPath = 'https://supplier.azurewebsites.net/api/', serverLoginPathDebug = 'http://localhost:4315/api/';
		//let serverLoginPath = 'https://devsupplier.azurewebsites.net/api/', serverLoginPathDebug = 'http://localhost:4315/api/';
	
 
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
		let getTopProductsUrl= (debug ? serverLoginPathDebug + "Product/getTopProducts" : serverLoginPath + "Product/getTopProducts");
		let getTopProductsByYearUrl= (debug ? serverLoginPathDebug + "Product/getTopProductsByYear" : serverLoginPath + "Product/getTopProductsByYear");
		
		let getCategoriesUrl = (debug ? serverLoginPathDebug + "Common/getallcategories" : serverLoginPath + "Common/getallcategories");
		let getAllUnitsUrl = (debug ? serverLoginPathDebug + "Common/getallunits" : serverLoginPath + "Common/getallunits");
		let getAllBrandsUrl = (debug ? serverLoginPathDebug + "Common/getallbrands" : serverLoginPath + "Common/getallbrands");
		let getAllCitiesUrl = (debug ? serverLoginPathDebug + "Common/getallcities" : serverLoginPath + "Common/getallcities");
		let getSuppliersUrl = (debug ? serverLoginPathDebug + "Common/getallsupplier" : serverLoginPath + "Common/getallsupplier");
		
		//Customers
		let getCustomersUrl = (debug ? serverLoginPathDebug + "Customer/getallcustomers" : serverLoginPath + "Customer/getallcustomers");
		let getPassiveCustomersUrl = (debug ? serverLoginPathDebug + "Customer/getPassivecustomers" : serverLoginPath + "Customer/getPassivecustomers");		
		let getCustomerPricesUrl = (debug ? serverLoginPathDebug + "Customer/getcustomerprices" : serverLoginPath + "Customer/getcustomerprices");
		let getTopCustomersUrl= (debug ? serverLoginPathDebug + "Customer/getTopCustomers" : serverLoginPath + "Customer/getTopCustomers");
		let getTopCustomersByYearUrl= (debug ? serverLoginPathDebug + "Customer/getTopCustomersByYear" : serverLoginPath + "Customer/getTopCustomersByYear");
		
		let saveCustomerUrl = (debug ? serverLoginPathDebug + "Customer/savecustomer" : serverLoginPath + "Customer/savecustomer");
		let saveCustomerProductPriceUrl = (debug ? serverLoginPathDebug + "Customer/savecustomerproductprice" : serverLoginPath + "Customer/savecustomerproductprice");
		let saveAddressUrl = (debug ? serverLoginPathDebug + "Customer/saveAddress" : serverLoginPath + "Customer/saveAddress");
		let deleteAddressUrl = (debug ? serverLoginPathDebug + "Customer/deleteAddress" : serverLoginPath + "Customer/deleteAddress");
		//ReceivedOrderUrls		
		let getAllOrderByStatusUrl = (debug ? serverLoginPathDebug + "order/getReceivedOrderProductsByStatus" : serverLoginPath + "order/getReceivedOrderProductsByStatus");
		let getOrderDetails = (debug ? serverLoginPathDebug + "order/getReceivedOrderProducts" : serverLoginPath + "order/getReceivedOrderProducts");
		let saveReceivedOrderUrl = (debug ? serverLoginPathDebug + "order/save" : serverLoginPath + "order/save");
		let getAllReceivedOrdersUrl = (debug ? serverLoginPathDebug + "order/getAllReceivedOrders" : serverLoginPath + "order/getAllReceivedOrders");
		let getReceivedOrderProductsUrl = (debug ? serverLoginPathDebug + "order/getReceivedOrderProducts" : serverLoginPath + "order/getReceivedOrderProducts");
		let deleteReceivedOrderUrl = (debug ? serverLoginPathDebug + "order/deleteReceivedOrder" : serverLoginPath + "order/deleteReceivedOrder");
		let convertOrderToWaybillUrl = (debug ? serverLoginPathDebug + "order/convertOrderToWaybill" : serverLoginPath + "order/convertOrderToWaybill");
		
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
		let getOverDueBillsUrl = (debug ? serverLoginPathDebug + "bill/getOverDueBills" : serverLoginPath + "bill/getOverDueBills");
		
		let getUnpaidBillsUrl = (debug ? serverLoginPathDebug + "bill/getunpaidbills" : serverLoginPath + "bill/getunpaidbills");
		let getYearlyBillReportUrl = (debug ? serverLoginPathDebug + "bill/getYearlyBillReport" : serverLoginPath + "bill/getYearlyBillReport");
		let getMonthlyBillReportUrl = (debug ? serverLoginPathDebug + "bill/getMonthlyBillReport" : serverLoginPath + "bill/getMonthlyBillReport");
		
		//Return Bill Urls
		let getNextReturnBillNumberUrl=(debug ? serverLoginPathDebug + "returnBill/getNextBillNumber" : serverLoginPath + "returnBill/getNextBillNumber");
		let saveReturnBillUrl = (debug ? serverLoginPathDebug + "returnBill/save" : serverLoginPath + "returnBill/save");
		let deleteReturnBillUrl = (debug ? serverLoginPathDebug + "returnBill/delete" : serverLoginPath + "returnBill/delete");
		let getAllReturnBillsUrl = (debug ? serverLoginPathDebug + "returnBill/getAllBills" : serverLoginPath + "returnBill/getAllBills");
		let getThisWeekReturnBillsUrl = (debug ? serverLoginPathDebug + "returnBill/getThisWeekBills" : serverLoginPath + "returnBill/getThisWeekBills");
		let getThisMonthReturnBillsUrl = (debug ? serverLoginPathDebug + "returnBill/getThisMonthBills" : serverLoginPath + "returnBill/getThisMonthBills");
		let filterReturnBillsUrl = (debug ? serverLoginPathDebug + "returnBill/filterBills" : serverLoginPath + "returnBill/filterBills");
		let getReturnBillProductsUrl = (debug ? serverLoginPathDebug + "returnBill/getBillproducts" : serverLoginPath + "returnBill/getBillproducts");
		  
		//Vendors Urls
		let saveVendorBillUrl = (debug ? serverLoginPathDebug + "VendorBill/save" : serverLoginPath + "VendorBill/save");
		let getAllVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/getallbills" : serverLoginPath + "VendorBill/getallbills");
		let deleteVendorBillUrl = (debug ? serverLoginPathDebug + "VendorBill/deletebill" : serverLoginPath + "VendorBill/deletebill");
		let getVendorBillUrl = (debug ? serverLoginPathDebug + "VendorBill/getbill" : serverLoginPath + "VendorBill/getbill");
		let getVendorBillProductsUrl=(debug ? serverLoginPathDebug + "VendorBill/getBillproducts" : serverLoginPath + "VendorBill/getBillproducts");
		let getThisWeekVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/getThisWeekBills" : serverLoginPath + "VendorBill/getThisWeekBills");
		let getThisMonthVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/getThisMonthBills" : serverLoginPath + "VendorBill/getThisMonthBills");
		let filterVendorBillsUrl = (debug ? serverLoginPathDebug + "VendorBill/filterBills" : serverLoginPath + "VendorBill/filterBills");
		//Stock Urls
		let saveWareHouseUrl = (debug ? serverLoginPathDebug + "Stock/saveWareHouse" : serverLoginPath + "Stock/saveWareHouse");
		let getWareHousesUrl = (debug ? serverLoginPathDebug + "Stock/getWareHouses" : serverLoginPath + "Stock/getWareHouses");
		let getWareHouseUrl = (debug ? serverLoginPathDebug + "Stock/getWareHouse" : serverLoginPath + "Stock/getWareHouse");
		let saveWareHouseProductsUrl = (debug ? serverLoginPathDebug + "Stock/saveWareHouseProducts" : serverLoginPath + "Stock/saveWareHouseProducts");
		
		let uploadImageUrl = (debug ? serverLoginPathDebug + "Uploader/Upload" : serverLoginPath + "Uploader/Upload");
		//Common
		let getAllDiscountRatesUrl = (debug ? serverLoginPathDebug + "Common/getAllDiscountRates" : serverLoginPath + "Common/getAllDiscountRates");
		let saveCityUrl = (debug ? serverLoginPathDebug + "Common/saveCity" : serverLoginPath + "Common/saveCity");
		let saveBrandUrl = (debug ? serverLoginPathDebug + "Common/saveBrand" : serverLoginPath + "Common/saveBrand");
		let saveUnitUrl = (debug ? serverLoginPathDebug + "Common/saveUnit" : serverLoginPath + "Common/saveUnit");
		let saveCategoryUrl = (debug ? serverLoginPathDebug + "Common/saveCategory" : serverLoginPath + "Common/saveCategory");
		let saveSupplierUrl = (debug ? serverLoginPathDebug + "Common/saveSupplier" : serverLoginPath + "Common/saveSupplier");
		let getPaymentTypesUrl = (debug ? serverLoginPathDebug + "Common/getPaymentTypes" : serverLoginPath + "Common/getPaymentTypes");
		let savePaymentUrl = (debug ? serverLoginPathDebug + "Bill/savePayment" : serverLoginPath + "Bill/savePayment");
		let getBillPaymentsUrl = (debug ? serverLoginPathDebug + "Bill/getBillPayments" : serverLoginPath + "Bill/getBillPayments");
		let getReturnBillPaymentsUrl = (debug ? serverLoginPathDebug + "ReturnBill/getBillPayments" : serverLoginPath + "ReturnBill/getBillPayments");
		
		let getVendorBillPaymentsUrl = (debug ? serverLoginPathDebug + "VendorBill/getBillPayments" : serverLoginPath + "VendorBill/getBillPayments");
		let deletePaymentUrl = (debug ? serverLoginPathDebug + "Bill/deletePayment" : serverLoginPath + "Bill/deletePayment");
		let createLogUrl = (debug ? serverLoginPathDebug + "Common/createLog" : serverLoginPath + "Common/createLog");
		let getDashBoardDataUrl = (debug ? serverLoginPathDebug + "Common/getDashBoardData" : serverLoginPath + "Common/getDashBoardData");
		
		let getIpAddressUrl="http://api.ipify.org?format=json&callback=getIP";
		return {
			logInUrl: logInUrl,
			saveCityUrl:saveCityUrl,
			saveBrandUrl:saveBrandUrl,
			saveUnitUrl:saveUnitUrl,
			saveCategoryUrl:saveCategoryUrl,
			saveSupplierUrl:saveSupplierUrl,
			getUsers: getUsers,
			calculate: calculate,
			getProductsUrl: getProductsUrl,
			getTopProductsUrl:getTopProductsUrl,
			getTopProductsByYearUrl:getTopProductsByYearUrl,
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
			//Customers
			getCustomersUrl:getCustomersUrl,
			getPassiveCustomersUrl:getPassiveCustomersUrl,
			getCustomerPricesUrl:getCustomerPricesUrl,
			saveCustomerUrl:saveCustomerUrl,
			saveCustomerProductPriceUrl:saveCustomerProductPriceUrl,
			saveAddressUrl:saveAddressUrl,
			deleteAddressUrl:deleteAddressUrl,
			getTopCustomersUrl:getTopCustomersUrl,
			getTopCustomersByYearUrl:getTopCustomersByYearUrl,
			//ReceivedOrders
			getAllOrderByStatusUrl:getAllOrderByStatusUrl,
			getOrderDetails:getOrderDetails,
			saveReceivedOrderUrl:saveReceivedOrderUrl,
			getAllReceivedOrdersUrl:getAllReceivedOrdersUrl,
			getReceivedOrderProductsUrl:getReceivedOrderProductsUrl,
			deleteReceivedOrderUrl:deleteReceivedOrderUrl,
			convertOrderToWaybillUrl:convertOrderToWaybillUrl,
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
			getUnpaidBillsUrl:getUnpaidBillsUrl,
			getOverDueBillsUrl:getOverDueBillsUrl,
			getYearlyBillReportUrl:getYearlyBillReportUrl,
			getMonthlyBillReportUrl:getMonthlyBillReportUrl,
			//ReturnBill Urls
			getNextReturnBillNumberUrl:getNextReturnBillNumberUrl,
			saveReturnBillUrl:saveReturnBillUrl,
			deleteReturnBillUrl:deleteReturnBillUrl,
			getAllReturnBillsUrl:getAllReturnBillsUrl,
			getThisWeekReturnBillsUrl:getThisWeekReturnBillsUrl,
			getThisMonthReturnBillsUrl:getThisMonthReturnBillsUrl,
			filterReturnBillsUrl:filterReturnBillsUrl,
			getReturnBillProductsUrl:getReturnBillProductsUrl,
			//VendorBills
			saveVendorBillUrl:saveVendorBillUrl,
			getAllVendorBillsUrl:getAllVendorBillsUrl,
			deleteVendorBillUrl:deleteVendorBillUrl,
			getVendorBillUrl:getVendorBillUrl,
			getVendorBillProductsUrl:getVendorBillProductsUrl,
			getThisWeekVendorBillsUrl:getThisWeekVendorBillsUrl,
			getThisMonthVendorBillsUrl:getThisMonthVendorBillsUrl,
			filterVendorBillsUrl:filterVendorBillsUrl,
			getVendorBillPaymentsUrl:getVendorBillPaymentsUrl,

			//Stock
			saveWareHouseUrl:saveWareHouseUrl,
			getWareHousesUrl:getWareHousesUrl,
			getWareHouseUrl:getWareHouseUrl,
			saveWareHouseProductsUrl:saveWareHouseProductsUrl,

			//Common
			getAllDiscountRatesUrl:getAllDiscountRatesUrl,
			getPaymentTypesUrl:getPaymentTypesUrl,
			getBillPaymentsUrl:getBillPaymentsUrl,
			getReturnBillPaymentsUrl:getReturnBillPaymentsUrl,
			deletePaymentUrl:deletePaymentUrl,
			createLogUrl:createLogUrl,
			getIpAddressUrl:getIpAddressUrl,
			getDashBoardDataUrl:getDashBoardDataUrl
			
			

		}
	}
};