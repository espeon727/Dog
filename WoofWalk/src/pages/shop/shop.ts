import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)
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

  getItemImage(oneItem)
  {
    return this.imgPath.getImagePath(oneItem.getIcon());
  }

  confirmBuyAlert(oneItem : Item)
  {
    let confirm = this.alertCtrl.create({
      title: 'Buy 1 ' + oneItem.getName() + '?',
      message: oneItem.getDescription(),
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.buyItem(oneItem);
          }
        }
      ]
    });
    confirm.present()
  }

  buyItem(oneItem)
  {
    var availablePoints = this.items.getPuppyPoints();
    var itemCost = oneItem.getCost();
    if (itemCost <= availablePoints)
    {
      this.didBuyAlert(oneItem);
      console.log("buy item alert");
      var newPoints = availablePoints - itemCost;
      this.items.setPuppyPoints(newPoints);
      var current = oneItem.getQuantity();
      oneItem.setQuantity(current + 1);
    }
    else
    {
      this.noMoneyAlert(oneItem);
      console.log("you don't have money alert");
    }
  }

  didBuyAlert(oneItem : Item)
  {
    let confirm = this.alertCtrl.create({
      title: 'Bought 1 ' + oneItem.getName() + '!',
      message: 'now you have ' + oneItem.getQuantity() + ' ' + oneItem.getName(),
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Item bought');
          }
        }
      ]
    });
    confirm.present()
  }

  noMoneyAlert(oneItem : Item)
  {
    var deficit = oneItem.getCost() - this.items.getPuppyPoints();
    let confirm = this.alertCtrl.create({
      title: 'You can\'t buy ' + oneItem.getName() + '!',
      message: 'You need '+ deficit +' more puppy points',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Can\'t afford item');
          }
        }
      ]
    });
    confirm.present()
  }

}
