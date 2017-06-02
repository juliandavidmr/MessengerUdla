# **Sistema de mensajería instantánea**

[![Greenkeeper badge](https://badges.greenkeeper.io/juliandavidmr/MessengerUdla.svg)](https://greenkeeper.io/)

> Crear aplicación móvil para mensajería instantánea usando Ionic 2 y Firebase.

* **Herramientas implementadas:**
    1. Ionic 2 (Compatible con v3)
    2. AngularFire2
    3. Firebase

* **Características**
    1. Mensajes en tiempo real.
    2. Soporte para registro de usuarios.
    3. Detección de cambios automáticos.

## **Capturas**

<img src="./login.png" title="Login"/>
<img src="./chat.png" title="chat"/>


## **Desarrollo**

### **Crear proyecto e instalar paquetes**

- Crear proyecto con estilo tabs por defecto:
```bash
$ ionic start MessengerUdla --v2
```

- Instalar los paquetes necesarios para **Firebase**:
```bash
# Usando NPM
$ npm istall angularfire2 firebase --save

# O usando yarn
$ yarn add angularfire2 firebase
```

### **Referenciar credenciales y tokens de Firebase**
Agregar credenciales y tokens de configuración de Firebase.

```ts
// app.module.ts

import { AngularFireModule, AngularFire } from "angularfire2";
```

Crear objeto para archivos de configuración de Firebase:
```ts
// app.module.ts

const COMMON_CONFIG = {
  apiKey: "AIzaSyDw8eKS2GCZ8dePI-Dhs15DtF6ewtCpg1Q",
  authDomain: "messenger-6168d.firebaseapp.com",
  databaseURL: "https://messenger-6168d.firebaseio.com",
  storageBucket: "messenger-6168d.appspot.com/"
};
```

Referenciar modulos de AngularFire en el `@ngModule`:
```ts
// app.module.ts

@NgModule({
  /* ... */,
  imports: [
    /* ... */
    AngularFireModule.initializeApp(COMMON_CONFIG)
  ],
  /* ... */,
  providers: [
    /* ... */
    AngularFire
  ]
})
export class AppModule { }
```

### **Crear elementos para Login**

La vista login permite registrar, ingresar y cerrar sesión. Para el registro es necesario unicamente un usuario y contraseña.
**Importante:** El registro es necesario para poder enviar mensajes.


**Crear pagina para Login**, en el archivo `login.ts` se deben colocar las referencias algunos componentes que provee `AngularFire`:

```ts
// login.ts

import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from "angularfire2";
```
Posteriormente, crear una instancia de `AngularFire` en el constructor: 
```ts
// login.ts

constructor(
  /* ... */
  public af: AngularFire) {
}
```

Las funciones para registrar, loguear y cerrar se sesión:

> crear usuario
```ts
// login.ts

crear(email, pass) {
  this.af.auth.createUser({ email: email, password: pass }).then(res => {
    console.log("Usuario creado:", res)
  }).catch(err => {
    console.log("ERROR: ", err);
  })
}
```
> logear usuario
```ts
// login.ts
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
```

> cerrar sesión
```ts
// login.ts
logout() {
  this.af.auth.logout().then(val => {
    console.log(val);
  }).catch(err => {
    console.log("ERROR:", err);

  })
}
```

> login.html

La vista de iniciar sesión debe tener dos elementos de entrada de datos, para esto se hace uso de la directiva `[(ngModel)]`.

```html
<ion-header>
  <ion-navbar>
    <ion-title>Login</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-item>
    <ion-label stacked>Correo</ion-label>
    <ion-input [(ngModel)]="email" type="email" placeholder="¿Cúal es tu correo?"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label stacked>Contraseña</ion-label>
    <ion-input [(ngModel)]="pass" type="password" placeholder="Contraseña"></ion-input>
  </ion-item>

  <button ion-button block (click)="crear(email, pass)">Crear usuario</button>
  <button ion-button block (click)="login(email, pass)">Entrar</button>
</ion-content>
```

### **Crear elementos para Home**

La página `Home` permite enviar y recibír mensajes de manera instantánea gracias a Firebase.

> home.ts

```ts
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

  constructor(
      public navCtrl: NavController, 
      public af: AngularFire) {
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
```

> home.html
```html
<ion-header>
  <ion-navbar>
    <ion-title>Home</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-item>
    <ion-label stacked>Mensaje</ion-label>
    <ion-input [(ngModel)]="mensaje" type="text" placeholder="Escribe un mensaje"></ion-input>
  </ion-item>
  <button ion-button color="secondary" outline full (click)="enviar(mensaje)">Enviar</button>
  <p>
    <ion-list>
      <ion-item *ngFor="let msg of mensajes | async">
        <h2>{{ msg.mensaje }}</h2>
        <h3>{{ msg.usuario }}</h3>
        <p>{{ msg.fecha }}</p>
      </ion-item>
    </ion-list>
  </p>
</ion-content>
```


### Más información

- [AngularFire2-Auth](https://github.com/angular/angularfire2/blob/master/docs/5-user-authentication.md)
- [Auth Firebase](http://tphangout.com/ionic-2-authentication-using-firebase)
- [Guía en inglés](https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire)
- [Guía 2 en inglés](https://www.pluralsight.com/guides/front-end-javascript/using-angularfire2-to-build-ionic-2-firebase-apps)
- [Quickstart firebase](https://firebase.google.com/docs/database/security/quickstart)