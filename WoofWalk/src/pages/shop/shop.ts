import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Item } from '../../app/app.module';
import { ImagePath } from '../../app/app.module';

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

	imgpath : ImagePath = new ImagePath();
	//stuff: Item = new Item("food", this.imgpath.getImagePath("000.png"), 1);

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    // this.stuff = new Item("food", this.imgpath.getImagePath("000.png"), 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
