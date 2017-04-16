import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ImagePath, Consumable, Dog } from '../../app/app.module';

import { Dogs } from '../../providers/Dogs';
import { Inventory } from '../../providers/inventory';


/*
  Generated class for the ItemDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

  public item: Consumable;
  public imgPath: ImagePath = new ImagePath();

  public dogProvider: Dogs = Dogs.getInstance();
  public inventoryProvider: Inventory = Inventory.getInstance();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("item");
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }

  getItem() : Consumable {
		return this.item;
	}

  getItemImage()
  {
    return this.imgPath.getImagePath(this.item.getIcon());
  }

  useItem(dog : Dog) : void {
		var q = this.item.getQuantity();
    if (q <= 0)
    {
      console.log("err: quantity 0");
      console.log("add 'you have none!' alert")
    }
    else
    {
      var successfulUse = this.item.use(dog);
      if (successfulUse)
      {
        q = q - 1
        this.item.setQuantity(q);
        console.log("add 'item used yay!' alert")
      }
    }
	}

}
