import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { DogsPage } from '../pages/dogs/dogs';
import { ShopPage } from '../pages/shop/shop';
import { InventoryPage } from '../pages/inventory/inventory';
import { WalkPage } from '../pages/walk/walk';
import { CameraPage } from '../pages/camera/camera';

import { Globals } from '../providers/Globals';
import { ImagePath } from '../app/app.module';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  homePage = HomePage;
  dogsPage = DogsPage;
  shopPage = ShopPage;
  inventoryPage = InventoryPage;
  walkPage = WalkPage;
  cameraPage = CameraPage;

  globals: Globals;
  imgPath: ImagePath;

  // for the icons in the menu
  homeIcon: string;
  dogIcon: string;
  shopIcon: string;
  invIcon: string;
  walkIcon: string;
  cameraIcon: string;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.globals = Globals.getInstance();

      if(platform.is("android")) {
	this.globals.setPlatform("android");
      } else {
	if(platform.is("ios")) {
	  this.globals.setPlatform("ios");
	} else {
	  if(platform.is("core")) {
	    this.globals.setPlatform("core");
	  } else {
	    // unknown/unsupported platform
	    this.globals.setPlatform("other");
	  }
	}
      }

      // for the icons in the menu
      this.imgPath = new ImagePath();
      this.homeIcon = this.imgPath.getImagePath("home.png");
      this.dogIcon = this.imgPath.getImagePath("swap.png");
      this.shopIcon = this.imgPath.getImagePath("shop.png");
      this.invIcon = this.imgPath.getImagePath("inventory.png");
      this.walkIcon = this.imgPath.getImagePath("walk.png");
      this.cameraIcon = this.imgPath.getImagePath("camera.png");
    });
  }

  openPage(page)
  {
    //makes it so the back button does not show.
    // this.nav.setRoot(page.component);
    this.rootPage = page;
  }
}
