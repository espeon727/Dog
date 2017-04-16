import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { MyApp } from './app.component';


import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HomePage } from '../pages/home/home';
import { DogsPage } from '../pages/dogs/dogs';
import { ShopPage } from '../pages/shop/shop';
import { InventoryPage } from '../pages/inventory/inventory';
import { WalkPage } from '../pages/walk/walk';
import { CameraPage } from '../pages/camera/camera';
import { DogStatsPage } from '../pages/dog-stats/dog-stats';

import { Settings } from '../providers/Settings';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DogsPage,
    ShopPage,
    InventoryPage,
    WalkPage,
    CameraPage,
    DogStatsPage


  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DogsPage,
    ShopPage,
    InventoryPage,
    WalkPage,
    CameraPage,
    DogStatsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

// This class is for the function getImagePath, which gets the appropriate path, depending on the platform, to the image with the filename name
// usage:
//     in the file you want to use it in, include the line
//         import { ImagePath } from '../app/app.module';
//     then create a private variable of the ImagePath type
//         imgpath : ImagePath = new ImagePath();
//     then all variables can be declared, getting the image path by doing
//         this.imgpath.getImagePath(...)
export class ImagePath {

  private settings: Settings;

  constructor() {
    this.settings = Settings.getInstance();
  }

  public getImagePath(file: string) : string
  {
    var result = "";

    if(this.settings.getPlatform() == "core") {
      result += "../assets/images/";
      result += file;
    } else {
      if(this.settings.getPlatform() == "android" || this.settings.getPlatform() == "ios") {
				result += "../www/assets/images/";
				result += file;
      } else {
				//unknown/unsupported platform
				throw new Error("Unknown/unsupported Platform");
      }
    }

    return result;
  }
}

export class Dog {
	// These variables are the outward facing stats of each dog.
	name: string;
	affection: number;
	fullness: number;
	hydration: number;
	cleanliness: number;

	// These variables are internal variables of each dog class.  They are not seen by the user.
	icon: string;
	id: number;

	// These dates store the times since the respective event has occured.  For the stat times, it indicates the time since it has either been increased due to some action by the user, or decreased by the the system due to the user not interacting with the dog for a period of time.
	affectionTime: Date;
	fullnessTime: Date;
	hydrationTime: Date;
	cleanlinessTime: Date;
	petTime: Date;

	constructor(name: string, icon: string, id: number, affection: number, fullness: number, hydration: number, cleanliness: number) {
		this.name = name;
		this.icon = icon;
		this.affection = affection;
		this.fullness = fullness;
		this.hydration = hydration;
		this.cleanliness = cleanliness;
		this.id = id;

		this.affectionTime = new Date();
		this.fullnessTime = new Date();
		this.hydrationTime = new Date();
		this.cleanlinessTime = new Date();
		this.petTime = new Date(2017, 0, 0);
	}

	getName() : string {
		return this.name;
	}

	getIcon() : string {
		return this.icon;
	}

	getId() : number {
		return this.id;
	}

	getAffection() : number {
		return this.affection;
	}

	setAffection(newAffection: number) : void {
		this.affection = newAffection;
	}

	getFullness() : number {
		return this.fullness;
	}

	setFullness(newFullness: number) : void {
		this.fullness = newFullness;
	}

	getHydration() : number {
		return this.hydration;
	}

	setHydration(newHydration: number) : void {
		this.hydration = newHydration;
	}

	getCleanliness() : number {
		return this.cleanliness;
	}

	setCleanliness(newCleanliness: number) : void {
		this.cleanliness = newCleanliness;
	}

	getAffectionTime() : Date {
		return this.affectionTime;
	}

	setAffectionTime(time: Date) : void {
		this.affectionTime = time;
	}

	getFullnessTime() : Date {
		return this.fullnessTime;
	}

	setFullnessTime(time: Date) : void {
		this.fullnessTime = time;
	}

	getHydrationTime() : Date {
		return this.hydrationTime;
	}

	setHydrationTime(time: Date) : void {
		this.hydrationTime = time;
	}

	getCleanlinessTime() : Date {
		return this.cleanlinessTime;
	}

	setCleanlinessTime(time: Date) : void {
		this.cleanlinessTime = time;
	}

	getPetTime() : Date {
		return this.petTime;
	}

	setPetTime(time: Date) : void {
		this.petTime = time;
	}
}


export class Item {
  id: number;
  name: string; // the name of the item
  icon: string; // the file path to the icon image
  quantity: number; // the quantity of the item that the player has in their inventory

  constructor(id: number, name: string, icon: string, quantity: number) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.quantity = quantity;
  }

  getName()
  {
    return this.name;
  }

  getIcon()
  {
    return this.icon;
  }

  getQuantity()
  {
    return this.quantity;
  }

  setQuantity(q: number)
  {
    this.quantity = q;
  }

  getType()
  {
    return "none";
  }

}

export class Consumable extends Item {
  id: number;
  name: string; // the name of the item
  icon: string; // the file path to the icon image
  quantity: number; // the quantity of the item that the player has in their inventory
  effect: number; // how effective the item is
  type: string; // what aspect of the dog the item affects

  constructor(id:number, name: string, icon: string, quantity: number, effect: number, type: string)
  {
       super(id, name, icon, quantity);
       this.effect = effect;
       this.type = type;
   }

    feedDog(fedDog: Dog)
    {
        var fullness = fedDog.getFullness();
        if (fullness >= 100)
        {
          return 0;     // mark that the dog is already full!
        }
        var newFullness = fullness + this.effect;
        if (newFullness > 100)
        {
          newFullness = 100;
        }
        fedDog.setFullness(newFullness);
        return 1;     // mark a successful feed
    }

    waterDog(wateredDog: Dog)
    {
        var hydration = wateredDog.getHydration();
        if (hydration >= 100)
        {
          return 0;     // mark that the dog is already hydrated!
        }
        var newHydration = hydration + this.effect;
        if (newHydration > 100)
        {
          newHydration = 100;
        }
        wateredDog.setHydration(newHydration);
        return 1;     // mark a successful watering

    }

    treatDog(selectedDog: Dog)
    {
      if (this.quantity > 0)
      {
        var affection = selectedDog.getAffection();
        var fullness = selectedDog.getFullness();
        var hydration = selectedDog.getHydration();
        if (affection >= 100)
        {
          return 0;     // mark that the dog is already happy!
        }
        var newAffection = affection + this.effect;
        var newFullness = fullness + (this.effect/5);
        if (newAffection > 100)
        {
          newAffection = 100;
        }
        if (newFullness > 100)
        {
          newFullness = 100;
        }
        selectedDog.setAffection(newAffection);
        return 1;     // mark a successful treat giving
      }
    }

    use(selectedDog: Dog)
    {
      if (this.quantity > 0)
      {
        if (this.type == "food")
        {
          return this.feedDog(selectedDog);
        }
        else if (this.type == "water")
        {
          return this.waterDog(selectedDog);
        }
        else if (this.type == "treat")
        {
          return this.treatDog(selectedDog);
        }
      }
    }

    getType()
    {
      return this.type;
    }


}
