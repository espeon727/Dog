// import 'rxjs/add/operator/map';

import { Dog } from '../app/app.module';
import { SQLite } from 'ionic-native';

/*
  Generated class for the Dogs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class Dogs {

	static instance : Dogs;
	static isCreating : boolean = false;

	private dogList : Dog[] = [];
	private dogId : number = 1;

  private activeId : number;

  public database: SQLite;
  public dogs: Array<Object>;



  constructor()
	{
    this.database = new SQLite();
    this.database.openDatabase({name: "WoofWalk.db", location: "default"}).then(() =>
    {
      this.readDatabase();
      if (this.activeId == null)
      {
        this.activeId = (this.dogList[0]).getId();
      }
    }, (error) =>
    {
      alert("Error creating dogs list");
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

  // Reads a new Dog into the database
  addDogToDatabase(dog : Dog)
  {
    var dogName = dog.getName();
    var dogIcon = dog.getIcon();
    var dogAffection = dog.getAffection();
    var dogFullness = dog.getFullness();
    var dogHydration = dog.getHydration();
    var dogCleanliness = dog.getCleanliness();

    var dogAffectionTime = dog.getAffectionTime();
    var dogFullnessTime = dog.getFullnessTime();
    var dogHydrationTime = dog.getHydrationTime();
    var dogCleanlinessTime = dog.getCleanlinessTime();
    var dogPetTime = dog.getPetTime();

    // alert(dogAffectionTime);

    //let string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness, affectionTime, fullnessTime, hydrationTime, cleanlinessTime, petTime) VALUES ('" + dogName + "', " + "'" + dogIcon + "', "  + dogAffection + ", " + dogFullness + ", " + dogHydration + ", " + dogCleanliness + ", '2017-04-23', '2017-04-23', '2017-04-23', '2017-04-23','2017-01-01')" ;
    let string = "INSERT INTO dogs (name, icon, affection, fullness, hydration, cleanliness, affectionTime, fullnessTime, hydrationTime, cleanlinessTime, petTime) VALUES ('" + dogName + "', " + "'" + dogIcon + "', "  + dogAffection + ", " + dogFullness + ", " + dogHydration + ", " + dogCleanliness + ", " + "'" + dogAffectionTime + "', " + "'" + dogFullnessTime + "', " + "'" + dogHydrationTime + "', " + "'" + dogCleanlinessTime + "', " + "'" + dogPetTime + "' )" ;
    this.database.executeSql(string, []).then((data) =>
    {
      // alert(dogName + "added");
      console.log("INSERTED: " + JSON.stringify(data));
      this.readDatabase();
    }, (error) =>
    {
      // alert("Error adding dog to database");
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
          this.dogList.push(new Dog(data.rows.item(i).name, data.rows.item(i).icon, data.rows.item(i).id, data.rows.item(i).affection, data.rows.item(i).fullness, data.rows.item(i).hydration, data.rows.item(i).cleanliness, data.rows.item(i).affectionTime, data.rows.item(i).fullnessTime, data.rows.item(i).hydrationTime, data.rows.item(i).cleanlinessTime, data.rows.item(i).petTime ))
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
      // alert("Table: dogs cleared");
    }, (error) =>
    {
      // alert("Could not clear dogs table");
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
      // alert("Error updating dog");
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

      var newAffectionTime = dog.getAffectionTime();
      var newFullnessTime = dog.getFullnessTime();
      var newHydrationTime = dog.getHydrationTime();
      var newCleanlinessTime = dog.getCleanlinessTime();
      var newPetTime = dog.getPetTime();

      this.updateDog("affection", dogID, newAffection);
      this.updateDog("fullness", dogID, newFullness);
      this.updateDog("hydration", dogID, newHydration);
      this.updateDog("cleanliness", dogID, newCleanliness);

      this.updateDog("affectionTime", dogID, newAffectionTime);
      this.updateDog("fullnessTime", dogID, newFullnessTime);
      this.updateDog("hydrationTime", dogID, newHydrationTime);
      this.updateDog("cleanlinessTime", dogID, newCleanlinessTime);
      this.updateDog("petTime", dogID, newPetTime);
    }
    console.log("Updated Database");
  }


  updateStats(dog : Dog)
  {
    var currentTime = Date.now();
    var affectionDrain = 0;
    var fullnessDrain = 0;
    var hydrationDrain = 0;
    var cleanlinessDrain = 0;

    
    affectionDrain = (currentTime - dog.getAffectionTime() ) / 4320000; //dog will lose 100 affection in 120 hours, 1 every 72 minutes
    fullnessDrain = (currentTime - dog.getFullnessTime() ) / 864000; //dog will lose 100 hunger in 24 hours, 1 every ~15 minutes
    hydrationDrain = (currentTime - dog.getHydrationTime() ) / 4320000; //dog will lose 100 hunger in 12 hours, 1 every ~7 minutes
    cleanlinessDrain = (currentTime - dog.getCleanlinessTime() ) / 2880000; //dog will lose 100 hunger in 80 hours, 1 every ~48 minutes

    affectionDrain = Math.floor(affectionDrain);
    fullnessDrain = Math.floor(fullnessDrain);
    hydrationDrain = Math.floor(hydrationDrain);
    cleanlinessDrain = Math.floor(cleanlinessDrain);

    var newAffection = dog.getAffection() - affectionDrain;
    var newFullness = dog.getFullness() - fullnessDrain;
    var newHydration = dog.getHydration() - hydrationDrain;
    var newCleanliness = dog.getCleanliness() - cleanlinessDrain;

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

    dog.setAffection(newAffection);
    dog.setFullness(newFullness);
    dog.setHydration(newHydration);
    dog.setCleanliness(newCleanliness);

    
    if (affectionDrain >= 1)
    {
      dog.setAffectionTime(currentTime);
    }
    if (fullnessDrain >= 1)
    {
      dog.setFullnessTime(currentTime);
    }
    if (hydrationDrain >= 1)
    {
      dog.setHydrationTime(currentTime);
    }
    if (cleanlinessDrain >= 1)
    {
      dog.setCleanlinessTime(currentTime);
    }

  }
}
























