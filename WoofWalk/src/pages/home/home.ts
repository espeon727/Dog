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
        this.affection = this.activeDog.getAffection();
        this.fullness = this.activeDog.getFullness();
        this.hydration = this.activeDog.getHydration();
        this.cleanliness = this.activeDog.getCleanliness();
        this.icon = this.activeDog.getIcon();
      }
      console.log(this.activeDog);
    });
    
  
    

  }

  openPage(p)
  {
    this.rootPage = p;
  }


  petDog()
  {

    this.now = Date.now();
    if (this.now - this.lastPetDate > 86400000)
    {
      var newAffection = this.activeDog.getAffection();
      newAffection = newAffection + 1;
      this.affection = newAffection;
      this.activeDog.setAffection(newAffection);
      this.lastPetDate = this.now;
      this.petPopUp(this.activeDog);
    }

  }

  petPopUp(dog : Dog)
  {
    let confirm = this.alertCtrl.create({
      title: 'You pet your Dog ' + dog.getName() + "!",
      message: 'Come back tomorrow to pet it again',
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

  getDogImage()
  {
    if (this.activeDog == null)
    {
      return "../assets/images/" + this.icon;
    }
    return this.imgPath.getImagePath(this.icon);
  }

}
