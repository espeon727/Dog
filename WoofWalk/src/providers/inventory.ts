import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Consumable } from '../app/app.module';

import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';

/*
  Generated class for the Inventory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Inventory {

	static instance : Inventory;
	static isCreating : boolean = false;

  private puppyPoints : number = 0;
	private foodList : Consumable[];
  private treatList : Consumable[];
	private itemId : number = 0;

	public database: SQLite;


  constructor()
	{
		this.database = new SQLite();
    this.database.openDatabase({name: "WoofWalk.db", location: "default"}).then(() =>
    {
    	alert("database loaded");
      this.readDatabaseFood();
      this.readDatabaseTreats();
    }, (error) =>
    {
      console.log("ERROR: ", error);
    });

		if(!Inventory.isCreating)
		{
			throw new Error("Improperly Instantiated Inventory");
		}
  }

	static getInstance() : Inventory
	{
		if(Inventory.instance == null)
		{
			Inventory.isCreating = true;
			Inventory.instance = new Inventory();
			Inventory.isCreating = false;
		}

		return Inventory.instance;
	}

  getPuppyPoints() : number
  {
    return this.puppyPoints;
  }

  setPuppyPoints(points : number) : void
  {
    this.puppyPoints = points;
  }

	addFood(food: Consumable) : void
	{
		if(this.itemId == 0 || (this.foodList.length) == 0)
		{
			// first item added to array
			this.foodList = [food];
		}
		else
		{
			// not first item
			this.foodList.push(food);
		}
		this.itemId += 1;
	}

  addTreat(treat: Consumable) : void
	{
		if(this.itemId == 0 || this.treatList == undefined)
		{
			// first item added to array
			this.treatList = [treat];
		}
		else
		{
			// not first item
			this.treatList.push(treat);
		}
		this.itemId += 1;
	}

	getCurrentItemId() : number
  {
		return this.itemId;
	}

  getNumFood() : number {
    return this.foodList.length;
  }

  getNumTreats() : number
  {
    return this.treatList.length;
  }

  getListOfFood = (): Consumable[] =>
  {
    console.log("food list being fetched");
    return this.foodList;
  }

  getListOfTreats = (): Consumable[] =>
  {
    console.log("treat list being fetched");
    return this.treatList;
  }

  readDatabaseFood()
  {
    this.database.executeSql("SELECT * FROM food", []).then((data) =>
    {
      this.foodList = [];
      if (data.rows.length > 0)
      {
        for (var i = 0; i < data.rows.length; i++)
        {
          this.foodList.push(new Consumable(data.rows.item(i).id, data.rows.item(i).name, data.rows.item(i).icon, data.rows.item(i).quantity, data.rows.item(i).cost, data.rows.item(i).description, data.rows.item(i).effect, data.rows.item(i).type) );
        }
      }
  
    }, (error) =>
    {
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }

  readDatabaseTreats()
  {
    this.database.executeSql("SELECT * FROM treats", []).then((data) =>
    {
      this.treatList = [];
      if (data.rows.length > 0)
      {
        for (var i = 0; i < data.rows.length; i++)
        {
          this.treatList.push(new Consumable(data.rows.item(i).id, data.rows.item(i).name, data.rows.item(i).icon, data.rows.item(i).quantity, data.rows.item(i).cost, data.rows.item(i).description, data.rows.item(i).effect, data.rows.item(i).type) );
        }
      }
    
    }, (error) =>
    {
      console.log("ERROR: ", JSON.stringify(error.err));
    });
  }


  updateItem(itemType, itemId, itemQuantity)
  {
  	if (itemType == 'food' || itemType == 'water')
  	{
  		let string = "UPDATE food SET quantity = '" + itemQuantity + "' WHERE id = '" + itemId + "';";
  		this.database.executeSql(string, []).then((data) =>
	    {
	      console.log("INSERTED: " + JSON.stringify(data));
	      this.readDatabaseFood();
	    }, (error) =>
	    {
	      alert("Error updating item");
	      console.log("ERROR: ", JSON.stringify(error.err));
	    });
  	} 
  	if (itemType == 'treat')
  	{
  		let string = "UPDATE treats SET quantity = '" + itemQuantity + "' WHERE id = '" + itemId + "';";
  		this.database.executeSql(string, []).then((data) =>
	    {
	      console.log("INSERTED: " + JSON.stringify(data));
	      this.readDatabaseTreats();
	    }, (error) =>
	    {
	      alert("Error updating item");
	      console.log("ERROR: ", JSON.stringify(error.err));
	    });
  	}
  }

}
