import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from "angularfire2";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  usuarios: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  crear(email, pass) {
    this.af.auth.createUser({ email: email, password: pass }).then(res => {
      console.log("Usuario creado:", res)
      this.showAlert("Correcto", "El usuario ha sido creado correctamente.")
    }).catch(err => {
      console.log("ERROR: ", err);
      this.showAlert("Falló", "Por favor verifique su conexión a internet")
    })
  }

  login(email, pass) {
    this.af.auth.login(
      {
        email: email,
        password: pass
      }, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }
    ).then(res => {
      console.log("Usuario logueado:", res)
      this.showAlert("Correcto", "Logueado correctamente. Ahora puede enviar mensajes.")
    }).catch(err => {
      console.log("ERROR: ", err);
      this.showAlert("Falló", "Por favor verifique su conexión a internet")
    })
  }

  logout() {
    this.af.auth.logout().then(val => {
      console.log(val);
      this.showAlert("Correcto", "Ha cerrrado la sesión.")
    }).catch(err => {
      console.log("ERROR:", err);
      this.showAlert("Falló", "Por favor verifique su conexión a internet")
    })
  }

  showAlert(title: string, desc: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: desc,
      buttons: ['OK']
    });
    alert.present();
  }

}
