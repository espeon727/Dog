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

	private dogList : Dog[];
	private dogId : number = 0;
  private activeId : number;

  public database: SQLite;
  public dogs: Array<Object>;
  

  constructor()
	{
    this.database = new SQLite();
    this.database.openDatabase({name: "WoofWalk.db", location: "default"}).then(() =>
    {
    	alert("database loaded");
      //this.addDefaultDogs();
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
			throw new Error("Improperly Instanciated Dogs");
		}

  }


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


  //For Testing purposes
  addDefaultDogs()
  {
    let string = "INSERT INTO dogs (name, icon, dogid, affection, fullness, hydration, cleanliness) VALUES ('Lucky', 'dog_brown.png', 1, 13, 12, 10, 24)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => 
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, dogid, affection, fullness, hydration, cleanliness) VALUES ('Spot', 'dog_spot.png', 1, 5, 16, 28, 2)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => 
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, dogid, affection, fullness, hydration, cleanliness) VALUES ('Daisy', 'dog_goldie.png', 1, 2, 10, 83, 90)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => 
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, dogid, affection, fullness, hydration, cleanliness) VALUES ('Howard', 'dog_black.png', 1, 25, 72, 45, 46)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => 
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
    string = "INSERT INTO dogs (name, icon, dogid, affection, fullness, hydration, cleanliness) VALUES ('Target', 'dog_target.png', 1, 56, 38, 10, 82)";
    this.database.executeSql(string, []).then((data) =>
    {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => 
    {
      alert("Error adding dog to database");
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }


  addDogToDatabase(dogName, dogIcon, dogId)
  {
    let string = "INSERT INTO dogs (name, icon, dogid, affection, fullness, hydration, cleanliness) VALUES ('" + dogName + "', " + "'" + dogIcon + "', " + "1, 0, 100, 100, 100)";
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
      alert(data);
    }, (error) => 
    {
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }

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



}
