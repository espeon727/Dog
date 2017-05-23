/*
tutorial on local storage
https://www.thepolyglotdeveloper.com/2015/12/use-sqlite-in-ionic-2-instead-of-local-storage/
*/


import { Component } from '@angular/core';

import { NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { DogsPage } from '../dogs/dogs';
import { ShopPage } from '../shop/shop';
import { InventoryPage } from '../inventory/inventory';
import { WalkPage } from '../walk/walk';
import { CameraPage } from '../camera/camera';

import { Dogs } from '../../providers/Dogs';
import { Dog } from '../../app/app.module';
import { ImagePath } from '../../app/app.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
  private rootPage;
  private homePage;
  private shopPage;
  private inventoryPage;
  private walkPage;
  private cameraPage;

  imgPath: ImagePath = new ImagePath();
  background: string;

  public lastPetDate: any;
  public now: any;

  public name: string = '';
  public affection: number = 0;
  public fullness: number = 0;
  public hydration: number = 0;
  public cleanliness: number = 0;
  public icon: string = 'dog_brown';

  private dogProvider: Dogs = Dogs.getInstance();
  private activeDog: Dog;


  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public alertCtrl: AlertController)
  {

    // Pages
    this.rootPage = HomePage;

    this.homePage = HomePage;
    this.shopPage = ShopPage;
    this.inventoryPage = InventoryPage;
    this.walkPage = WalkPage;
    this.cameraPage = CameraPage;

    this.background = "../www/assets/images/background.png";

    this.lastPetDate = new Date(2017, 1, 1);

    this.platform.ready().then( () =>
    {
      this.dogProvider.readDatabase();
      this.activeDog = this.dogProvider.getActiveDog();
      if (this.activeDog != null)
      {
        this.name = this.activeDog.getName();
        this.affection = this.activeDog.getAffection();
        this.fullness = this.activeDog.getFullness();
        this.hydration = this.activeDog.getHydration();
        this.cleanliness = this.activeDog.getCleanliness();
        this.icon = this.activeDog.getIcon();
      }


      console.log(this.activeDog);
    });
  }

  ionViewDidEnter()
  {
    var listOfDogs = this.dogProvider.getListOfDogs();
    for(var i = 0; i < listOfDogs.length; i++)
    {
      var dog = listOfDogs[i];
      this.dogProvider.updateStats(dog);
    }
    this.dogProvider.updateDatabase();
  }
  

  openPage(p)
  {
    this.rootPage = p;
  }

  // allows the user to pet the dog.
  petDog()
  {

    this.now = Date.now();
    if (this.now - this.lastPetDate > 86400000)
    {
      var newAffection = this.activeDog.getAffection();
      newAffection = newAffection + 1;
      this.affection = newAffection;
      this.dogProvider.updateDog("affection", newAffection + 1, this.activeDog.getId());
      this.lastPetDate = this.now;
      this.petPopUp(this.activeDog);
    }

  }

  // displays an alert to indicate that the active dog has been petted
  petPopUp(dog : Dog)
  {
    let confirm = this.alertCtrl.create({
      title: 'You pet your dog ' + dog.getName() + "!",
      message: 'Come back tomorrow to pet them again',
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    confirm.present()
  }

  navigateDogs()
  {
    this.navCtrl.push(DogsPage);
  }
  navigateShop()
  {
    this.navCtrl.push(ShopPage);
  }
  navigateInventory()
  {
    this.navCtrl.push(InventoryPage);
  }
  navigateWalk()
  {
    this.navCtrl.push(WalkPage);
  }
  navigateCamera()
  {
    this.navCtrl.push(CameraPage);
  }

  // returns the correct image for the active dog
  getDogImage()
  {
    if (this.activeDog == null)
    {
      return "../assets/images/" + this.icon;
    }
    return this.imgPath.getImagePath(this.icon);
  }

  getBarImage(stat: string) : string {
		var val;
    if (this.activeDog != null)
    {
  		switch(stat) {
  		case'affection':
  			val = this.activeDog.getAffection();
  			break;
  		case'fullness':
  			val = this.activeDog.getFullness();
  			break;
  		case'hydration':
  			val = this.activeDog.getHydration();
  			break;
  		case'cleanliness':
  			val = this.activeDog.getCleanliness();
  			break;
  		default:
  			console.log("UNKNOWN ATTRIBUTE");
  			return "000.png";
  		}
      return this.imgPath.getImagePath("dog_stat_bars/" + stat + "_bars/" + stat + "_bar" + Math.floor(val/10) * 10 + ".png");
    }
    else
    {
      return "../www/assets/images/dog_stat_bars/" + stat + "_bars/" + stat + "_bar0.png";
    }
	}

}
