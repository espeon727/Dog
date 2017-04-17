import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Item, Consumable } from '../../app/app.module';
import { ImagePath } from '../../app/app.module';

import { Inventory } from '../../providers/inventory';

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

  private imgPath: ImagePath = new ImagePath();
  private items: Inventory = Inventory.getInstance();

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  showItems() : Consumable[]
  {
    var food = this.items.getListOfFood();
    var treats = this.items.getListOfTreats();
    var allItems = food.concat(treats);
    return allItems;
  }

  getItemImage(item)
  {
    return this.imgPath.getImagePath(item.getIcon());
  }

}
