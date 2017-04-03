import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { DogsPage } from '../pages/dogs/dogs';
import { ShopPage } from '../pages/shop/shop';
import { InventoryPage } from '../pages/inventory/inventory';
import { WalkPage } from '../pages/walk/walk';
import { CameraPage } from '../pages/camera/camera';

import { Settings } from '../providers/Settings';
import { ImagePath, Dog } from '../app/app.module';

import { Dogs } from '../providers/Dogs';


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

  settings: Settings;
  imgPath: ImagePath;

	dogProvider: Dogs;

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

      this.settings = Settings.getInstance();

      if(platform.is("android")) {
				this.settings.setPlatform("android");
      } else {
				if(platform.is("ios")) {
					this.settings.setPlatform("ios");
				} else {
					if(platform.is("core")) {
						this.settings.setPlatform("core");
					} else {
						// unknown/unsupported platform
						this.settings.setPlatform("other");
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

			// instanciated the dogs Provider
			this.dogProvider = Dogs.getInstance();

			// adds dogs to the dog provider.  Should be removed after local storage is implemented.  Should only be used for testing.
			var listOfDogs = this.getListOfDogs();
			for(var i = 0; i < listOfDogs.length; i++) {
				this.dogProvider.addDog(listOfDogs[i]);
			}

    });
  }

	// returns a list of dog objects.  Should be used for testing and until local storage is implemented.
	getListOfDogs()
	{
		if(this.dogProvider == null)
		{
			this.dogProvider = Dogs.getInstance();
		}
		
		return [ new Dog("Cerberus", this.imgPath.getImagePath("000.png"), this.dogProvider.getCurrentDogId(), 13, 12, 10, 24),
						 new Dog("Lucky", this.imgPath.getImagePath("000.png"), this.dogProvider.getCurrentDogId() + 1, 5, 16, 28, 2),
						 new Dog("Spot", this.imgPath.getImagePath("000.png"), this.dogProvider.getCurrentDogId() + 2, 1, 0, 12, 13) ];
	}

  openPage(page)
  {
    //makes it so the back button does not show.
    // this.nav.setRoot(page.component);
    this.rootPage = page;
  }
}
