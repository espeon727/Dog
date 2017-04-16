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
  private activeId : number = 0;

  public database: SQLite;
  public dogs: Array<Object>;
  

  constructor()
	{
    this.database = new SQLite();
    this.database.openDatabase({name: "WoofWalk.db", location: "default"}).then(() =>
    {
    	alert("database loaded");
      this.readDatabase();
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
		return this.dogList[id];
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
