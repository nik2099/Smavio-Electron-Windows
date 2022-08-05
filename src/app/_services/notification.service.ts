import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  campaignId:any;
  campaignUrl : any;
  constructor(
    public alertController: AlertController,private authService: AuthService, private tokenStorage: TokenStorageService,private sanitizer: DomSanitizer,private router: Router
  ) { }

  async connectionAlert() {
    const alert = await this.alertController.create({
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

    await alert.present();
  }

  async hostAlert(): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
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

    await alert.present();

    return promise;
  }

  async loginResponseAlert(msg: any): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
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

    await alert.present();

    return promise;
  }

  async membershipExpiredAlert(): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
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

    await alert.present();

    return promise;
  }

  checkCampaignUpdate(){
    this.authService.getAssignCompaign().then(
      response => {
        console.log(response);
          if(response.status == 200){
              if(response.data.success == true){
                  if(response.data.update_available != true){
                        this.compaignUpdatesNotAvailableAlert();
                  }

                  else{
                       this.compaignUpdateAlert();
                  }
                
              }else{
                
              }
          }else{
            
            if(response.status == 401){ 
              this.tokenStorage.signOut().then(() => {
                console.log('logout');
                this.router.navigate(['/login']);
              });
            }
          }    
        
      },
      error =>{
        
        
      }
    );
  }
  
  
  async compaignUpdateAlert(): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
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

    await alert.present();

    return promise;
  }

  async compaignDownloadingAlert(): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      cssClass: 'custom-ion-alert',
      header: 'Update wird heruntergeladen',
      backdropDismiss: false,
      message: '<div id="compaign-downloading-progress"><div id="progress">0%</div><ion-progress-bar></ion-progress-bar></div>',
    });
    await alert.present();

    const progressBar = document.querySelector("#compaign-downloading-progress ion-progress-bar");
    const progress = document.querySelector("#compaign-downloading-progress #progress");
    progress.setAttribute('style','z-index: 1;position: absolute;left: 45%;top: 60%;color: #a9a9a9;');
    let i = 0;
    let intervalId = setInterval(() => {
      if(i!=100){
        i += 10;
        progressBar.setAttribute('value', (i/100)+"");
        progress.innerHTML = i+"%";
      } else {
        clearInterval(intervalId);
        alert.dismiss();
        this.compaignUpdatingAlert();
      }
    }, 500);

    return promise;
  }

  async compaignUpdatingAlert(): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      cssClass: 'custom-ion-alert',
      header: 'Update wird installiert',
      backdropDismiss: false,
      message: '<div id="compaign-downloading-progress"><div id="progress">0%</div><ion-progress-bar></ion-progress-bar></div>',
    });
    await alert.present();

    const progressBar = document.querySelector("#compaign-downloading-progress ion-progress-bar");
    const progress = document.querySelector("#compaign-downloading-progress #progress");
    progress.setAttribute('style','z-index: 1;position: absolute;left: 43%;top: 52%;color: #a9a9a9;');
    let i = 0;
    let intervalId = setInterval(() => {
      if(i!=100){
        i += 10;
        progressBar.setAttribute('value', (i/100)+"");
        progress.innerHTML = i+"%";
      } else {
        clearInterval(intervalId);
        alert.dismiss();
        this.getCampaginUpdate();
        // this.compaignUpdatesNotAvailableAlert();
      }
    }, 500);

    return promise;
  }

  async compaignUpdatesNotAvailableAlert(): Promise<boolean> {

    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
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

    await alert.present();

    return promise;
  }
  


  getCampaginUpdate(){
  
    this.authService.campainUpdate().then(
      response => {
        if(response.status == 200){
          this.tokenStorage.saveCampaignId(response.data.campaign_id).then(() => {
            this.campaignId  = response.data.campaign_id;
          });
          window.location.reload();
        }else{
          
        }
      },
      error =>{
        
      }
    );
  }




}
