
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


import { DogsPage } from '../dogs/dogs';
import { ShopPage } from '../shop/shop';
import { InventoryPage } from '../inventory/inventory';
import { WalkPage } from '../walk/walk';
import { CameraPage } from '../camera/camera';

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


  public affection: number;
  public fullness: number;
  public hydration: number;
  public cleanliness: number;

  public lastPetDate: any;
  public now: any;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    // Pages
    this.rootPage = HomePage;

    this.homePage = HomePage;
    this.shopPage = ShopPage;
    this.inventoryPage = InventoryPage;
    this.walkPage = WalkPage;
    this.cameraPage = CameraPage;

    this.background = "../www/assets/images/background.png";

    // Dog Stats
    this.affection = 13;
    this.fullness = 12;
    this.hydration = 10;
    this.cleanliness = 24;

    this.lastPetDate = new Date(2017, 1, 1);

  }


  clicked()
  {
    return 0;
  }

  openPage(p)
  {
    this.rootPage = p;
  }

  // toggleMenu()
  // {
  //   var menu = document.getElementById("menu");
  //   if(menu.classList.contains("show-menu"))
  //   {
  //     menu.classList.remove("show-menu");
  //   }
  //   else
  //   {
  //     menu.classList.add("show-menu");
  //   }
  // }

  petDog()
  {


    this.now = Date.now();
    if (this.now - this.lastPetDate > 86400000)
    {
      this.affection += 1;
      this.lastPetDate = this.now;
    }

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

}
