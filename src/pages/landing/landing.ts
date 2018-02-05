import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WalkthroughPage } from '../walkthrough/walkthrough';
import { LoginPage } from '../login/login';

@Component({
  selector: 'landing-page',
  templateUrl: 'landing.html'
})
export class LandingPage {
  
  isLoggedIn: boolean = false;
  data: any;
  err: any;
  user = { token:null, name:null }
  user_name: any;
  co_data = { token: null, name: null};


  constructor(public nav: NavController, public http: Http, public storage: Storage) {

  }

  ionViewWillEnter(){
    //If User Logged In
      this.isLoggedIn = false;

      this.storage.get('user').then((val) => {
        if(val !== null){
            console.log(val);
            this.isLoggedIn = true;
            this.user_name = val.name;

            // Regenerate Token
            this.co_data.token = val.token; 
            console.log('Old Token', val.token);
            this.http.post("http://www.schooldash.xyz/services/regeneratetoken.php", this.co_data)
                    .subscribe(data => {
                      console.log(data);
                      this.data = JSON.parse(data['_body']);
                      if(this.data.status){
                        this.storage.remove('user');
                        this.user.name = this.user_name;
                        this.user.token = this.data.newtoken;
                        console.log(this.user);
                        this.storage.set('user', this.user);
                      }

                      else{
                        this.isLoggedIn = false;
                        this.storage.remove('user');
                        this.nav.setRoot(LoginPage);
                      }
                    }, error => {
                    this.isLoggedIn = false;
                    console.log(error);// Error getting the data
            });
        }

      });
  }

  goToWalkthrough(){
    this.nav.push(WalkthroughPage);
  }

  goToLogin(){
    this.nav.push(LoginPage);
  }

  logout(){
    this.storage.remove('user');
    this.storage.remove('regNo');
    this.isLoggedIn = false;
  }
}