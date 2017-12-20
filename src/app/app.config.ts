export interface IConfig {
	logInUrl: string;
	getUsers: string;
	calculate:string;
	

	};
import { Injectable }    from '@angular/core';
@Injectable()
export class ConfigService  {
	
	 
  getAppConfig(): IConfig { 
	
	let serverLoginPath = 'http://calculatorservices.azurewebsites.net/api/',serverLoginPathDebug='http://localhost:4068/api/';

	let serverUserNotificationPath ='';
	let debug = true;
	
	let getUsers=(debug ? serverLoginPathDebug + "authentication/login" : serverLoginPath + "userCont/getusers");
  let logInUrl = (debug ? serverLoginPathDebug + "userCont/login" : serverLoginPath + "authentication/login");
	let getLogOutURl = (debug ? serverLoginPathDebug + "authentication/logout" : serverLoginPath + "authentication/logout");
	let calculate= (debug ? serverLoginPathDebug + "Operation" : serverLoginPath + "Operation");

  return {
			logInUrl: logInUrl,
			getUsers:getUsers,
			calculate:calculate

	}
  }
};