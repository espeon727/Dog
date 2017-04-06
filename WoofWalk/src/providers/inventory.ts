import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Consumable } from '../app/app.module';

/*
  Generated class for the Inventory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Inventory {

	static instance : Inventory;
	static isCreating : boolean = false;

	private foodList : Consumable[];
  private treatList : Consumable[];
	private itemId : number = 0;

  constructor()
	{
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

}
