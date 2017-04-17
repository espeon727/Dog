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
import { ItemDetailsPage } from '../pages/item-details/item-details';

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
    DogStatsPage,
    ItemDetailsPage

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
    DogStatsPage,
    ItemDetailsPage
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
	// These variables represent the outward facing stats of each dog.
	private name: string;
	private affection: number;
	private fullness: number;
	private hydration: number;
	private cleanliness: number;

	// These variables are internal variables of each dog class.  They are not seen by the user.
	private icon: string;
	private id: number;

	// These dates store the times since the respective event has occurred.  For the stat times, it indicates the time since it has either been increased due to some action by the user, or decreased by the the system due to the user not interacting with the dog for a period of time.
	private affectionTime: Date;
	private fullnessTime: Date;
	private hydrationTime: Date;
	private cleanlinessTime: Date;
	private petTime: Date;

	constructor(name: string, icon: string, id: number, affection: number, fullness: number, hydration: number, cleanliness: number) {
		this.name = name;
		this.icon = icon;
		this.affection = this.enforceStatBounds(affection);
		this.fullness = this.enforceStatBounds(fullness);
		this.hydration = this.enforceStatBounds(hydration);
		this.cleanliness = this.enforceStatBounds(cleanliness);
		this.id = id;

		this.affectionTime = new Date();
		this.fullnessTime = new Date();
		this.hydrationTime = new Date();
		this.cleanlinessTime = new Date();
		this.petTime = new Date(2017, 0, 0);
	}

	enforceStatBounds(stat: number) : number {
		if(stat > 100) {
			alert("Tried to set stat to " + stat + ". Setting stat to 100.");
			console.log("Tried to set stat to " + stat + ". Setting stat to 100.");
			return 100;
		}
		if(stat < 0) {
			alert("Tried to set stat to " + stat + ".  Setting stat to 0.");
			console.log("Tried to set stat to " + stat + ". Setting stat to 0.");
			return 0;
		}

		return stat;
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
		this.affection = this.enforceStatBounds(newAffection);
	}

	getFullness() : number {
		return this.fullness;
	}

	setFullness(newFullness: number) : void {
		this.fullness = this.enforceStatBounds(newFullness);
	}

	getHydration() : number {
		return this.hydration;
	}

	setHydration(newHydration: number) : void {
		this.hydration = this.enforceStatBounds(newHydration);
	}

	getCleanliness() : number {
		return this.cleanliness;
	}

	setCleanliness(newCleanliness: number) : void {
		this.cleanliness = this.enforceStatBounds(newCleanliness);
	}

	getAffectionTime() : Date {
		return this.affectionTime;
	}

	setAffectionTime(time: number) : void {
		this.affectionTime.setTime(time);
	}

	getFullnessTime() : Date {
		return this.fullnessTime;
	}

	setFullnessTime(time: number) : void {
		this.fullnessTime.setTime(time);
	}

	getHydrationTime() : Date {
		return this.hydrationTime;
	}

	setHydrationTime(time: number) : void {
		this.hydrationTime.setTime(time);
	}

	getCleanlinessTime() : Date {
		return this.cleanlinessTime;
	}

	setCleanlinessTime(time: number) : void {
		this.cleanlinessTime.setTime(time);
	}

	getPetTime() : Date {
		return this.petTime;
	}

	setPetTime(time: number) : void {
		this.petTime.setTime(time);
	}
}


export class Item {
  id: number;
  name: string; // the name of the item
  icon: string; // the file path to the icon image
  quantity: number; // the quantity of the item that the player has in their inventory
  cost: number; // amount item costs in the shop
  description: string; // description of the item

  constructor(id: number, name: string, icon: string, quantity: number, cost: number, description: string) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.quantity = quantity;
    this. cost = cost;
    this.description = description;
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

  getCost()
  {
    return this.cost;
  }

}

export class Consumable extends Item {
  id: number;
  name: string; // the name of the item
  icon: string; // the file path to the icon image
  quantity: number; // the quantity of the item that the player has in their inventory
  cost: number; // amount item costs in the shop
  description: string; // description of the item
  effect: number; // how effective the item is
  type: string; // what aspect of the dog the item affects

  constructor(id:number, name: string, icon: string, quantity: number, cost: number, description: string, effect: number, type: string)
  {
       super(id, name, icon, quantity, cost, description);
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
        console.log("prv feed time: ", fedDog.getFullnessTime());
        fedDog.setFullness(newFullness);
        fedDog.setFullnessTime(Date.now());
        console.log("new feed time: ", fedDog.getFullnessTime());
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
        console.log("prv water time: ", wateredDog.getHydrationTime());
        wateredDog.setHydration(newHydration);
        wateredDog.setHydrationTime(Date.now());
        console.log("new water time: ", wateredDog.getHydrationTime());
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
        console.log("prv affection time: ", selectedDog.getAffectionTime());
        selectedDog.setAffection(newAffection);
        selectedDog.setAffectionTime(Date.now());
        console.log("new affection time: ", selectedDog.getAffectionTime());
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
