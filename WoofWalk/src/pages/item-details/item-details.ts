import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
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
      this.noItem();
    }
    else
    {
      var successfulUse = this.item.use(dog);
      if (successfulUse)
      {
        q = q - 1
        this.item.setQuantity(q);
        this.validUse();

        // Update database item quantity
        this.inventoryProvider.updateItem(this.item.getType(), this.item.getId(), q);
      }
      else
      {
        this.dogStatFull();
      }
    }
	}

  confirmUse()
  {
    let confirm = this.alertCtrl.create({
      title: 'Use ' + this.item.getName() + '?',
      message: '',
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
            this.useItem(this.dogProvider.getActiveDog());
          }
        }
      ]
    });
    confirm.present()
  }

  dogStatFull()
  {
    var stat = "";
    var type = this.item.getType()
    if (type == "food"){
      stat = "full";
    }
    else if (type == "treat"){
      stat = "happy";
    }
    else if (type == "water"){
      stat = "hydrated";
    }
    let confirm = this.alertCtrl.create({
      title: 'Your Dog is already' + stat + '!',
      message: 'Go play with your puppy!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    confirm.present()
  }

  noItem()
  {
    let confirm = this.alertCtrl.create({
      title: 'You have no ' + this.item.getName() + '!',
      message: 'You can buy more at the shop',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    confirm.present()
  }

  validUse()
  {
    var actingDog = this.dogProvider.getActiveDog();
    var stat = "";
    var type = this.item.getType()
    var newAmount = 0;
    if (type == "food"){
      stat = "fullness";
      newAmount = actingDog.getFullness();
    }
    else if (type == "treat"){
      stat = "affection";
      newAmount = actingDog.getAffection();
    }
    else if (type == "water"){
      stat = "hydration";
      newAmount = actingDog.getHydration();
    }

   

    let confirm = this.alertCtrl.create({
      title: 'Used ' + this.item.getName(),
      message: actingDog.getName() + ' had their ' + stat + ' increase to ' + newAmount,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    confirm.present()
  }

}
