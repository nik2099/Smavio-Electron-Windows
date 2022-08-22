import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DOCUMENT,Location } from '@angular/common';
import { Network } from '@capacitor/network';
import { Plugins } from '@capacitor/core';

const { App } = Plugins;

import { NotificationService } from './_services/notification.service';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';

import { MenuController, } from '@ionic/angular';

import { Platform } from '@ionic/angular';
// import { Device } from '@awesome-cordova-plugins/device/ngx';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

// import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  networkConnected: boolean;
  isHostUp: boolean;
  isLoggedIn = false;
  platforms;
  appVersions:any;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private menu: MenuController,
    public platform: Platform,
    public alertController: AlertController,
    private _location: Location,
    // private screenOrientation: ScreenOrientation,
    // private appVersion: AppVersion
  ) {
    
    this.menu.enable(true, 'first');
    // this.appVersion.getVersionCode().then(value => {
    //   this.appVersions = value;
    // }).catch(err => {
    //   alert(err);
    // });

    this.platforms = this.platform.platforms();

    if(
      this.platforms.indexOf('android') !== -1 ||
      this.platforms.indexOf('ios') !== -1
    ) {
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(status.connected === false){
        this.notificationService.connectionAlert();
        console.log('alert');
        this.networkConnected = false;
      } else {
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
        } else {
          this._location.back();
        } 
  
      });
      
   
  }

  showExitConfirm(){
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
    if(this.platforms.indexOf('electron') !== -1){
      console.log('desktop');
    } else if(this.platforms.indexOf('android') !== -1 || this.platforms.indexOf('ios') !== -1){
      console.log('mobile');
    } else {
      console.log('browser');
    }
  }

  signOut() {
    this.tokenStorage.getToken().then(
      token => {
        if(token!=null){
          this.authService.logout(token).then(
            data => {
              this.tokenStorage.signOut().then(() => {
                this.reloadPage();
              });
            }
          );
        }
      }
    );
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

  exitApp(){
    App.exitApp();
  }

  shutDown(){
    if(this.platforms.indexOf('desktop') !== -1 && this.platforms.indexOf('electron') !== -1){
      console.log('desktop');
    } else {
      console.log('mobile');
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  async validateToken(): Promise<boolean> {

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

    await this.tokenStorage.getUser().then(
      data => {
        if(data!=null){
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    );

    // if(this.isLoggedIn){
    //   if(this.platforms.indexOf('android') !== -1 ||
    //   this.platforms.indexOf('ios') !== -1){
    //     await this.appVersion.getVersionNumber().then( version => {
    //       document.getElementById('appVersion').innerHTML = version;
    //     });
    //   }
    // }

    return this.isLoggedIn;
  }


  openMenu() {
    console.log(100);
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeMenu() {
    this.menu.close('first');
  }

  onScreenDoubleClick(): void {
    window.addEventListener('dblclick', (event: any) => {
      const targetIdNode = event.target.attributes.id;
      if(targetIdNode !== undefined){
        const targetId = event.target.attributes.id.nodeValue;
        if(targetId === 'home-container'){
          this.openMenu();
        }
      }
    });
  }

  async testNetwork(): Promise<boolean> {
    await Network.getStatus().then(status => {
      //console.log('Network status changed', status);
      if(status.connected === false){
        this.notificationService.connectionAlert();
        this.networkConnected = false;
      } else {
        this.networkConnected = true;
      }
    });

    return this.networkConnected;
  }

  async testHost(): Promise<boolean> {

    await this.authService.testHost().then(
      data => {
        this.isHostUp = true;
      },
      error => {
        this.isHostUp = false;
        this.notificationService.hostAlert().then(
          recheckHost => {
            if(recheckHost){
              window.location.reload();
            }
          }
        );
      }
    );

    return this.isHostUp;
  }

  
}
