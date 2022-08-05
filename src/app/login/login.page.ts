/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../_services/notification.service';


const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isShowLoader = false;
  errorMessage = '';
  platform: any;
  membershipExpired = false;

  constructor(
    public modalController: ModalController,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private notificationService: NotificationService
    ) { 
      

   
    }

  ngOnInit() {
    this.tokenStorage.getToken().then(
      data => {
        if(data!=null){
          this.isLoggedIn = true;
        }
      }
    );
    /*this.tokenStorage.getUser().then(
      data => {
        console.log("Data: " + data);
        if(data!=null){
          this.isLoggedIn = true;
        }
      }
    );*/
  }

  onSubmit(): void {
    this.isShowLoader = true;
    const { username, password} = this.form;
    const tmpMsg = 'E-Mail-Adresse und/oder Passwort sind leider falsch. Bitte überprüfen Sie Ihre Eingabe.';
    this.authService.login(username, password).then(
      response => {
        console.log(response.data);
        if(!response.data.errors) {
          if(response.data.stripe_id!=null/*response.data.has_membership!==false*/ && this.membershipExpired!==true){
            this.tokenStorage.saveToken(response.data.token).then(() => {
                this.tokenStorage.saveUser(response.data).then(() => {
                  this.isLoginFailed = false;
                  this.isLoggedIn = true;
                  this.isShowLoader = false;
                  this.tokenStorage.getToken().then(
                    token => {
                      if(token!=null){
                        console.log(token);
                      }else{
                        console.log("token is null")
                      }
                    }
                  );
                  this.router.navigate(['/home']);
                  // this.reloadPage();
                });
            });
          } else if(this.membershipExpired==true){
            this.notificationService.membershipExpiredAlert();
            this.isShowLoader = false;
          } else {
            this.membershipExpired = false;
            this.errorMessage = 'Unbekannter Benutzername. Überprüfe ihn noch einmal oder versuche es mit deiner E-Mail-Adresse.';
            this.isLoginFailed = true;
            this.isShowLoader = false;
            this.notificationService.loginResponseAlert(this.errorMessage);
          }
        } else {
          this.membershipExpired = false;
          this.errorMessage = response.data.message;
          this.isLoginFailed = true;
          this.isShowLoader = false;
          this.notificationService.loginResponseAlert(tmpMsg);
        }
        //this.router.navigate(['home']);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  async presentForgotPasswordModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  exitApp(){
    App.exitApp();
  }
}
