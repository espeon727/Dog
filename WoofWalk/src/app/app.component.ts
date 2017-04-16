/* 
tutorial on local storage
https://www.thepolyglotdeveloper.com/2015/12/use-sqlite-in-ionic-2-instead-of-local-storage/
*/


import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { DogsPage } from '../pages/dogs/dogs';
import { ShopPage } from '../pages/shop/shop';
import { InventoryPage } from '../pages/inventory/inventory';
import { WalkPage } from '../pages/walk/walk';
import { CameraPage } from '../pages/camera/camera';

import { Settings } from '../providers/Settings';
import { ImagePath, Dog, Item, Consumable } from '../app/app.module';

import { Dogs } from '../providers/Dogs';
import { Inventory } from '../providers/inventory';


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
  inventoryProvider: Inventory;

  // for the icons in the menu
  homeIcon: string;
  dogIcon: string;
  shopIcon: string;
  invIcon: string;
  walkIcon: string;
  cameraIcon: string;

  constructor(platform: Platform) {
    platform.ready().then(() => 
    {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      let db = new SQLite();
      db.openDatabase(
      {
        name: "WoofWalk.db",
        location: "default"
      }).then(() => 
      {
        db.executeSql("CREATE TABLE IF NOT EXISTS dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon, TEXT, dogid NUMBER, affection NUMBER, fullness NUMBER, hydration NUMBER, cleanliness NUMBER)",{}). then ((data) =>
        {
          console.log("TABLE CREATED: ", data);
        }, (error) => 
        {
          console.error("Unable to execute SQL", error);
        })
      }, (error) =>
      {
        console.error("Unable to open database", error);
      });

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

			// instantiated the dogs Provider
			this.dogProvider = Dogs.getInstance();

			// adds dogs to the dog provider.  Should be removed after local storage is implemented.  Should only be used for testing.
			var listOfDogs = this.getListOfDogs();
			for(var i = 0; i < listOfDogs.length; i++) {
				this.dogProvider.addDog(listOfDogs[i]);
			}
      this.dogProvider.setActiveDog(listOfDogs[1])  //set active dog to Lucky for testing

      // instantiated the inventory Provider
      this.inventoryProvider = Inventory.getInstance();

      // adds items to the inventory provider.  Should be removed after local storage is implemented.  Should only be used for testing.
			var listOfFood = this.getFoodList();
			for(var i = 0; i < listOfFood.length; i++) {
				this.inventoryProvider.addFood(listOfFood[i]);
			}

      var listOfTreats = this.getTreatList();
			for(var i = 0; i < listOfTreats.length; i++) {
				this.inventoryProvider.addTreat(listOfTreats[i]);
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


		return [ new Dog("Lucky", "dog_brown.png", this.dogProvider.getCurrentDogId(), 13, 12, 10, 24),
             new Dog("Spot", "dog_spot.png", this.dogProvider.getCurrentDogId() + 1, 5, 16, 28, 2),
             new Dog("Daisy", "dog_goldie.png", this.dogProvider.getCurrentDogId() + 2, 10, 83, 9, 90),
             new Dog("Howard", "dog_black.png", this.dogProvider.getCurrentDogId() + 3, 25, 72, 45, 46),
             new Dog("Target", "dog_target.png", this.dogProvider.getCurrentDogId() + 4, 56, 38, 10, 82),
						 new Dog("Cerberus", "dog_demon.png", this.dogProvider.getCurrentDogId() + 5, 1, 0, 12, 13) ];
	}

  // returns a list of item objects.  Should be used for testing and until local storage is implemented.
	getFoodList()
	{
		if(this.inventoryProvider == null)
		{
			this.inventoryProvider = Inventory.getInstance();
		}

		return [ new Consumable(this.inventoryProvider.getCurrentItemId(), "Dry Food", "food_dry.png", 1, 10, "food"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Canned Food", "food_can.png", 1, 20, "food"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Bottled Water", "water_bottle.png", 15, 20, "water") ];
	}

  getTreatList()
	{
		if(this.inventoryProvider == null)
		{
			this.inventoryProvider = Inventory.getInstance();
		}

		return [ new Consumable(this.inventoryProvider.getCurrentItemId(), "Bone", "bone_normal.png", 5, 10, "treat"),
         		 new Consumable(this.inventoryProvider.getCurrentItemId(), "Fancy Bone", "bone_fancy.png", 5, 50, "treat") ];
	}

  openPage(page)
  {
    //makes it so the back button does not show.
    // this.nav.setRoot(page.component);
    this.rootPage = page;
  }
}
