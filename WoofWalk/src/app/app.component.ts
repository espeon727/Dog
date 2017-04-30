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

      //create DB
      let db = new SQLite();
      db.openDatabase(
      {
        name: "WoofWalk.db",
        location: "default"
      }).then(() =>
      {
        // create "dogs" table in db and populate with defaults
        var now = Date.now();
        var luckyString = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness, affectionTime, fullnessTime, hydrationTime, cleanlinessTime, petTime) VALUES ('Lucky', 'dog_brown.png', 13, 12, 10, 24, " + now + ", " + now + ", " + now + ", " + now + ", '2017-01-01');";
        var spotString = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness, affectionTime, fullnessTime, hydrationTime, cleanlinessTime, petTime) VALUES ('Spot', 'dog_spot.png', 5, 16, 28, 2, " + now + ", " + now + ", " + now + ", " + now + ", '2017-01-01');";
        db.executeSql("CREATE TABLE IF NOT EXISTS dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, affection NUMBER, fullness NUMBER, hydration NUMBER, cleanliness NUMBER, affectionTime NUMBER, fullnessTime NUMBER, hydrationTime NUMBER, cleanlinessTime NUMBER, petTime DATE);",{}). then ((data) =>
        {
          // alert("dogs table made");
          console.log("TABLE CREATED: ", data);

          db.executeSql("SELECT * FROM dogs",{}). then ((data) =>
          {
            if (data.rows.length < 2)
            {
              db.executeSql(luckyString,{}). then ((data) =>
              {
                console.log("TABLE CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert dog");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql(spotString,{}). then ((data) =>
              {
                console.log("TABLE CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert dog");
                console.error("Unable to execute SQL", error);
              });
            }
            else
            {
              // alert(data.rows.length);
            }

        }, (error) =>
        {
          // alert("could not make dog table");
          console.error("Unable to execute SQL", error);
        });



        // create "treats" table in DB and populate
        db.executeSql("CREATE TABLE IF NOT EXISTS treats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, quantity NUMBER, cost NUMBER, description TEXT, effect NUMBER, type TEXT);",{}). then ((data) =>
        {
          // alert("treats table made");
          console.log("TABLE CREATED: ", data);

          db.executeSql("SELECT * FROM treats",{}). then ((data) =>
          {
            if (data.rows.length < 5)
            {
              db.executeSql("INSERT INTO treats (name, icon, quantity, cost, description, effect, type) VALUES ('Bone', 'bone_normal.png', 5, 10, 'A tasty bone, gives 10 affection', 10, 'treat');",{}). then ((data) =>
              {
                // alert("added bone");
                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert treat");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO treats (name, icon, quantity, cost, description, effect, type) VALUES ('Fancy Bone', 'bone_fancy.png', 5, 45, 'A fancy bone, gives 50 affection', 50, 'treat');",{}). then ((data) =>
              {
                // alert("added fancy bone");
                console.log("TREAT CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert treat");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO treats (name, icon, quantity, cost, description, effect, type) VALUES ('Rope Toy', 'rope.png', 2, 65, 'A woven rope toy to play tug of war, adds 75 affection', 75, 'treat');",{}). then ((data) =>
              {
                // alert("added rope toy");
                console.log("TREAT CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert treat");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO treats (name, icon, quantity, cost, description, effect, type) VALUES ('Peanut Butter', 'peanut_butter.png', 1, 125, 'A jar of healthy and tasty peanut butter, maxes out affection', 100, 'treat');",{}). then ((data) =>
              {
                // alert("added peanut butter");
                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert treat");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO treats (name, icon, quantity, cost, description, effect, type) VALUES ('Toy Ball', 'ball.png', 2, 10, 'An inflatable squeaky ball, gives 10 affection', 10, 'treat');",{}). then ((data) =>
              {
                // alert("added toy ball");
                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert treat");
                console.error("Unable to execute SQL", error);
              });
            }
          });

          }, (error) =>
          {
            // alert("could not make treats table");
            console.error("Unable to execute SQL", error);
          });

        // create "clean" table in DB and populate
        db.executeSql("CREATE TABLE IF NOT EXISTS clean (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, quantity NUMBER, cost NUMBER, description TEXT, effect NUMBER, type TEXT);",{}). then ((data) =>
        {
          // alert("clean table made");
          console.log("TABLE CREATED: ", data);

          db.executeSql("SELECT * FROM clean",{}). then ((data) =>
          {
            if (data.rows.length < 1)
            {
              db.executeSql("INSERT INTO clean (name, icon, quantity, cost, description, effect, type) VALUES ('Fragile Brush', 'brush.png', 5, 25, 'An easily broken brush, gives 25 cleanliness', 25, 'clean');",{}). then ((data) =>
              {
                // alert("added brush");
                console.log("CLEANER CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert clean");
                console.error("Unable to execute SQL", error);
              });
            }
          });

          }, (error) =>
          {
            // alert("could not make clean table");
            console.error("Unable to execute SQL", error);
          });

        // create "misc" table in DB and populate
        db.executeSql("CREATE TABLE IF NOT EXISTS misc (id INTEGER PRIMARY KEY AUTOINCREMENT, puppyPoints NUMBER);",{}). then ((data) =>
        {
          // alert("treats table made");
          console.log("TABLE CREATED: ", data);

          db.executeSql("SELECT * FROM misc",{}). then ((data) =>
          {
            if (data.rows.length < 2)
            {
              db.executeSql("INSERT INTO misc(puppyPoints) VALUES (1000);",{}). then ((data) =>
              {
                // alert("added puppy points");
                console.log("MISC CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert puppy points");
                console.error("Unable to execute SQL", error);
              });

            }
          });

          }, (error) =>
          {
            // alert("could not make treats table");
            console.error("Unable to execute SQL", error);
          });

        // create "food" table in DB and populate
        db.executeSql("CREATE TABLE IF NOT EXISTS food (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, quantity NUMBER, cost NUMBER, description TEXT, effect NUMBER, type TEXT);",{}). then ((data) =>
        {
          // alert("food table made");
          console.log("TABLE CREATED: ", data);

          db.executeSql("SELECT * FROM food",{}). then ((data) =>
          {
            if (data.rows.length < 2)
            {
              db.executeSql("INSERT INTO food (name, icon, quantity, cost, description, effect, type) VALUES ('Dry Food', 'food_dry.png', 2, 5, 'Dry food, increases fullness by 10', 10, 'food');",{}). then ((data) =>
              {

                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert food");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO food (name, icon, quantity, cost, description, effect, type) VALUES ('Canned Food', 'food_can.png', 1, 9, 'Canned food, increases fullness by 20', 20, 'food');",{}). then ((data) =>
              {

                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert food");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO food (name, icon, quantity, cost, description, effect, type) VALUES ('Bottled Water', 'water_bottle.png', 15, 0, 'Bottled Water, increases hydration by 20', 20, 'water');",{}). then ((data) =>
              {

                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert food");
                console.error("Unable to execute SQL", error);
              });

              db.executeSql("INSERT INTO food (name, icon, quantity, cost, description, effect, type) VALUES ('Spring Water', 'water_bottle.png', 1, 1000, 'Spring Water, increases hydration by 20', 20, 'water');",{}). then ((data) =>
              {

                console.log("FOOD CREATED: ", data);
              }, (error) =>
              {
                // alert("could not insert food");
                console.error("Unable to execute SQL", error);
              });
            }
          });

          }, (error) =>
          {
            // alert("could not make food table");
            console.error("Unable to execute SQL", error);
          });



        }, (error) =>
        {
          console.error("Unable to execute SQL", error);
        });



      }, (error) =>
      {
        console.error("Unable to open database", error);
      });

      this.settings = Settings.getInstance();

      //check and setting platform to ensure correct image paths
      if(platform.is("android"))
      {
				this.settings.setPlatform("android");
      } else
      {
				if(platform.is("ios"))
        {
					this.settings.setPlatform("ios");
				} else
        {
					if(platform.is("core"))
          {
						this.settings.setPlatform("core");
					} else
          {
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
			for(var i = 0; i < listOfDogs.length; i++)
      {
				this.dogProvider.addDog(listOfDogs[i]);
			}
      this.dogProvider.setActiveDog(listOfDogs[0])  //set active dog to Lucky for testing

      // instantiated the inventory Provider
      this.inventoryProvider = Inventory.getInstance();

      // adds items to the inventory provider.  Should be removed after local storage is implemented.  Should only be used for testing.
			var listOfFood = this.getFoodList();
			for(var i = 0; i < listOfFood.length; i++)
      {
				this.inventoryProvider.addFood(listOfFood[i]);
			}

      var listOfTreats = this.getTreatList();
			for(var i = 0; i < listOfTreats.length; i++)
      {
				this.inventoryProvider.addTreat(listOfTreats[i]);
			}

      var brushItem = new Consumable(this.inventoryProvider.getCurrentItemId(), 'Fragile Brush', 'brush.png', 5, 25, 'An easily broken brush, gives 25 cleanliness', 25, 'clean');
      this.inventoryProvider.addClean(brushItem);

      this.inventoryProvider.setPuppyPoints(500); //give users 500 puppy points to begin with

    });
  }

	// returns a list of dog objects.  Should be used for testing and until local storage is implemented.
	getListOfDogs()
	{
		if(this.dogProvider == null)
		{
			this.dogProvider = Dogs.getInstance();
		}


		return [ new Dog("Lucky", "dog_brown.png", this.dogProvider.getCurrentDogId(), 13, 12, 10, 24, new Date(), new Date(), new Date(), new Date(), new Date(2017, 0, 0) ),
             new Dog("Spot", "dog_spot.png", this.dogProvider.getCurrentDogId() + 1, 5, 16, 28, 2, new Date(), new Date(), new Date(), new Date(), new Date(2017, 0, 0) ),
             new Dog("Daisy", "dog_goldie.png", this.dogProvider.getCurrentDogId() + 2, 10, 83, 9, 90, new Date(), new Date(), new Date(), new Date(), new Date(2017, 0, 0) ),
             new Dog("Howard", "dog_black.png", this.dogProvider.getCurrentDogId() + 3, 25, 72, 45, 46, new Date(), new Date(), new Date(), new Date(), new Date(2017, 0, 0) ),
             new Dog("Target", "dog_target.png", this.dogProvider.getCurrentDogId() + 4, 56, 38, 10, 82, new Date(), new Date(), new Date(), new Date(), new Date(2017, 0, 0) ),
						 new Dog("Cerberus", "dog_demon.png", this.dogProvider.getCurrentDogId() + 5, 1, 0, 12, 13, new Date(), new Date(), new Date(), new Date(), new Date(2017, 0, 0) ) ];
	}

  // returns a list of food item objects.  Should be used for testing and until local storage is implemented.
	getFoodList()
	{
		if(this.inventoryProvider == null)
		{
			this.inventoryProvider = Inventory.getInstance();
		}

		return [ new Consumable(this.inventoryProvider.getCurrentItemId(), "Dry Food", "food_dry.png", 1, 5, "dry food, adds 10 fullness", 10, "food"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Canned Food", "food_can.png", 1, 9, "food in a can, adds 20 fullness", 20, "food"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Bottled Water", "water_bottle.png", 15, 0, "a bottle of water, adds 20 hydration", 20, "water"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Spring Water", "water_bottle.png", 15, 1000, "a fancier bottle of water, adds 20 hydration", 20, "water")];
	}

  // returns a list of treat item objects.  Should be used for testing and until local storage is implemented.
  getTreatList()
	{
		if(this.inventoryProvider == null)
		{
			this.inventoryProvider = Inventory.getInstance();
		}

		return [ new Consumable(this.inventoryProvider.getCurrentItemId(), "Bone", "bone_normal.png", 5, 10, "a tasty bone, gives 10 affection" , 10, "treat"),
         		 new Consumable(this.inventoryProvider.getCurrentItemId(), "Fancy Bone", "bone_fancy.png", 5, 45, "a fancy bone, gives 50 affection", 50, "treat"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Rope Toy", "rope.png", 2, 65, "a woven rope toy to play tug of war, adds 75 affection", 75, "treat"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Peanut Butter", "peanut_butter.png", 1, 125, "a jar of healthy and tasty peanut butter, maxes out affection", 100, "treat"),
             new Consumable(this.inventoryProvider.getCurrentItemId(), "Toy Ball", "ball.png", 2, 10, "an inflatable squeaky ball, adds 10 affection", 10, "treat")];
	}

  openPage(page)
  {
    //makes it so the back button does not show.
    // this.nav.setRoot(page.component);
    this.rootPage = page;
  }
}
