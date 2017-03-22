import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Item } from '../../app/app.module';

/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  stuff = new Item("food", "../www/assets/images/000.png", 1);

  
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
