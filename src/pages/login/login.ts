import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from "angularfire2";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  usuarios: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  crear(email, pass) {
    this.af.auth.createUser({ email: email, password: pass }).then(res => {
      console.log("Usuario creado:", res)
    }).catch(err => {
      console.log("ERROR: ", err);
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
    }).catch(err => {
      console.log("ERROR: ", err);
    })
  }

  logout() {
    this.af.auth.logout().then(val => {
      console.log(val);
    }).catch(err => {
      console.log("ERROR:", err);
    })
  }

}
