import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

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
  private nav
  private results
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.results = this.getResults();
  }

  getResults() {
      return [
        {"name": "Bone", "quantity": 12, "icon": "../www/assets/images/bone_normal.png", "icon2": "../assets/images/bone_normal.png"},
        {"name": "Fancy Bone", "quantity": 13, "icon": "../www/assets/images/bone_fancy.png", "icon2": "../assets/images/bone_normal.png"},
        {"name": "Canned Food", "quantity": 14, "icon": "../www/assets/images/food_can.png", "icon2": "../assets/images/bone_normal.png"},
      ];
  }
}
