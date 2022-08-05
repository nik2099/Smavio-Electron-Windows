import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {NgForm} from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: any = {
    email: null,
    confirmEmail: null,
  };
  isShowLoader = false;
  isResetFailed = false;
  isLinkSent = false;
  message = '';
  constructor(
    public modalController: ModalController,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm): void {
    this.isShowLoader = true;
    const { email, confirmEmail } = this.form;

    if(email !== confirmEmail){
      this.message = 'User email and Ihre E-Mail-Adresse are not same';
      this.isShowLoader = false;
      this.isLinkSent = false;
      this.isResetFailed = true;
      this.notificationService.loginResponseAlert(this.message);
    } else {
      this.authService.resetPassword(email).then(
        response => {
          console.log(response.data.message);
          if(!response.data.errors) {
            this.isResetFailed = false;
            this.isLinkSent = true;
            this.isShowLoader = false;
            this.message = response.data.message;
            f.form.reset();
          } else {
            this.message = "Invalid credentials";
            this.isResetFailed = true;
            this.isLinkSent = false;
            this.isShowLoader = false;
          }
          if(this.isResetFailed || this.isLinkSent){
            this.notificationService.loginResponseAlert(this.message);
          }
        }
      );
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
