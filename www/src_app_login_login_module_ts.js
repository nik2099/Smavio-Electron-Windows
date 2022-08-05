(self["webpackChunksmavio"] = self["webpackChunksmavio"] || []).push([["src_app_login_login_module_ts"],{

/***/ 5393:
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageRoutingModule": () => (/* binding */ LoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 6825);




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ 107:
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": () => (/* binding */ LoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-routing.module */ 5393);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page */ 6825);







let LoginPageModule = class LoginPageModule {
};
LoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _login_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoginPageRoutingModule
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_1__.LoginPage]
    })
], LoginPageModule);



/***/ }),

/***/ 6825:
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./login.page.html */ 6770);
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss */ 1339);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _forgot_password_forgot_password_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../forgot-password/forgot-password.page */ 2327);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 8384);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/auth.service */ 8368);
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/token-storage.service */ 3590);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_services/notification.service */ 3196);



/* eslint-disable max-len */








const { App } = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Plugins;
let LoginPage = class LoginPage {
    constructor(modalController, authService, tokenStorage, router, notificationService) {
        this.modalController = modalController;
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.router = router;
        this.notificationService = notificationService;
        this.form = {
            username: null,
            password: null
        };
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.isShowLoader = false;
        this.errorMessage = '';
        this.membershipExpired = false;
    }
    ngOnInit() {
        this.tokenStorage.getToken().then(data => {
            if (data != null) {
                this.isLoggedIn = true;
            }
        });
        /*this.tokenStorage.getUser().then(
          data => {
            console.log("Data: " + data);
            if(data!=null){
              this.isLoggedIn = true;
            }
          }
        );*/
    }
    onSubmit() {
        this.isShowLoader = true;
        const { username, password } = this.form;
        const tmpMsg = 'E-Mail-Adresse und/oder Passwort sind leider falsch. Bitte überprüfen Sie Ihre Eingabe.';
        this.authService.login(username, password).then(response => {
            console.log(response.data);
            if (!response.data.errors) {
                if (response.data.stripe_id != null /*response.data.has_membership!==false*/ && this.membershipExpired !== true) {
                    this.tokenStorage.saveToken(response.data.token).then(() => {
                        this.tokenStorage.saveUser(response.data).then(() => {
                            this.isLoginFailed = false;
                            this.isLoggedIn = true;
                            this.isShowLoader = false;
                            this.tokenStorage.getToken().then(token => {
                                if (token != null) {
                                    console.log(token);
                                }
                                else {
                                    console.log("token is null");
                                }
                            });
                            this.router.navigate(['/home']);
                            // this.reloadPage();
                        });
                    });
                }
                else if (this.membershipExpired == true) {
                    this.notificationService.membershipExpiredAlert();
                    this.isShowLoader = false;
                }
                else {
                    this.membershipExpired = false;
                    this.errorMessage = 'Unbekannter Benutzername. Überprüfe ihn noch einmal oder versuche es mit deiner E-Mail-Adresse.';
                    this.isLoginFailed = true;
                    this.isShowLoader = false;
                    this.notificationService.loginResponseAlert(this.errorMessage);
                }
            }
            else {
                this.membershipExpired = false;
                this.errorMessage = response.data.message;
                this.isLoginFailed = true;
                this.isShowLoader = false;
                this.notificationService.loginResponseAlert(tmpMsg);
            }
            //this.router.navigate(['home']);
        });
    }
    reloadPage() {
        window.location.reload();
    }
    presentForgotPasswordModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _forgot_password_forgot_password_page__WEBPACK_IMPORTED_MODULE_2__.ForgotPasswordPage,
                cssClass: 'my-custom-class',
            });
            return yield modal.present();
        });
    }
    exitApp() {
        App.exitApp();
    }
};
LoginPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService },
    { type: _services_token_storage_service__WEBPACK_IMPORTED_MODULE_5__.TokenStorageService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router },
    { type: _services_notification_service__WEBPACK_IMPORTED_MODULE_6__.NotificationService }
];
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], LoginPage);



/***/ }),

/***/ 1339:
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ 6770:
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.page.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content class=\"login-modal\">\r\n \r\n        <form class=\"ion-margin-top\" name=\"form\" (ngSubmit)=\"f.form.valid && onSubmit()\" #f=\"ngForm\" novalidate>\r\n      \r\n         \r\n      \r\n          <ion-input type=\"text\" name=\"username\" [(ngModel)]=\"form.username\" required #username=\"ngModel\" placeholder=\"Benutzername\"></ion-input>\r\n          <ion-text class=\"login-error-text\" color=\"danger\" *ngIf=\"username.errors && f.submitted\">\r\n            <small class=\"ion-padding-start\">Username is required!</small>\r\n          </ion-text>\r\n      \r\n          <ion-input type=\"password\" name=\"password\" [(ngModel)]=\"form.password\" required #password=\"ngModel\" placeholder=\"Passwort\"></ion-input>\r\n          <ion-text class=\"login-error-text\" color=\"danger\" *ngIf=\"password.errors && f.submitted\">\r\n            <small class=\"ion-padding-start\">Password is required!</small>\r\n          </ion-text>\r\n      \r\n          <ion-row class=\"ion-margin-top login-row\">\r\n            <ion-col class=\"ion-text-end\">\r\n              <ion-button type=\"submit\" color=\"dark\" expand=\"full\" [disabled]=\"isShowLoader\">Login</ion-button>\r\n            </ion-col>\r\n            <ion-col class=\"ion-text-start\">\r\n              <ion-button type=\"button\" color=\"dark\" expand=\"full\" (click)=\"exitApp()\" [disabled]=\"isShowLoader\">Beenden</ion-button>\r\n            </ion-col>\r\n          </ion-row>\r\n      \r\n          <ion-row class=\"ion-margin-top login-row\">\r\n            <ion-col class=\"ion-text-center\">\r\n              <ion-spinner *ngIf=\"isShowLoader\"></ion-spinner>\r\n              <!-- <ion-text color=\"danger\" *ngIf=\"f.submitted && isLoginFailed && !isShowLoader\">\r\n                <small>Login failed: {{ errorMessage }}</small>\r\n              </ion-text> -->\r\n            </ion-col>\r\n          </ion-row>\r\n      \r\n          <ion-row>\r\n            <ion-col class=\"ion-text-center\">\r\n              Keine Zugangsdaten? <a [routerLink]=\"\" class=\"small-text\" (click)=\"presentForgotPasswordModal()\">Anfordern</a>\r\n            </ion-col>\r\n          </ion-row>\r\n        </form>\r\n   \r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=src_app_login_login_module_ts.js.map