import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { TokenStorageService } from '../_services/token-storage.service';
import { AppComponent } from '../app.component';
import { AuthService } from '../_services/auth.service';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { NotificationService } from '../_services/notification.service';
import { Router } from '@angular/router';
import { MenuController, } from '@ionic/angular';
import { interval } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isLoggedIn = false;
  campaignId:any;
  campaignUrl : any;
  campaignName: any;
  user : any;
  isLoading = false;


  constructor(
    public modalController: ModalController,
    private tokenStorage: TokenStorageService,
    private appComponent: AppComponent,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private menu: MenuController,
    public alertController: AlertController,
    private notificationService: NotificationService,
    public loadingController: LoadingController
    ) {

   
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
    

  checkStatus(){
    
    this.appComponent.testNetwork().then(
      networkConnected => {
        if(networkConnected){
          this.appComponent.testHost().then(
            isHostUp => {
              if(isHostUp){
                this.appComponent.validateToken().then(
                  isTokenValid => {
                    if(isTokenValid){
                      this.appComponent.onScreenDoubleClick();
                      this.isLoggedIn = true;
                      this.getCampaign();
                    } else {
                      this.isLoggedIn = false;
                      this.tokenStorage.signOut().then(() => {
                        this.router.navigate(['/login']);
                      });
                    }
                  }
                );
              } else {
                this.isLoggedIn = false;
              }
            }
          );
        }
      }
    );


  }
  
 


  checkUserStaus(){
    this.authService.checkUser().then(
      response => {
       this.user = response.data.user;
      
        this.tokenStorage.getToken().then(
          token => {
            if(token == null){
              this.authService.logout(token).then(
                data => {
                  this.tokenStorage.signOut().then(() => {
                    this.router.navigate(['/login']);
                  });
                }
              );
            }
          }
        );

      },
      error =>{  

       }
    );
  }


  getCampaign(){

    this.authService.getAssignCompaign().then(
      response => {
        console.log(response);
          if(response.status == 200){
              if(response.data.success == true){
                  if(this.campaignId  != response.data.campaign_id){
                  // if(response.data.update_available != true){
                      this.tokenStorage.saveCampaignId(response.data.campaign_id).then(() => {
                        this.campaignId  = response.data.campaign_id;
                        this.campaignName  = response.data.campaign_name;
                        
                        const campaign_url = 'https://service-backend.smavio.de/campaign/'+this.campaignId+'/preview'
                        this.campaignUrl =this.sanitizer.bypassSecurityTrustResourceUrl(campaign_url)
                      });
                  }
                  // }

                //   else{
                //     this.notificationService.compaignUpdateAlert();
                // }
                
              }else{
                this.campaignAlert(response);
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

  

  async campaignAlert(response) {
    
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
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

    await alert.present();
  }

  // var iframe = document.getElementById('campaignFrame');
  // iframe.contentWindow.body.addEventListener('mouseup', Handler);

  iframeLoad(event: any){
    event.target.contentWindow.addEventListener('dblclick', (event) => {
      const targetIdNode = event.target.body;
     
      console.log(event.target.attributes.id.nodeValue)
      if(targetIdNode !== undefined){
        const targetId = event.target.attributes.id.nodeValue;
        if(targetId === 'home-container'){
          this.appComponent.openMenu();
        }
      }
      
    });
  }

  

  ngOnInit() {
    
    this.checkStatus();
    this.checkUserStaus();

    setInterval(()=>{ 
      this.getCampaign();
   
   }, 50000);
    
  }

  ionVIewWillEnter(){
    this.checkStatus();
  }



}
