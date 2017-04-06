import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ImagePath, Consumable } from '../../app/app.module';

import { Inventory } from '../../providers/inventory';

/*
  Generated class for the Inventory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  private nav;
  private imgPath: ImagePath = new ImagePath();
  private items: Inventory = Inventory.getInstance();

  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

    // this.food = [ new Food("Dry Food", this.imgPath.getImagePath("food_dry.png"), 13, 10, "food"),
		//						  new Food("Canned Food", this.imgPath.getImagePath("food_can.png"), 14, 20, "food"),
    //              new Water("Bottled Water", this.imgPath.getImagePath("water_bottle.png"), 15, 20, "water") ];
    // this.treats = [ new Treat("Bone", this.imgPath.getImagePath("bone_normal.png.png"), 12, 10),
		// 						  new Treat("Fancy Bone", this.imgPath.getImagePath("bone_fancy.png"), 13, 50)];

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad InventoryPage');
  }

  getFood() {
    console.log('getFood run');
    console.log('A', this.items);
    console.log(this.items.getNumTreats());
    return this.items.getListOfFood();
  }

  getTreats() {
    console.log('getTreats run');
    return this.items.getListOfTreats();
  }
}
