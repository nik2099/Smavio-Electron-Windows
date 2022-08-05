import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { TokenStorageService } from './_services/token-storage.service';
import { NotificationService } from './_services/notification.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/token.interceptor';
 import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot({
    name: '__smaviodb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  })],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TokenStorageService, NotificationService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      },
   ScreenOrientation, 
   AppVersion,
   AndroidPermissions,
   LocationAccuracy,
   NativeGeocoder,
   Device],
   bootstrap: [AppComponent],
})
export class AppModule {}
