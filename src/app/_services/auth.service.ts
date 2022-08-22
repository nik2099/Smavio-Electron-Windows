/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, HttpResponse } from '@capacitor-community/http';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { TokenStorageService } from '../_services/token-storage.service';
import { Plugins } from '@capacitor/core';
// const { Geolocation } = Plugins;
// import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
// import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
// import { AppVersion } from '@ionic-native/app-version/ngx';

const AUTH_API = 'https://staging.appmate.in/Smavio-laravel-admin-dashboard/api/';
const http = Http;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  deviceInfo:any;
  uuId:any;
  coords: any;
  address: any;
  token: any;
  app_version:any;

  constructor(public platforms: Platform,private tokenStorage: TokenStorageService) {
      this.logDeviceInfo();
      // this.checkGPSPermission();

      // this.appVersion.getVersionCode().then(value => {
      //   this.app_version = value;
      // }).catch(err => {
      //   alert(err);
      // });
   }


  //  checkGPSPermission() {
	// 	this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
	// 	  result => {
  
	// 		if (result.hasPermission) {
	
	// 		  //If having permission show 'Turn On GPS' dialogue
	// 		  this.askToTurnOnGPS();
	// 		} else {
	
	// 		  //If not having permission ask for permission
	// 		  this.requestGPSPermission();
	// 		}
	// 	  },
	// 	  err => {
			
	// 		//alert(err);
	// 	  }
	// 	);
	//   }
  
  
	  // requestGPSPermission() {
		// this.locationAccuracy.canRequest().then((canRequest: boolean) => {
		//   if (canRequest) {
		// 	//console.log("4");
		//   } else {
		// 	//Show 'GPS Permission Request' dialogue
		// 	this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
		// 	  .then(
		// 		() => {
		// 		  // call method to turn on GPS
		// 		  this.askToTurnOnGPS();
		// 		},
				
		// 		error => {
		// 		  this.askToTurnOnGPS();
		// 		  //Show alert if user click on 'No Thanks'
		// 		  //alert('requestPermission Error requesting location permissions ' + error)
		// 		}
		// 	  );
		//   }
		// });
	  // }
  
	  // askToTurnOnGPS() {
		// this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
		//   () => {
		// 	// When GPS Turned ON call method to get Accurate location coordinates
		// 	this.getLocationCoordinates()
		//   },
		  
		//   error => {
		// 	this.askToTurnOnGPS();
		//   }
		  
		//   //alert('Error requesting location permissions ' + JSON.stringify(error))
		// );
	  // }

  

  //  async getLocationCoordinates() {
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   console.log('Current', coordinates);
  //   this.coords = coordinates.coords;
  //   this.reverseGeocode();
  // }

  // async reverseGeocode() {
  //   if (!this.coords) {
  //     const coordinates = await Geolocation.getCurrentPosition();
  //     this.coords = coordinates.coords;
  //   }
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 1
  //   };
  //   this.nativeGeocoder.reverseGeocode(this.coords.latitude, this.coords.longitude, options)
  //     .then((result: NativeGeocoderResult[]) => {
  //       this.address = result[0];
  //     })
  //     .catch((error: any) => console.log(error));
  // }



   logDeviceInfo = async () => {
    this.deviceInfo = await Device.getInfo();
    this.uuId = await Device.getId();
  
  
  };


  async login(username: string, password: string): Promise<any> {
  
    const options = {
      method: 'POST',
      url: AUTH_API + 'login',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: { 'email': username, 'password': password, 'device_detail': this.deviceInfo , 'appversion': 1,'deviceId':this.uuId.uuid,'device_type':'app'},
    };
    const response = http.request(options);

    return response;
  }

  async getAssignCompaign(): Promise<any> {
    await this.tokenStorage.getToken().then(
      token => {
        if(token!=null){
          this.token = token
        }
      }
    );
 const data = {'device_uuid':this.uuId.uuid,'device_type':'app'};

    const options = {
      method: 'POST',
      url: AUTH_API + 'user/getCampaign',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','Authorization': 'Bearer '+this.token },
      data: data
    };
    const response = http.request(options);
    // console.log(response);
    return response;
  }



  /*validateToken(token: string):  Promise<any> {
    const options = {
      method: 'POST',
      url: AUTH_API + 'jwt-auth/v1/token/validate',
      headers: { 'Content-Type': 'application/json' },
      Authorization: 'Bearer ' + token
    };
    const response = http.request(options);
    return response;
  }*/

  resetPassword(email: string): Promise<any> {
    const options = {
      method: 'POST',
      url: AUTH_API + 'forget-password',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: { 'email': email }
    };
    const response = http.request(options);
    return response;
  }

  async logout(token: string): Promise<any> {
    const options = {
      method: 'GET',
      url: AUTH_API + 'logout',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer '+token },
    };
    const response = http.request(options);

    return response;
  }

  testHost(): Promise<any> {
    const options = {
      method: 'GET',
      url: AUTH_API,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    };
    const response = http.request(options);
    // console.log(response);
    return response;
  }


  async checkUser(): Promise<any> {
    await this.tokenStorage.getToken().then(
      token => {
        if(token!=null){
          this.token = token
        }
      }
    );

    const options = {
      method: 'GET',
      url: AUTH_API+ 'user',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.token}
    };
    const response = http.request(options);
    // console.log(response);
    return response;
  }


  async campainUpdate(): Promise<any> {
    await this.tokenStorage.getToken().then(
      token => {
        if(token!=null){
          this.token = token
        }
      }
    );
    const data = {'device_uuid':this.uuId.uuid,'device_type':'app'};
    const options = {
      method: 'POST',
      url: AUTH_API+ 'user/updateCampaign',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer '+this.token},
      data: data
    };
    const response = http.request(options);
    // console.log(response);
    return response;
  }



}
