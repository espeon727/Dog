// import 'rxjs/add/operator/map';

import { Dog } from '../app/app.module';

import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';

/*
  Generated class for the Dogs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class Dogs {
	private platform: Platform;

	static instance : Dogs;
	static isCreating : boolean = false;

	private dogList : Dog[] = [];
	private dogId : number = 0;

  private activeId : number;
  private activeDog : Dog;

  public database: SQLite;
  public dogs: Array<Object>;


  constructor()
	{
    this.database = new SQLite();
    this.database.openDatabase({name: "WoofWalk.db", location: "default"}).then(() =>
    {
    	alert("database loaded");
      this.readDatabase();
      if (this.activeId == null)
      {
        this.activeId = this.dogList[0].getId();
      }
    }, (error) =>
    {
      console.log("ERROR: ", error);
    });


		if(!Dogs.isCreating)
		{
			throw new Error("Improperly Instantiated Dogs");
		}

  }

  // Ensures there is only one Dogs Provider
  static getInstance() : Dogs
	{
		if(Dogs.instance == null)
		{
			Dogs.isCreating = true;
			Dogs.instance = new Dogs();
			Dogs.isCreating = false;
		}

		return Dogs.instance;
	}


  // Used by shop page to add a new dog
	addDog(dog: Dog) : void
	{
		if(this.dogId == 0)
		{
			// first dog added to array
			this.dogList = [dog];
		}
		else
		{
			// not first dog
			this.dogList.push(dog);
		}

		this.dogId += 1;
	}

  // Not to be confused with the Active Dog
	getCurrentDogId() : number {
		return this.dogId;
	}


	getNumDogs() : number {
		return this.dogList.length;
	}

	getDogById(id: number) : Dog {
    for (var i = 0; i < this.dogList.length; i++)
    {
      if ( this.dogList[i].getId() == id)
      {
        return this.dogList[i];
      }
    }
    //if no active dog, display first dog
    return this.dogList[0];
	}

	getListOfDogs() {
		return this.dogList;
	}

  getActiveDog() : Dog {
    return this.getDogById(this.activeId);
  }

  setActiveDog(dog : Dog){
    this.activeId = dog.getId();
  }


  //Adds Stock Dogs to the database for testing
  addDefaultDogs()
  {
    let string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness) VALUES ('Lucky', 'dog_brown.png', 13, 12, 10, 24)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) =>
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness) VALUES ('Spot', 'dog_spot.png', 5, 16, 28, 2)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) =>
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness) VALUES ('Daisy', 'dog_goldie.png', 2, 10, 83, 90)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) =>
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness) VALUES ('Howard', 'dog_black.png', 25, 72, 45, 46)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) =>
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness) VALUES ('Target', 'dog_target.png', 1, 56, 38, 10, 82)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) =>
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }


  // Reads a new Dog into the database
  addDogToDatabase(dog : Dog)
  {
    var dogName = dog.getName();
    var dogIcon = dog.getIcon();
    var dogAffection = dog.getAffection();
    var dogFullness = dog.getFullness();
    var dogHydration = dog.getHydration();
    var dogCleanliness = dog.getCleanliness();
    let string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness) VALUES ('" + dogName + "', " + "'" + dogIcon + "', dogAffection, dogFullness, dogHydration, dogCleanliness)";
    this.database.executeSql(string, []).then((data) =>
    {
      alert(dogName + "added");
      console.log("INSERTED: " + JSON.stringify(data));
      this.readDatabase();
    }, (error) =>
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }

  // Populates the dogList with Dogs from the SQL dog table 
  readDatabase()
  {
    this.database.executeSql("SELECT * FROM dogs", []).then((data) =>
    {
      this.dogList = [];
      if (data.rows.length > 0)
      {
        for (var i = 0; i < data.rows.length; i++)
        {
          this.dogList.push(new Dog(data.rows.item(i).name, data.rows.item(i).icon, data.rows.item(i).id, data.rows.item(i).affection, data.rows.item(i).fullness, data.rows.item(i).hydration, data.rows.item(i).cleanliness))
        }
      }
    }, (error) =>
    {
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }

  // Removes everything from the SQL dogs table
  clearDatabase()
  {
    this.database.executeSql("DELETE FROM dogs", []).then((data) =>
    {
      alert("Table: dogs cleared");
    }, (error) =>
    {
      alert("Could not clear dogs table");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    this.dogs = [];
  }

  // Modifies one stat for a Dog in the database
  // Replaces old value with new statTotal
  updateDog(statType, dogId, statTotal)
  {
    let string = "UPDATE dogs SET "  + statType + " = '" + statTotal + "' WHERE id = '" + dogId + "';";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
      this.readDatabase();
    }, (error) =>
    {
      alert("Error updating dog");
      console.log("ERROR: ", JSON.stringify(error.err));
    });

  }

  // Used for time based stat decay
  updateDatabase()
  {
    for (var i = 0; i < this.dogList.length; i++)
    {
      var dog = this.dogList[i];
      console.log("dog", dog);
      var dogID = dog.getId();
      var newAffection = dog.getAffection();
      var newFullness = dog.getFullness();
      var newHydration = dog.getHydration();
      var newCleanliness = dog.getCleanliness();

      this.updateDog("affection", dogID, newAffection);
      this.updateDog("fullness", dogID, newFullness);
      this.updateDog("hydration", dogID, newHydration);
      this.updateDog("cleanliness", dogID, newCleanliness);
    }
    console.log("Updated Database");
  }



}
