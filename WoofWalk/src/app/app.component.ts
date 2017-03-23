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

    });
  }

  openPage(page)
  {
    //makes it so the back button does not show.
    // this.nav.setRoot(page.component);
    this.rootPage = page;
  }
}
