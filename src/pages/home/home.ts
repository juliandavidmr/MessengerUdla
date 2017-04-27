import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mensaje: string = ''
  mensajes: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.mensajes = af.database.list('/mensajes')

    console.log(this.mensajes)
  }

  enviar(mensaje:string) {
    this.mensajes.push({
      mensaje: mensaje,
      fecha: (new Date()).toString(),
      usuario: this.af.auth.getAuth().auth.email
    })
  }

}
