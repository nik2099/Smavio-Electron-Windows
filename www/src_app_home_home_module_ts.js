(self["webpackChunksmavio"] = self["webpackChunksmavio"] || []).push([["src_app_home_home_module_ts"],{

/***/ 2003:
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 2267);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], HomePageRoutingModule);



/***/ }),

/***/ 3467:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 2003);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 2267);







let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomePageRoutingModule
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage]
    })
], HomePageModule);



/***/ }),

/***/ 2267:
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./home.page.html */ 9764);
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss */ 2610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/token-storage.service */ 3590);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.component */ 5041);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/auth.service */ 8368);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _services_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/notification.service */ 3196);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 9895);













let HomePage = class HomePage {
    constructor(modalController, tokenStorage, appComponent, router, authService, sanitizer, menu, alertController, notificationService, loadingController) {
        this.modalController = modalController;
        this.tokenStorage = tokenStorage;
        this.appComponent = appComponent;
        this.router = router;
        this.authService = authService;
        this.sanitizer = sanitizer;
        this.menu = menu;
        this.alertController = alertController;
        this.notificationService = notificationService;
        this.loadingController = loadingController;
        this.isLoggedIn = false;
        this.isLoading = false;
    }
    loaderStart() {
        this.isLoading = true;
        return this.loadingController.create({
        //   message: this.wait
        }).then(a => {
            a.present().then(() => {
                console.log('presented');
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }
    loaderStop() {
        this.isLoading = false;
        return this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
    checkStatus() {
        this.appComponent.testNetwork().then(networkConnected => {
            if (networkConnected) {
                this.appComponent.testHost().then(isHostUp => {
                    if (isHostUp) {
                        this.appComponent.validateToken().then(isTokenValid => {
                            if (isTokenValid) {
                                this.appComponent.onScreenDoubleClick();
                                this.isLoggedIn = true;
                                this.getCampaign();
                            }
                            else {
                                this.isLoggedIn = false;
                                this.tokenStorage.signOut().then(() => {
                                    this.router.navigate(['/login']);
                                });
                            }
                        });
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                });
            }
        });
    }
    checkUserStaus() {
        this.authService.checkUser().then(response => {
            this.user = response.data.user;
            this.tokenStorage.getToken().then(token => {
                if (token == null) {
                    this.authService.logout(token).then(data => {
                        this.tokenStorage.signOut().then(() => {
                            this.router.navigate(['/login']);
                        });
                    });
                }
            });
        }, error => {
        });
    }
    getCampaign() {
        this.authService.getAssignCompaign().then(response => {
            console.log(response);
            if (response.status == 200) {
                if (response.data.success == true) {
                    // if(response.data.update_available != true){
                    this.tokenStorage.saveCampaignId(response.data.campaign_id).then(() => {
                        this.campaignId = response.data.campaign_id;
                        this.campaignName = response.data.campaign_name;
                        const campaign_url = 'https://service-backend.smavio.de/campaign/' + this.campaignId + '/preview';
                        this.campaignUrl = this.sanitizer.bypassSecurityTrustResourceUrl(campaign_url);
                    });
                    // }
                    //   else{
                    //     this.notificationService.compaignUpdateAlert();
                    // }
                }
                else {
                    this.campaignAlert(response);
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
    campaignAlert(response) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            let resolveFunction;
            const promise = new Promise(resolve => {
                resolveFunction = resolve;
            });
            const alert = yield this.alertController.create({
                cssClass: 'custom-ion-alert campaign-alert',
                header: 'Alert',
                backdropDismiss: false,
                message: 'Campain not asign you,please contact to admin',
                buttons: [
                    {
                        text: 'Reload Page',
                        cssClass: 'custom-ion-dark-btn',
                        handler: () => {
                            this.getCampaign();
                            alert.dismiss();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    // var iframe = document.getElementById('campaignFrame');
    // iframe.contentWindow.body.addEventListener('mouseup', Handler);
    iframeLoad(event) {
        event.target.contentWindow.addEventListener('dblclick', (event) => {
            const targetIdNode = event.target.body;
            console.log(event.target.attributes.id.nodeValue);
            if (targetIdNode !== undefined) {
                const targetId = event.target.attributes.id.nodeValue;
                if (targetId === 'home-container') {
                    this.appComponent.openMenu();
                }
            }
        });
    }
    ngOnInit() {
        this.checkStatus();
        this.checkUserStaus();
    }
    ionVIewWillEnter() {
        this.checkStatus();
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController },
    { type: _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__.TokenStorageService },
    { type: _app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.DomSanitizer },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.MenuController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.AlertController },
    { type: _services_notification_service__WEBPACK_IMPORTED_MODULE_5__.NotificationService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.LoadingController }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], HomePage);



/***/ }),

/***/ 2610:
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content div.scroll {\n  height: 90%;\n}\n\n.templateWebPage {\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n  padding: 0px;\n  border: none;\n}\n\nion-toolbar {\n  --color:#000;\n  --background: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQUNGOztBQUNBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBRUY7O0FBQUE7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFHRiIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IGRpdi5zY3JvbGx7XHJcbiAgaGVpZ2h0OiA5MCU7XHJcbn1cclxuLnRlbXBsYXRlV2ViUGFnZXtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgcGFkZGluZzogMHB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5pb24tdG9vbGJhcntcclxuICAtLWNvbG9yOiMwMDA7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjZmZmO1xyXG59Il19 */");

/***/ }),

/***/ 9764:
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header [translucent]=\"true\" *ngIf=\"isLoggedIn\">\r\n  <ion-toolbar class=\"main-header\">\r\n      <ion-buttons slot=\"start\" fill=\"outline\">\r\n          <ion-menu-button autoHide=\"true\" class=\"m-btn\" *ngIf=\"isLoggedIn\"></ion-menu-button>\r\n      </ion-buttons>\r\n    <ion-title size=\"small\">{{campaignName}}</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content id=\"home-container\" [fullscreen]=\"true\">\r\n\r\n  <iframe class='templateWebPage'  id=\"frm\" name=\"eventsPage\" [src]=\"campaignUrl\" allowfullscreen (load)=\"iframeLoad($event)\" *ngIf=\"isLoggedIn\">\r\n  </iframe>\r\n\r\n</ion-content>\r\n");

/***/ })

}]);
//# sourceMappingURL=src_app_home_home_module_ts.js.map