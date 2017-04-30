import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

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

  constructor()
  {
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

// This class is used to store and manage details about Dogs; it is used to create a dog object
//     in the file you want to use it in, include the line
//         import { Dog } from '../app/app.module';

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

  /*
	constructor(name: string, icon: string, id: number, affection: number, fullness: number, hydration: number, cleanliness: number)
  {
		this.name = name;
		this.icon = icon;
		this.affection = this.enforceStatBounds(affection);
		this.fullness = this.enforceStatBounds(fullness);
		this.hydration = this.enforceStatBounds(hydration);
		this.cleanliness = this.enforceStatBounds(cleanliness);
		this.id = id;

    // stat times are initialized to the current time to avoid unnecessary stat decay
    // pet time is set to well before the public release so users may pet their dogs right away
		this.affectionTime = new Date();
		this.fullnessTime = new Date();
		this.hydrationTime = new Date();
		this.cleanlinessTime = new Date();
		this.petTime = new Date(2017, 0, 0);
	}
  */

  constructor(name: string, icon: string, id: number, affection: number, fullness: number, hydration: number, cleanliness: number, affectionTime: Date, fullnessTime: Date, hydrationTime: Date, cleanlinessTime: Date, petTime: Date)
  {
    this.name = name;
    this.icon = icon;
    this.affection = this.enforceStatBounds(affection);
    this.fullness = this.enforceStatBounds(fullness);
    this.hydration = this.enforceStatBounds(hydration);
    this.cleanliness = this.enforceStatBounds(cleanliness);
    this.id = id;

    this.affectionTime = affectionTime;
    this.fullnessTime = fullnessTime;
    this.hydrationTime = hydrationTime;
    this.cleanlinessTime = cleanlinessTime;
    this.petTime = petTime;
  }

  //this function prevents dog stats from being set below 0 or above 100
	enforceStatBounds(stat: number) : number
  {
		if(stat > 100)
    {
			// alert("Tried to set stat to " + stat + ". Setting stat to 100.");
			console.log("Tried to set stat to " + stat + ". Setting stat to 100.");
			return 100;
		}
		if(stat < 0)
    {
			// alert("Tried to set stat to " + stat + ".  Setting stat to 0.");
			console.log("Tried to set stat to " + stat + ". Setting stat to 0.");
			return 0;
		}

		return stat;
	}

  // gets the name of the dog as a string
	getName() : string
  {
		return this.name;
	}

  // sets the name of the dog - this should only be called when naming a dog for the first time
	setName(newName: string) : void
  {
		this.name = newName;
	}

  // gets the filename of the dog's image as a string. Should be used to get arguments for getImagePath
	getIcon() : string
  {
		return this.icon;
	}

  // sets a different string as the dog's filename - will not check if filename exists before setting! Be careful to avoid broken images!
	setIcon(newIcon: string) : void
  {
		this.icon = newIcon;
	}

  // returns the dog's unique ID - unlike name, this cannot be reused between dogs or changed.
	getId() : number
  {
		return this.id;
	}

  // return the dog's affection stat as a number
	getAffection() : number
  {
		return this.affection;
	}

  // set the dog's affection stat to the passed number, if in bounds
	setAffection(newAffection: number) : void
  {
		this.affection = this.enforceStatBounds(newAffection);
	}

  // return the dog's fullness stat as a number
	getFullness() : number
  {
		return this.fullness;
	}

  // set the dog's fullness stat to the passed number, if in bounds
	setFullness(newFullness: number) : void
  {
		this.fullness = this.enforceStatBounds(newFullness);
	}

  // get the dog's hydration stat as a number
	getHydration() : number
  {
		return this.hydration;
	}

  // set the dog's hydration stat to the passed number, if in bounds
	setHydration(newHydration: number) : void
  {
		this.hydration = this.enforceStatBounds(newHydration);
	}

  // get the dog's cleanliness stat as a number
	getCleanliness() : number
  {
		return this.cleanliness;
	}

  // set the dog's cleanliness stat to the passed number, if in bounds
	setCleanliness(newCleanliness: number) : void
  {
		this.cleanliness = this.enforceStatBounds(newCleanliness);
	}

  // get the time the dog's affection stat was last updated as a Date object
	getAffectionTime() : Date
  {
		return this.affectionTime;
	}

  // set the last time the dog's affection stat was updated to the passed Date object
	setAffectionTime(date : Date ) : void
  {
		this.affectionTime = date;
	}

  // get the time the dog's fullness stat was last updated as a Date object
	getFullnessTime() : Date
  {
		return this.fullnessTime;
	}

  // set the last time the dog's fullness stat was updated to the passed Date object
	setFullnessTime(date : Date) : void
  {
		this.fullnessTime = date;
	}

  // get the time the dog's hydration stat was last updated as a Date object
	getHydrationTime() : Date
  {
		return this.hydrationTime;
	}

  // set the last time the dog's hydration stat was updated to the passed Date object
	setHydrationTime(date : Date) : void
  {
		this.hydrationTime = date;
	}

  // get the time the dog's cleanliness stat was last updated as a Date object
	getCleanlinessTime() : Date
  {
		return this.cleanlinessTime;
	}

  // set the last time the dog's cleanliness stat was updated to the passed Date object
	setCleanlinessTime(date : Date) : void
  {
		this.cleanlinessTime = date;
	}

  // get the time the dog was last pet as a Date object
	getPetTime() : Date
  {
		return this.petTime;
	}

  // set the last time the dog was pet to the passed Date object
	setPetTime(time: number) : void
  {
		this.petTime.setTime(time);
	}

  // update the dog's stats and calculate the decay from when it was last checked or updated
  updateStats()
  {
    var currentTime = new Date();
    var affectionDrain = 0;
    var fullnessDrain = 0;
    var hydrationDrain = 0;
    var cleanlinessDrain = 0;
    if (this.affectionTime===undefined || this.fullnessTime===undefined || this.hydrationTime===undefined || this.cleanlinessTime===undefined)
    {
      affectionDrain = (currentTime.getTime() - this.affectionTime.getTime()) / 4320000; //dog will lose 100 affection in 120 hours, 1 every 72 minutes
      fullnessDrain = (currentTime.getTime() - this.fullnessTime.getTime()) / 864000; //dog will lose 100 hunger in 24 hours, 1 every ~15 minutes
      hydrationDrain = (currentTime.getTime() - this.hydrationTime.getTime()) / 432000; //dog will lose 100 hunger in 12 hours, 1 every ~7 minutes
      cleanlinessDrain = (currentTime.getTime() - this.cleanlinessTime.getTime()) / 2880000; //dog will lose 100 hunger in 80 hours, 1 every ~48 minutes
    }

    affectionDrain = Math.floor(affectionDrain);
    fullnessDrain = Math.floor(fullnessDrain);
    hydrationDrain = Math.floor(hydrationDrain);
    cleanlinessDrain = Math.floor(cleanlinessDrain);

    var newAffection = this.getAffection() - affectionDrain;
    var newFullness = this.getFullness() - fullnessDrain;
    var newHydration = this.getHydration() - hydrationDrain;
    var newCleanliness = this.getCleanliness() - cleanlinessDrain;

    if (newAffection < 0)
    {
      newAffection = 0;
    }
    if (newFullness < 0)
    {
      newFullness = 0;
    }
    if (newHydration < 0)
    {
      newHydration = 0;
    }
    if (newCleanliness < 0)
    {
      newCleanliness = 0;
    }

    this.setAffection(newAffection);
    this.setFullness(newFullness);
    this.setHydration(newHydration);
    this.setCleanliness(newCleanliness);

    if (affectionDrain >= 1)
    {
      this.affectionTime = currentTime;
    }
    if (fullnessDrain >= 1)
    {
      this.fullnessTime = currentTime;
    }
    if (hydrationDrain >= 1)
    {
      this.hydrationTime = currentTime;
    }
    if (cleanlinessDrain >= 1)
    {
      this.cleanlinessTime = currentTime;
    }

  }
}

// This class is used to store and manage details about Items; it is used to create a dog object
//     in the file you want to use it in, include the line
//         import { Item } from '../app/app.module';
export class Item {
  id: number;
  name: string;       // the name of the item
  icon: string;       // the file path to the icon image
  quantity: number;   // the quantity of the item that the player has in their inventory
  cost: number;       // amount item costs in the shop
  description: string; // description of the item

  constructor(id: number, name: string, icon: string, quantity: number, cost: number, description: string)
  {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.quantity = quantity;
    this. cost = cost;
    this.description = description;
  }

  // return the item's unique ID as a number
  getId()
  {
    return this.id;
  }

  // return the name of the item as a string
  getName()
  {
    return this.name;
  }

  // return the filename of the item's icon as a string. This should be used to get arguments for getImagePath
  getIcon()
  {
    return this.icon;
  }

  // return the quantity of the item as a number
  getQuantity()
  {
    return this.quantity;
  }

  // set the quantity of the item to the passed number
  setQuantity(q: number)
  {
    this.quantity = q;
  }

  // return the cost of an item as a number
  getCost()
  {
    return this.cost;
  }

  //return the description of the item as a string
  getDescription()
  {
    return this.description;
  }

}

// This class is used to store and manage details about Consumable Items; it inherits from the item class
//     in the file you want to use it in, include the line
//         import { Consumable } from '../app/app.module';
export class Consumable extends Item {
  id: number;
  name: string;         // the name of the item
  icon: string;         // the file path to the icon image
  quantity: number;     // the quantity of the item that the player has in their inventory
  cost: number;         // amount item costs in the shop
  description: string;  // description of the item
  effect: number;       // how effective the item is
  type: string;         // what aspect of the dog the item affects

  constructor(id:number, name: string, icon: string, quantity: number, cost: number, description: string, effect: number, type: string)
  {
       super(id, name, icon, quantity, cost, description);
       this.effect = effect;
       this.type = type;
   }

   // use the item to feed the Dog. This function should not be called outside of use()! return a bool of success (1) or failure (0)
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
        fedDog.setFullnessTime(new Date());
        console.log("new feed time: ", fedDog.getFullnessTime());
        return 1;     // mark a successful feed
    }

    // use the item to give water to the Dog. This function should not be called outside of use()! return a bool of success (1) or failure (0)
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
        wateredDog.setHydrationTime(new Date());
        console.log("new water time: ", wateredDog.getHydrationTime());
        return 1;     // mark a successful watering

    }

    // use the item to treat the Dog. This function should not be called outside of use()! return a bool of success (1) or failure (0)
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
        selectedDog.setAffectionTime(new Date());
        console.log("new affection time: ", selectedDog.getAffectionTime());
        return 1;     // mark a successful treat giving
      }
    }

    // use the item to clean the Dog. This function should not be called outside of use()! return a bool of success (1) or failure (0)
    cleanDog(cleanedDog: Dog)
    {
        var cleanliness = cleanedDog.getCleanliness();
        if (cleanliness >= 100)
        {
          return 0;     // mark that the dog is already clean!
        }
        var newCleanliness = cleanliness + this.effect;
        if (newCleanliness > 100)
        {
          newCleanliness = 100;
        }
        console.log("prv cleaning time: ", cleanedDog.getCleanlinessTime());
        cleanedDog.setCleanliness(newCleanliness);
        cleanedDog.setCleanlinessTime(new Date());
        console.log("new cleaning time: ", cleanedDog.getCleanlinessTime());
        return 1;     // mark a successful cleaning

    }


    // use the item on the passed Dog. return a bool of success (1) or failure (0)
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
        else if (this.type == "clean")
        {
          return this.cleanDog(selectedDog);
        }
      }
    }

    // returns the type of consumable item the item is as a string - "food", "water", "treat", etc
    getType()
    {
      return this.type;
    }

    // return the item's effectiveness (how many stat points it restores) as a number
    getEffect()
    {
      return this.effect;
    }

}
