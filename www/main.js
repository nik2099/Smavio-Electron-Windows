(self["webpackChunksmavio"] = self["webpackChunksmavio"] || []).push([["main"],{

/***/ 8255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 8255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 8368:
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _capacitor_community_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor-community/http */ 3975);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _capacitor_device__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/device */ 2810);
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/token-storage.service */ 3590);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 8384);
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ 3046);
/* harmony import */ var _awesome_cordova_plugins_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @awesome-cordova-plugins/android-permissions/ngx */ 3601);
/* harmony import */ var _awesome_cordova_plugins_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @awesome-cordova-plugins/location-accuracy/ngx */ 7190);
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ 7354);

/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */






const { Geolocation } = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Plugins;




const AUTH_API = 'https://staging.appmate.in/Smavio-laravel-admin-dashboard/api/';
const http = _capacitor_community_http__WEBPACK_IMPORTED_MODULE_0__.Http;
let AuthService = class AuthService {
    constructor(androidPermissions, locationAccuracy, nativeGeocoder, platforms, tokenStorage, appVersion) {
        this.androidPermissions = androidPermissions;
        this.locationAccuracy = locationAccuracy;
        this.nativeGeocoder = nativeGeocoder;
        this.platforms = platforms;
        this.tokenStorage = tokenStorage;
        this.appVersion = appVersion;
        this.logDeviceInfo = () => (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.deviceInfo = yield _capacitor_device__WEBPACK_IMPORTED_MODULE_1__.Device.getInfo();
            this.uuId = yield _capacitor_device__WEBPACK_IMPORTED_MODULE_1__.Device.getId();
        });
        this.logDeviceInfo();
        this.checkGPSPermission();
        this.appVersion.getVersionCode().then(value => {
            this.app_version = value;
        }).catch(err => {
            alert(err);
        });
    }
    checkGPSPermission() {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(result => {
            if (result.hasPermission) {
                //If having permission show 'Turn On GPS' dialogue
                this.askToTurnOnGPS();
            }
            else {
                //If not having permission ask for permission
                this.requestGPSPermission();
            }
        }, err => {
            //alert(err);
        });
    }
    requestGPSPermission() {
        this.locationAccuracy.canRequest().then((canRequest) => {
            if (canRequest) {
                //console.log("4");
            }
            else {
                //Show 'GPS Permission Request' dialogue
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
                    .then(() => {
                    // call method to turn on GPS
                    this.askToTurnOnGPS();
                }, error => {
                    this.askToTurnOnGPS();
                    //Show alert if user click on 'No Thanks'
                    //alert('requestPermission Error requesting location permissions ' + error)
                });
            }
        });
    }
    askToTurnOnGPS() {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            // When GPS Turned ON call method to get Accurate location coordinates
            this.getLocationCoordinates();
        }, error => {
            this.askToTurnOnGPS();
        }
        //alert('Error requesting location permissions ' + JSON.stringify(error))
        );
    }
    getLocationCoordinates() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const coordinates = yield Geolocation.getCurrentPosition();
            console.log('Current', coordinates);
            this.coords = coordinates.coords;
            this.reverseGeocode();
        });
    }
    reverseGeocode() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.coords) {
                const coordinates = yield Geolocation.getCurrentPosition();
                this.coords = coordinates.coords;
            }
            let options = {
                useLocale: true,
                maxResults: 1
            };
            this.nativeGeocoder.reverseGeocode(this.coords.latitude, this.coords.longitude, options)
                .then((result) => {
                this.address = result[0];
            })
                .catch((error) => console.log(error));
        });
    }
    login(username, password) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const options = {
                method: 'POST',
                url: AUTH_API + 'login',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                data: { 'email': username, 'password': password, 'device_detail': this.deviceInfo, 'appversion': this.app_version, 'deviceId': this.uuId.uuid, 'device_type': 'app', 'locality': this.address.locality, 'subAdministrativeArea': this.address.subAdministrativeArea },
            };
            const response = http.request(options);
            return response;
        });
    }
    getAssignCompaign() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.tokenStorage.getToken().then(token => {
                if (token != null) {
                    this.token = token;
                }
            });
            const data = { 'device_uuid': this.uuId.uuid, 'device_type': 'app' };
            const options = {
                method: 'POST',
                url: AUTH_API + 'user/getCampaign',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token },
                data: data
            };
            const response = http.request(options);
            // console.log(response);
            return response;
        });
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
    resetPassword(email) {
        const options = {
            method: 'POST',
            url: AUTH_API + 'forget-password',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            data: { 'email': email }
        };
        const response = http.request(options);
        return response;
    }
    logout(token) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                url: AUTH_API + 'logout',
                headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
            };
            const response = http.request(options);
            return response;
        });
    }
    testHost() {
        const options = {
            method: 'GET',
            url: AUTH_API,
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        };
        const response = http.request(options);
        // console.log(response);
        return response;
    }
    checkUser() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.tokenStorage.getToken().then(token => {
                if (token != null) {
                    this.token = token;
                }
            });
            const options = {
                method: 'GET',
                url: AUTH_API + 'user',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token }
            };
            const response = http.request(options);
            // console.log(response);
            return response;
        });
    }
    campainUpdate() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.tokenStorage.getToken().then(token => {
                if (token != null) {
                    this.token = token;
                }
            });
            const data = { 'device_uuid': this.uuId.uuid, 'device_type': 'app' };
            const options = {
                method: 'POST',
                url: AUTH_API + 'user/updateCampaign',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token },
                data: data
            };
            const response = http.request(options);
            // console.log(response);
            return response;
        });
    }
};
AuthService.ctorParameters = () => [
    { type: _awesome_cordova_plugins_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_5__.AndroidPermissions },
    { type: _awesome_cordova_plugins_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_6__.LocationAccuracy },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_4__.NativeGeocoder },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.Platform },
    { type: _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__.TokenStorageService },
    { type: _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_7__.AppVersion }
];
AuthService = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injectable)({
        providedIn: 'root'
    })
], AuthService);



/***/ }),

/***/ 3196:
/*!***************************************************!*\
  !*** ./src/app/_services/notification.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationService": () => (/* binding */ NotificationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 8384);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ 8368);
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/token-storage.service */ 3590);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 9895);








const { App } = _capacitor_core__WEBPACK_IMPORTED_MODULE_0__.Plugins;
let NotificationService = class NotificationService {
    constructor(alertController, authService, tokenStorage, sanitizer, router) {
        this.alertController = alertController;
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.sanitizer = sanitizer;
        this.router = router;
    }
    connectionAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert connection-alert',
                header: 'Fehler',
                backdropDismiss: false,
                message: 'Es besteht keine Verbindung zum Internet. Bitte prüfen Sie die Einstellungen am Gerät oder starten Sie den Router neu!',
                buttons: [
                    {
                        text: 'smavio beenden',
                        cssClass: 'custom-ion-dark-btn',
                        handler: () => {
                            App.exitApp();
                        }
                    },
                    {
                        text: 'Fenster schließen',
                        cssClass: 'custom-ion-link-btn'
                    }
                ]
            });
            yield alert.present();
        });
    }
    hostAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Fehler',
                backdropDismiss: false,
                message: 'Es kann keine Verbindung zur Service Plattform hergestellt werden. Bitte versuchen Sie es nochmal!',
                buttons: [
                    {
                        text: 'Nochmal versuchen',
                        cssClass: 'custom-ion-dark-btn',
                        handler: () => {
                            resolveFunction(true);
                        }
                    },
                    {
                        text: 'Fenster schließen',
                        cssClass: 'custom-ion-link-btn',
                        handler: () => {
                            resolveFunction(false);
                        }
                    }
                ]
            });
            yield alert.present();
            return promise;
        });
    }
    loginResponseAlert(msg) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Fehler',
                backdropDismiss: false,
                message: msg,
                buttons: [
                    {
                        text: 'Fenster schließen',
                        cssClass: 'custom-ion-link-btn',
                        handler: () => {
                            resolveFunction(false);
                        }
                    }
                ]
            });
            yield alert.present();
            return promise;
        });
    }
    membershipExpiredAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Fehler',
                backdropDismiss: false,
                message: "Das aktuelle Abo bietet keine Möglichkeit, ein weiteres Gerät hinzuzufügen. Bitte kontaktieren Sie den Administrator!",
                inputs: [
                    {
                        name: 'email_address',
                        type: 'text',
                        placeholder: 'Ihre E-Mail-Adresse'
                    }
                ],
                buttons: [
                    {
                        text: 'Kontaktieren',
                        cssClass: 'custom-ion-dark-btn',
                        handler: () => {
                            resolveFunction(true);
                        }
                    },
                    {
                        text: 'Fenster schließen',
                        cssClass: 'custom-ion-link-btn',
                        handler: () => {
                            this.compaignUpdateAlert();
                        }
                    }
                ]
            });
            yield alert.present();
            return promise;
        });
    }
    checkCampaignUpdate() {
        this.authService.getAssignCompaign().then(response => {
            console.log(response);
            if (response.status == 200) {
                if (response.data.success == true) {
                    if (response.data.update_available != true) {
                        this.compaignUpdatesNotAvailableAlert();
                    }
                    else {
                        this.compaignUpdateAlert();
                    }
                }
                else {
                }
            }
            else {
                if (response.status == 401) {
                    this.tokenStorage.signOut().then(() => {
                        console.log('logout');
                        this.router.navigate(['/login']);
                    });
                }
            }
        }, error => {
        });
    }
    compaignUpdateAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Update verfügbar',
                backdropDismiss: false,
                message: "Es gibt ein neues Kampagnenupdate. Bitte schalten Sie das Gerät während des Downloads und der Installation nicht aus!",
                buttons: [
                    {
                        text: 'jetzt downloaden',
                        cssClass: 'custom-ion-dark-btn',
                        handler: () => {
                            resolveFunction(true);
                            this.compaignDownloadingAlert();
                        }
                    },
                    {
                        text: 'Fenster schließen',
                        cssClass: 'custom-ion-link-btn',
                        handler: () => {
                            resolveFunction(false);
                        }
                    }
                ]
            });
            yield alert.present();
            return promise;
        });
    }
    compaignDownloadingAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Update wird heruntergeladen',
                backdropDismiss: false,
                message: '<div id="compaign-downloading-progress"><div id="progress">0%</div><ion-progress-bar></ion-progress-bar></div>',
            });
            yield alert.present();
            const progressBar = document.querySelector("#compaign-downloading-progress ion-progress-bar");
            const progress = document.querySelector("#compaign-downloading-progress #progress");
            progress.setAttribute('style', 'z-index: 1;position: absolute;left: 45%;top: 60%;color: #a9a9a9;');
            let i = 0;
            let intervalId = setInterval(() => {
                if (i != 100) {
                    i += 10;
                    progressBar.setAttribute('value', (i / 100) + "");
                    progress.innerHTML = i + "%";
                }
                else {
                    clearInterval(intervalId);
                    alert.dismiss();
                    this.compaignUpdatingAlert();
                }
            }, 500);
            return promise;
        });
    }
    compaignUpdatingAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Update wird installiert',
                backdropDismiss: false,
                message: '<div id="compaign-downloading-progress"><div id="progress">0%</div><ion-progress-bar></ion-progress-bar></div>',
            });
            yield alert.present();
            const progressBar = document.querySelector("#compaign-downloading-progress ion-progress-bar");
            const progress = document.querySelector("#compaign-downloading-progress #progress");
            progress.setAttribute('style', 'z-index: 1;position: absolute;left: 43%;top: 52%;color: #a9a9a9;');
            let i = 0;
            let intervalId = setInterval(() => {
                if (i != 100) {
                    i += 10;
                    progressBar.setAttribute('value', (i / 100) + "");
                    progress.innerHTML = i + "%";
                }
                else {
                    clearInterval(intervalId);
                    alert.dismiss();
                    this.getCampaginUpdate();
                    // this.compaignUpdatesNotAvailableAlert();
                }
            }, 500);
            return promise;
        });
    }
    compaignUpdatesNotAvailableAlert() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert',
                header: 'Keine Updates',
                backdropDismiss: false,
                message: 'Ihre Kampagne ist auf dem aktuellen Stand.',
                buttons: [
                    {
                        text: 'Fenster schließen',
                        cssClass: 'custom-ion-link-btn',
                        handler: () => {
                            alert.dismiss();
                            resolveFunction(false);
                        }
                    }
                ]
            });
            yield alert.present();
            return promise;
        });
    }
    getCampaginUpdate() {
        this.authService.campainUpdate().then(response => {
            if (response.status == 200) {
                this.tokenStorage.saveCampaignId(response.data.campaign_id).then(() => {
                    this.campaignId = response.data.campaign_id;
                });
                window.location.reload();
            }
            else {
            }
        }, error => {
        });
    }
};
NotificationService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.AlertController },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService },
    { type: _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__.TokenStorageService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router }
];
NotificationService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)({
        providedIn: 'root'
    })
], NotificationService);



/***/ }),

/***/ 3590:
/*!****************************************************!*\
  !*** ./src/app/_services/token-storage.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenStorageService": () => (/* binding */ TokenStorageService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage-angular */ 1628);

/* eslint-disable no-underscore-dangle */


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const HEADERS_KEY = 'auth-headers';
const USER_CAMPAIGN_ID = 'user-campaign-id';
let TokenStorageService = class TokenStorageService {
    constructor(storage) {
        this.storage = storage;
        this._storage = null;
        this.init();
    }
    init() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            // If using, define drivers here: await this.storage.defineDriver(/*...*/);
            const storage = yield this.storage.create();
            this._storage = storage;
        });
    }
    // Create and expose methods that users of this service can
    // call, for example:
    set(key, value) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this._storage.set(key, value);
        });
    }
    get(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return yield this._storage.get(key);
        });
    }
    remove(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this._storage.remove(key);
        });
    }
    clear() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this._storage.clear().then(() => {
                console.log('all keys cleared');
            });
        });
    }
    signOut() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this.clear();
        });
    }
    saveToken(token) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this.remove(TOKEN_KEY);
            yield this.set(TOKEN_KEY, token);
        });
    }
    getToken() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return this.get(TOKEN_KEY);
        });
    }
    saveUser(user) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this.remove(USER_KEY);
            //await this.set(USER_KEY, user);
            yield this.set(USER_KEY, JSON.stringify(user));
        });
    }
    getUser() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.get(USER_KEY);
            if (user) {
                return JSON.parse(yield user);
            }
            return null;
        });
    }
    saveCampaignId(campaignId) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this.remove(USER_CAMPAIGN_ID);
            //await this.set(USER_KEY, user);
            yield this.set(USER_CAMPAIGN_ID, campaignId);
        });
    }
    getCampaignId() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            yield this.get(USER_CAMPAIGN_ID);
        });
    }
};
TokenStorageService.ctorParameters = () => [
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_1__.Storage }
];
TokenStorageService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], TokenStorageService);



/***/ }),

/***/ 9265:
/*!************************************************!*\
  !*** ./src/app/_services/token.interceptor.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TokenInterceptor": () => (/* binding */ TokenInterceptor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _token_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token-storage.service */ 3590);



let TokenInterceptor = class TokenInterceptor {
    constructor(tokenStorage) {
        this.tokenStorage = tokenStorage;
    }
    intercept(request, next) {
        if (request.body != null && request.body.bearerToken != null) {
            this.token = request.body.bearerToken;
        }
        const url = request.url;
        const endpointsWithoutAuthorization = [
            'wp-json/wp/v2/categories',
            'jwt-auth/v1/token',
            'wp/v2/users/lost-password',
            'forget-password',
        ];
        let authorization = true;
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < endpointsWithoutAuthorization.length; i++) {
            if (url.endsWith(endpointsWithoutAuthorization[i]) === true) {
                authorization = false;
            }
        }
        //if(url.endsWith('wp-json/wp/v2/categories') === false && url.endsWith('jwt-auth/v1/token',url.length) === false){
        if (authorization) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer INTUKGJLfDAq3vOmxLrVdn1ktgZ0CMvENJGDeFLg' // + this.token
                }
            });
        }
        return next.handle(request);
    }
};
TokenInterceptor.ctorParameters = () => [
    { type: _token_storage_service__WEBPACK_IMPORTED_MODULE_0__.TokenStorageService }
];
TokenInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], TokenInterceptor);



/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 1841);




const routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./home/home.module */ 3467)).then(m => m.HomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_login_login_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./login/login.module */ 107)).then(m => m.LoginPageModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_forgot-password_forgot-password_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./forgot-password/forgot-password.module */ 7157)).then(m => m.ForgotPasswordPageModule)
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClientModule
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./app.component.html */ 1106);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss */ 3069);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _capacitor_network__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/network */ 3848);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 8384);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_services/notification.service */ 3196);
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_services/token-storage.service */ 3590);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_services/auth.service */ 8368);
/* harmony import */ var _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/screen-orientation/ngx */ 7370);
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ 7354);








const { App } = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Plugins;






// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

let AppComponent = class AppComponent {
    constructor(notificationService, authService, tokenStorage, menu, platform, alertController, _location, screenOrientation, appVersion) {
        this.notificationService = notificationService;
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.menu = menu;
        this.platform = platform;
        this.alertController = alertController;
        this._location = _location;
        this.screenOrientation = screenOrientation;
        this.appVersion = appVersion;
        this.isLoggedIn = false;
        this.menu.enable(true, 'first');
        this.appVersion.getVersionCode().then(value => {
            this.appVersions = value;
        }).catch(err => {
            alert(err);
        });
        this.platforms = this.platform.platforms();
        if (this.platforms.indexOf('android') !== -1 ||
            this.platforms.indexOf('ios') !== -1) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        }
        _capacitor_network__WEBPACK_IMPORTED_MODULE_2__.Network.addListener('networkStatusChange', status => {
            console.log('Network status changed', status);
            if (status.connected === false) {
                this.notificationService.connectionAlert();
                console.log('alert');
                this.networkConnected = false;
            }
            else {
                this.networkConnected = true;
                this.reloadPage();
            }
        });
        this.platform.backButton.subscribeWithPriority(9999, (processNextHandler) => {
            console.log('Back press handler!');
            if (this._location.isCurrentPathEqualTo('/home')) {
                console.log('Show Exit Alert!');
                this.showExitConfirm();
                processNextHandler();
            }
            else {
                this._location.back();
            }
        });
    }
    showExitConfirm() {
        this.alertController.create({
            header: 'App termination',
            message: 'Do you want to close the app?',
            backdropDismiss: true,
            buttons: [{
                    text: 'Stay',
                    role: 'cancel',
                    handler: () => {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Exit',
                    handler: () => {
                        navigator['app'].exitApp();
                    }
                }]
        })
            .then(alert => {
            alert.present();
        });
    }
    checkCompaignUpdates() {
        this.closeMenu();
        this.notificationService.checkCampaignUpdate();
    }
    checkUpdates() {
        if (this.platforms.indexOf('electron') !== -1) {
            console.log('desktop');
        }
        else if (this.platforms.indexOf('android') !== -1 || this.platforms.indexOf('ios') !== -1) {
            console.log('mobile');
        }
        else {
            console.log('browser');
        }
    }
    signOut() {
        this.tokenStorage.getToken().then(token => {
            if (token != null) {
                this.authService.logout(token).then(data => {
                    this.tokenStorage.signOut().then(() => {
                        this.reloadPage();
                    });
                });
            }
        });
        /*this.tokenStorage.getHeaders().then(
          headers => {
            if(headers!=null){
              this.authService.logout(headers).then(
                data => {
                  this.tokenStorage.signOut().then(() => {
                    this.reloadPage();
                  });
                }
              );
            }
          }
        );*/
    }
    exitApp() {
        App.exitApp();
    }
    shutDown() {
        if (this.platforms.indexOf('desktop') !== -1 && this.platforms.indexOf('electron') !== -1) {
            console.log('desktop');
        }
        else {
            console.log('mobile');
        }
    }
    reloadPage() {
        window.location.reload();
    }
    validateToken() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            /*let authToken = '';
        
            await this.tokenStorage.getToken().then(
              token => {
                if(token!=null){
                  authToken = token;
                } else {
                  authToken = '';
                  this.isLoggedIn = false;
                }
              }
            );
        
            if(authToken !== ''){
              await this.authService.validateToken(authToken).then(
                isTokenValid => {
                  this.isLoggedIn = true;
                },
                tokenError => {
                  this.isLoggedIn = false;
                }
              );
            }*/
            yield this.tokenStorage.getUser().then(data => {
                if (data != null) {
                    this.isLoggedIn = true;
                }
                else {
                    this.isLoggedIn = false;
                }
            });
            // if(this.isLoggedIn){
            //   if(this.platforms.indexOf('android') !== -1 ||
            //   this.platforms.indexOf('ios') !== -1){
            //     await this.appVersion.getVersionNumber().then( version => {
            //       document.getElementById('appVersion').innerHTML = version;
            //     });
            //   }
            // }
            return this.isLoggedIn;
        });
    }
    openMenu() {
        console.log(100);
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }
    closeMenu() {
        this.menu.close('first');
    }
    onScreenDoubleClick() {
        window.addEventListener('dblclick', (event) => {
            const targetIdNode = event.target.attributes.id;
            if (targetIdNode !== undefined) {
                const targetId = event.target.attributes.id.nodeValue;
                if (targetId === 'home-container') {
                    this.openMenu();
                }
            }
        });
    }
    testNetwork() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            yield _capacitor_network__WEBPACK_IMPORTED_MODULE_2__.Network.getStatus().then(status => {
                //console.log('Network status changed', status);
                if (status.connected === false) {
                    this.notificationService.connectionAlert();
                    this.networkConnected = false;
                }
                else {
                    this.networkConnected = true;
                }
            });
            return this.networkConnected;
        });
    }
    testHost() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            yield this.authService.testHost().then(data => {
                this.isHostUp = true;
            }, error => {
                this.isHostUp = false;
                this.notificationService.hostAlert().then(recheckHost => {
                    if (recheckHost) {
                        window.location.reload();
                    }
                });
            });
            return this.isHostUp;
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _services_notification_service__WEBPACK_IMPORTED_MODULE_4__.NotificationService },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService },
    { type: _services_token_storage_service__WEBPACK_IMPORTED_MODULE_5__.TokenStorageService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.MenuController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.Platform },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.AlertController },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__.Location },
    { type: _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_7__.ScreenOrientation },
    { type: _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_8__.AppVersion }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AppComponent);



/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ 1628);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/storage-angular */ 4925);
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_services/token-storage.service */ 3590);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_services/notification.service */ 3196);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common/http */ 1841);
/* harmony import */ var _services_token_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_services/token.interceptor */ 9265);
/* harmony import */ var _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/screen-orientation/ngx */ 7370);
/* harmony import */ var _awesome_cordova_plugins_device_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @awesome-cordova-plugins/device/ngx */ 1874);
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ 7354);
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ 3046);
/* harmony import */ var _awesome_cordova_plugins_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @awesome-cordova-plugins/android-permissions/ngx */ 3601);
/* harmony import */ var _awesome_cordova_plugins_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @awesome-cordova-plugins/location-accuracy/ngx */ 7190);



















let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonicModule.forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule, _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_16__.IonicStorageModule.forRoot({
                name: '__smaviodb',
                driverOrder: [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__.Drivers.IndexedDB, _ionic_storage__WEBPACK_IMPORTED_MODULE_2__.Drivers.LocalStorage]
            })],
        providers: [
            { provide: _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonicRouteStrategy }, _services_token_storage_service__WEBPACK_IMPORTED_MODULE_3__.TokenStorageService, _services_notification_service__WEBPACK_IMPORTED_MODULE_4__.NotificationService,
            {
                provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_18__.HTTP_INTERCEPTORS,
                useClass: _services_token_interceptor__WEBPACK_IMPORTED_MODULE_5__.TokenInterceptor,
                multi: true
            },
            _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_6__.ScreenOrientation,
            _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_8__.AppVersion,
            _awesome_cordova_plugins_android_permissions_ngx__WEBPACK_IMPORTED_MODULE_10__.AndroidPermissions,
            _awesome_cordova_plugins_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_11__.LocationAccuracy,
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_9__.NativeGeocoder,
            _awesome_cordova_plugins_device_ngx__WEBPACK_IMPORTED_MODULE_7__.Device
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 4608);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-action-sheet.entry.js": [
		7321,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		6108,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		1489,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		305,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		5830,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		7757,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-button_2.entry.js": [
		392,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		6911,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		937,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		8695,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		6034,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		8837,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		4195,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		1709,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		5931,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		4513,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		8056,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		862,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		7509,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		6272,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		1855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		8708,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-popover.entry.js": [
		3527,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		4694,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		9222,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		5277,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		9921,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		3122,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		1602,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		5174,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		7895,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		6164,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		7162,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		1374,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		7896,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		5043,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		7802,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		9072,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		2191,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		801,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		7110,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		431,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 3069:
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".ion-page {\n  z-index: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmlvbi1wYWdlIHtcclxuICB6LWluZGV4OiAxICFpbXBvcnRhbnQ7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ 1106:
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\r\n  <ion-router-outlet></ion-router-outlet>\r\n</ion-app>\r\n\r\n<ion-menu side=\"start\" menuId=\"first\" contentId=\"main\" *ngIf=\"isLoggedIn\">\r\n  <ion-header>\r\n    <ion-toolbar color=\"dark\">\r\n      <ion-title class=\"ion-no-margin ion-text-center\">Hauptmenü</ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n  <ion-content>\r\n    <ion-list class=\"ion-text-center\">\r\n      <ion-button expand=\"full\" color=\"dark\" (click)=\"checkCompaignUpdates()\">Kampagnenupdate prüfen</ion-button>\r\n      <ion-button expand=\"full\" color=\"dark\" (click)=\"checkUpdates()\" onclick=\"checkForUpdates()\">Softwareupdate prüfen</ion-button>\r\n      <ion-button expand=\"full\" color=\"dark\" (click)=\"signOut()\">Gerät abmelden</ion-button>\r\n      <ion-button expand=\"full\" color=\"dark\" (click)=\"exitApp()\">Beenden</ion-button>\r\n      <ion-button expand=\"full\" color=\"dark\" (click)=\"shutDown()\" onclick=\"presentShutdownConfirmationAlert()\">Gerät ausschalten</ion-button>\r\n      <ion-button class=\"custom-ion-link-btn\" expand=\"full\" fill=\"clear\" (click)=\"closeMenu()\">Fenster schließen</ion-button>\r\n    </ion-list>\r\n    <ion-row>\r\n      <ion-col class=\"ion-text-center\">\r\n        <ion-text>\r\n          <small>App Version: {{this.appVersions}}</small>\r\n        </ion-text>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-content>\r\n</ion-menu>\r\n\r\n<ion-router-outlet id=\"main\" *ngIf=\"isLoggedIn\"></ion-router-outlet>\r\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map