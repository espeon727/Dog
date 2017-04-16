import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';

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

  private currLocation;
  private curr_marker;
  private distance: number = 0;
  private watch_id;
  private onTrack: boolean = false;
  private mapSet: boolean = false;
  private clock: any;

  public latLng: any;
  private x: number;
  private y: number;

  private locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 4000
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
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
	this.clock = setInterval(this.loadMap, 5000);
  }

  startClicked() 
  {
    if (this.onTrack == false) 
    {
      this.onTrack = true;
      alert("Clicked start");

    }

    
  }
  
  stopClicked() 
  {
    if (this.onTrack == true) 
    {
      this.onTrack = false;
	  this.pastDistance = this.distance;
      alert(this.distance);
	}
	
  }

  showPosition()
  {
    Geolocation.getCurrentPosition().then( (position) => 
    {
      this.x = position.coords.longitude;
      this.y = position.coords.latitude;
      this.latLng = new google.maps.LatLng(this.x, this.y);
	  alert("clicked update pos");
      this.updateMap(position);

    }, this.error);
  }
  
  loadMap() 
  {
    
    var n = Geolocation.getCurrentPosition( {enableHighAccuracy: true, timeout: 5000, maximumAge: 4000}).then( (position) => 
    {
      this.x = position.coords.longitude;
      this.y = position.coords.latitude;
      this.latLng = new google.maps.LatLng(this.x, this.y);
	  if (!this.mapSet) {
	    this.makeMap();
		this.mapSet = true;
	  } else {
	    this.updateMap(position);
	  }

    },this.error);
	
	
	
  }
  

  

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
  


  public updateMap(pos) 
  {
    this.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var curr = pos.coords;
    if (curr.latitude == this.currLocation.latitude && curr.longitude == this.currLocation.longitude ) 
    {
      return;
    }
    if (this.onTrack) {
	  this.distance = this.distance + 0.62137119 * this.gps_distance(curr.latitude, curr.longitude, this.currLocation.latitude, this.currLocation.longitude);
	}
	this.map.setCenter(this.latLng);
  	this.curr_marker.setPosition(this.latLng);
  	this.map.addPolyline((new google.maps.PolylineOptions()).add(this.currLocation, this.latLng).width(6).color(google.maps.Color.BLUE)
          .visible(true));
  	this.currLocation = curr;
	alert("Finished update");
  }

  
  public error(err) 
  {
    alert("There was an error: " + err);
  }
  
  gps_distance(lat1, lon1, lat2, lon2) 
  {
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
     
    return d;
  }
  
}
