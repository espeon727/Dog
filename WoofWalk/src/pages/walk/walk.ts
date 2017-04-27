/*
*  Created by Chelsea
*  Shows current location, and follows the user
*  calculates the distance that the uesr had walked
*
*  Edited: 4/20/16 Chelsea - added comments
*/


import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';
import { AlertController } from 'ionic-angular';

import { Inventory } from '../../providers/inventory';
import { Dogs } from '../../providers/Dogs';

import { Dog } from '../../app/app.module';

import { InventoryPage } from '../inventory/inventory';

declare var google;

/*
  Generated class for the Walk page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-walk',
  templateUrl: 'walk.html'
})

export class WalkPage {

  /* Variables determining the functionality of the program */
  public currLocation = null;
  private curr_marker;

  /* distance a user has walked */
  public distance: number = 0;
  private watch_id;
  private onTrack: boolean = false;
  public clock: any;
  public mapSet = false;
  public latLng: any;
  private x: number;
  private y: number;

  /* Just what it sounds like, the timeout and the accuracy of
     each call to geolocation
  */
  private locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 4000
  };

	private inventory: Inventory = Inventory.getInstance();
  private dogList: Dogs = Dogs.getInstance();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)
  {
    Diagnostic.requestLocationAuthorization();
  }

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pastDistance') ElementRef;
  map: any;
  pastDistance: any

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad WalkPage');
	this.loadMap();
	this.clock = setInterval(() => this.showPosition(), 5000);
	document.getElementById("EndButton").style.display = 'none';
  }

  /* When start is clicked, starts to track the distance */
  startClicked()
  {
    if (this.onTrack == false)
    {
      var statCheck = this.dogStatCheck();
      if (statCheck == 1)
      {
        this.onTrack = true;
        alert("Started walk");
      }
    }
	document.getElementById("EndButton").style.display = 'block';
	document.getElementById("StartButton").style.display = 'none';
  }

  /* Once stop is clicked, the code will determine the end distance */
  stopClicked()
  {
    if (this.onTrack == true)
    {
      this.onTrack = false;
	  this.pastDistance = this.distance;
      alert(this.distance);
	}
    document.getElementById("StartButton").style.display = 'block';
	document.getElementById("EndButton").style.display = 'none';
	// for updating the PuppyPoints at the end of a walk.
	var PPperMile = 250;
	var currentPP = this.inventory.getPuppyPoints();
	var gainedPP = Math.floor(this.distance * PPperMile);
	this.inventory.setPuppyPoints(currentPP + gainedPP);
	alert("You gained " + gainedPP + " PuppyPoints!");

	// TODO: Make a pretty alert for puppy points gained.
  }

  /* This centers the map around the person
   * allowing a person to change the map without the reload
   * affecting it
   */
  centerMap() {
    this.map.setCenter(this.latLng);
  }
  
  /* code to set up the geolocation variables so that
     updating the map works properly
  */
  showPosition()
  {
    Geolocation.getCurrentPosition().then( (position) =>
    {
      this.x = position.coords.longitude;
      this.y = position.coords.latitude;
      this.latLng = new google.maps.LatLng(this.y, this.x);
      this.updateMap();

			// alert("Position: " + "(" + position.coords.latitude + ", " + position.coords.longitude + ")");

    }, this.error);
  }

  /* this function deals with the original set up of the map */
  loadMap()
  {

    var n = Geolocation.getCurrentPosition( this.locationOptions ).then( (position) =>
    {
      this.x = position.coords.longitude;
      this.y = position.coords.latitude;
      this.latLng = new google.maps.LatLng(this.y, this.x);
			this.makeMap();
	    this.updateMap();
		},this.error);
  }

  /* this inserts the map in the html */
  public makeMap()
  {
		let mapOptions =
				{
					center: this.latLng,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions, this.locationOptions);
    this.curr_marker = new google.maps.Marker(
      {
        position: this.latLng,
        map: this.map,
        title: "My Location"
      });
    this.currLocation = this.latLng;
  }

  /* Updates the map without reloading it */
  public updateMap()
  {

    /* only add to the distance if we are 'walking' */
    if (this.onTrack)
		{
			this.distance = this.distance + 0.000621371 * google.maps.geometry.spherical.computeDistanceBetween(this.latLng, this.currLocation ); //this.gps_distance(this.latLng.latitude, this.latLng.longitude, this.currLocation.latitude, this.currLocation.longitude);
			this.map.addPolyline((new google.maps.PolylineOptions()).add(this.currLocation, this.latLng).width(6).color(google.maps.Color.BLUE)
													 .visible(true));
		}
		this.currLocation = this.latLng;
  	this.curr_marker.setPosition(this.currLocation);


  }

  /* this gives the user an alert in the case of an error */
  public error(err)
  {
    alert("There was an error: " + err);
  }
  
  /* DEPRECATED
	 This function is a back up for calculating the distance between
	 two location points
  */
  gps_distance(lat1, lon1, lat2, lon2)
  {
    alert("In GPS");
    if (lat1 == lat2 && lon1 == lon2) {
			return 0;
		}
		// http://www.movable-type.co.uk/scripts/latlong.html
    var R: number = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1: any = lat1 * (Math.PI / 180);
    var lat2: any = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    alert(.000621371 * d);
    return d;
  }

  /* checks that the available dog has the ability to walk */
  dogStatCheck()
  {
    var activeDog = this.dogList.getActiveDog();
    activeDog.updateStats();
    if (activeDog.getFullness() < 10 || activeDog.getHydration() < 10)
    {
      this.badStatsAlert(activeDog);
      return 0;
    }
    return 1;
  }

  /* alerts that the stats are inadequate to begin a walk */
  badStatsAlert(activeDog : Dog)
  {
    let confirm = this.alertCtrl.create({
      title: 'Your dog ' + activeDog.getName() + ' isn\'t ready for a walk! Fullness and Hydration must be at least 10',
      message: 'Fullness: ' + activeDog.getFullness() + ', Hydration: ' + activeDog.getHydration(),
      buttons: [
        {
          text: 'Go to Inventory',
          handler: () => {
            console.log('Navigating to Inventory');
            this.navCtrl.push(InventoryPage);
          }
        },
        {
          text: 'Close',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    confirm.present()
  }

}
