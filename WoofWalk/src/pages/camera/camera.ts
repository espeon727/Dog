import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CameraPreview } from 'ionic-native';

// import * as $ from 'jquery';
// import 'draggable'


/*
  Resources
  https://www.thepolyglotdeveloper.com/2016/04/use-the-device-camera-in-an-ionic-2-android-and-ios-app/

  https://www.joshmorony.com/ionic-go-create-a-pokemon-go-style-interface-in-ionic-2/
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage{
	public base64Image: string;
  public dogPicture: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  	this.base64Image = "../www/assets/images/dpa_02_transparent_bg_large.png"
    this.dogPicture = "../www/assets/images/dpa_01_transparent_bg_large.png"

    // input is (rectangle, front/rear, tapEnabled, dragEnabled, toBack, alpha)
    CameraPreview.startCamera(
      {
        x:0,
        y:0,
        width: window.screen.width,
        height: window.screen.height
      },
      "rear", 
      false, 
      false, 
      true,
      1
    );

  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CameraPage');
    // $("#draggable").draggable();
  }

  public cameraOn() 
  {
    CameraPreview.show();
  }

  public cameraOff()
  {
    CameraPreview.hide();
  }

}
