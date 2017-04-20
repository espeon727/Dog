import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Item, Consumable, Dog } from '../../app/app.module';
import { ImagePath } from '../../app/app.module';

import { Inventory } from '../../providers/inventory';
import { Dogs } from '../../providers/Dogs';


/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage {

  private imgPath: ImagePath = new ImagePath();
  private items: Inventory = Inventory.getInstance();
	private dogs: Dogs = Dogs.getInstance();
	private randomDogList: Dog[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)
  {
		this.randomDogList = this.showRandomDogs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
		this.randomDogList = this.showRandomDogs();
  }

  showItems() : Consumable[]
  {
    var food = this.items.getListOfFood();
    var treats = this.items.getListOfTreats();
    var allItems = food.concat(treats);
    return allItems;
  }

  getItemImage(oneItem)
  {
    return this.imgPath.getImagePath(oneItem.getIcon());
  }

  confirmBuyAlert(oneItem : Item)
  {
    let confirm = this.alertCtrl.create({
      title: 'Buy 1 ' + oneItem.getName() + '?',
      message: oneItem.getDescription(),
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.buyItem(oneItem);
          }
        }
      ]
    });
    confirm.present()
  }

  buyItem(oneItem)
  {
    var availablePoints = this.items.getPuppyPoints();
    var itemCost = oneItem.getCost();
    if (itemCost <= availablePoints)
    {
      this.didBuyAlert(oneItem);
      console.log("buy item alert");
      var newPoints = availablePoints - itemCost;
      this.items.setPuppyPoints(newPoints);
      var current = oneItem.getQuantity();
      oneItem.setQuantity(current + 1);

      this.items.updateItem(oneItem.getType, oneItem.getId(), oneItem.getQuantity() + 1);

    }
    else
    {
      this.noMoneyAlert(oneItem);
      console.log("you don't have money alert");
    }
  }

  didBuyAlert(oneItem : Item)
  {
    let confirm = this.alertCtrl.create({
      title: 'Bought 1 ' + oneItem.getName() + '!',
      message: 'now you have ' + oneItem.getQuantity() + ' ' + oneItem.getName(),
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Item bought');
          }
        }
      ]
    });
    confirm.present()
  }

  noMoneyAlert(oneItem : Item)
  {
    var deficit = oneItem.getCost() - this.items.getPuppyPoints();
    let confirm = this.alertCtrl.create({
      title: 'You can\'t buy ' + oneItem.getName() + '!',
      message: 'You need '+ deficit +' more puppy points',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Can\'t afford item');
          }
        }
      ]
    });
    confirm.present()
  }

	incrementPuppyPoints(points: number) : void
	{
		this.items.setPuppyPoints(this.items.getPuppyPoints() + points);
		// this.items.setPuppyPoints(Infinity);
		let confirm = this.alertCtrl.create({
			title: 'You found some PuppyPoints on the ground!',
			message: 'You now have ' + this.items.getPuppyPoints() + ' PuppyPoints!',
			buttons: [
				{
					text: 'Ok',
					handler: () => {
						console.log('Holla Holla Dolla Dolla');
					}
				}
			]
		});
    confirm.present()
	}

	////////////////////////////////////////////////////////////////////
	//       Dog Stuff
	////////////////////////////////////////////////////////////////////

	// returns a string with the image path of the dog
	getDogImage(dog: Dog) : string {
		return this.imgPath.getImagePath(dog.getIcon());
	}

	// returns the cost of the dog.  It is always 500 PuppyPoints, unless it is a rare dog, in which case it is 5000
	getDogCost(dog: Dog) : number {
		var cost = 0;

		if (dog.getIcon() == 'dog_demon.png' || dog.getIcon() == 'dog_target.png') {
			// rare dog.  Cost = 5000
			cost = 5000;
		} else {
			// common dog.  Cost = 500
			cost = 500;
		}

		return cost;
	}

	// returns the array of randomly generated dogs for the shop page.
	getRandomDogs() : Dog[]
	{
		return this.randomDogList;
	}

	// Returns a list of randomly generated dogs to be displayed in the shop page.  Used in the angularjs *ngfor property.
	showRandomDogs() : Dog[]
	{
		var numRandomDogs = 3;
		var randomDogs = new Array(numRandomDogs);
		var numDogStats = 4;

		for(var i = 0; i < numRandomDogs; i++) {
			var randomDogIcon = this.generateRandomDogIcon();
			var randomDogStats = new Array(numDogStats);
			if (randomDogIcon == 'dog_demon.png') {
				// special stats for the demon dog.
				randomDogStats[0] = 0;
				for(var j = 1; j < numDogStats; j++) {
					randomDogStats[j] = 100;
				}
			} else {
				// normal stats
				for (var j = 0; j < numDogStats; j++) {
					randomDogStats[j] = this.getRandomDogStat(0, 100);
				}
			}//end ifelse

			var randomDogName = this.generateRandomDogName(randomDogIcon);

			var newDog = new Dog(randomDogName, randomDogIcon, this.dogs.getCurrentDogId(), randomDogStats[0], randomDogStats[1], randomDogStats[2], randomDogStats[3]);
			randomDogs[i] = newDog;
		}//end for

		return randomDogs;
	}

	// generates a random icon for the dog.  There are 2 classes of dogs: common dogs and rare dogs.  There is a 1% chance of "rolling" a rare dog.  Once you roll a rare dog, it chooses randomly from the list of rare dogs.  The same is for common dogs, except there is a 99% chance of getting a common dog.
	generateRandomDogIcon() : string
	{
		var commonDogIcons = ['dog_black.png', 'dog_brown.png', 'dog_goldie.png', 'dog_spot.png'];
		var rareDogIcons = ['dog_target.png', 'dog_demon.png'];

		var random = Math.random();
		var result = "";
		if (random < 0.01) {
			//rare
			result = rareDogIcons[Math.floor(Math.random() * rareDogIcons.length)];
		} else {
			//common
			result = commonDogIcons[Math.floor(Math.random() * commonDogIcons.length)];
		}

		return result;
	}

	// returns a random number from min to max inclusive.  used for generating random dog stats
	getRandomDogStat(min: number, max: number) : number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// returns a random dog name to use as a default name.  Some randomly generated names are restricted to certain types of dogs.
	// the argument is the icon of the dog the name is being generated for.
	generateRandomDogName(icon: string) : string {
		var dogNameList = ['Ace','Apollo','Bailey','Bandit','Baxter','Bear','Beau','Benji','Benny','Bentley','Blue','Bo','Boomer','Brady','Brody','Bruno','Brutus','Bubba','Buddy','Buster','Cash','Champ','Chance','Charlie','Chase','Chester','Chico','Coco','Cody','Cooper','Copper','Dexter','Diesel','Duke','Elvis','Finn','Frankie','George','Gizmo','Gunner','Gus','Hank','Harley','Henry','Hunter','Jack','Jackson','Jake','Jasper','Jax','Joey','Kobe','Leo','Loki','Louie','Lucky','Luke','Mac','Marley','Max','Mickey','Milo','Moose','Murphy','Oliver','Ollie','Oreo','Oscar','Otis','Peanut','Prince','Rex','Riley','Rocco','Rocky','Romeo','Roscoe','Rudy','Rufus','Rusty','Sam','Sammy','Samson','Scooter','Scout','Shadow','Simba','Sparky','Spike','Tank','Teddy','Thor','Toby','Tucker','Tyson','Vader','Winston','Yoda','Zeus','Ziggy']

		return dogNameList[Math.floor(Math.random() * dogNameList.length)];
	}

	// saves dog in the array and the database
	saveDog(dog: Dog) : void
	{
		this.dogs.addDog(dog); // adds the dog to the local array
		console.log("Added dog to array");
		// alert("added " + dog.getName() + " to array");

		// TODO: fix addDogToDatabase function call when function is updated
		this.dogs.addDogToDatabase(dog);
		console.log("Added dog to database");
		// alert("added " + dog.getName() + " to database");

		console.log("dog saved");
	}

	//////////////////////
	// Dog Alerts
	//////////////////////

	confirmBuyDogAlert(dog : Dog)
  {
    let confirm = this.alertCtrl.create({
      title: 'Buy ' + dog.getName() + '?',
      message: dog.getName() + ' costs ' + this.getDogCost(dog) + ' PuppyPoints.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.buyDog(dog);
          }
        }
      ]
    });
    confirm.present()
  }

	buyDog(dog: Dog)
  {
    var availablePoints = this.items.getPuppyPoints();
    var itemCost = this.getDogCost(dog);
    if (itemCost <= availablePoints)
    {
      this.didBuyDogAlert(dog);
      console.log("buy dog alert");
      var newPoints = availablePoints - itemCost;
      this.items.setPuppyPoints(newPoints);
    }
    else
    {
      this.noMoneyForDogAlert(dog);
      console.log("you don't have money for dog alert");
    }
  }

  didBuyDogAlert(dog: Dog)
  {
    let confirm = this.alertCtrl.create({
      title: 'Bought ' + dog.getName() + '!',
      message: 'Would you like to rename ' + dog.getName() + '?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Dog Bought.  going to rename');
						this.renameDogAlert(dog);
          }
        },
				{
					text: 'No',
					handler: () => {
						console.log('Dog Bought.  skipping rename');
						this.saveDog(dog);
					}
				}
      ]
    });
    confirm.present()

		var index = this.randomDogList.indexOf(dog);
		this.randomDogList.splice(index, 1);
  }

	noMoneyForDogAlert(dog: Dog)
  {
    var deficit = this.getDogCost(dog) - this.items.getPuppyPoints();
    let confirm = this.alertCtrl.create({
      title: 'You can\'t buy ' + dog.getName() + '!',
      message: 'You need '+ deficit +' more puppy points',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Can\'t afford dog');
          }
        }
      ]
    });
    confirm.present()
  }

	// alert that prompts the user to rename the dog.
	renameDogAlert(dog: Dog)
	{
		let confirm = this.alertCtrl.create({
			title: 'Rename ' + dog.getName(),
			inputs: [
				{
					name: 'dogName',
					placeholder: dog.getName()
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log("Canceled rename");
						this.saveDog(dog);
					}
				},
				{
					text: 'Rename',
					handler: data => {
						dog.setName(data.dogName); // changes the name of the dog to the inputed name
						console.log("Renamed dog to " + dog.getName());
						this.saveDog(dog);
					}
				}
			]
		});
		confirm.present();
	}

}
