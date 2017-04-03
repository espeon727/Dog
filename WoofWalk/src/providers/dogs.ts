// import 'rxjs/add/operator/map';

import { Dog } from '../app/app.module';

/*
  Generated class for the Dogs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class Dogs {

	static instance : Dogs;
	static isCreating : boolean = false;

	private dogList : Dog[];
	private dogId : number = 0;
	
  constructor()
	{
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

}
