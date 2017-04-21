import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CameraPreview, Diagnostic } from 'ionic-native';

import { ImagePath } from '../../app/app.module';
import { Dogs } from '../../providers/Dogs';
import { Dog } from '../../app/app.module';


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

	private imgPath: ImagePath = new ImagePath();
  private dogProvider : Dogs = Dogs.getInstance();

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
		this.dogPicture = this.imgPath.getImagePath(this.dogProvider.getActiveDog().getIcon());

    Diagnostic.requestCameraAuthorization();

  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CameraPage');
    // $("#draggable").draggable();
  }

  public cameraOn() 
  {
    // input is (rectangle, front/rear, tapEnabled, dragEnabled, toBack, alpha)
    CameraPreview.startCamera(
      {
        x:0,
        y:0,
        width: window.screen.width,
        height: window.screen.height
      },
      "rear", 
      true, 
      false, 
      true,
      1
    );

    CameraPreview.show();
  }

  public cameraOff()
  {
    CameraPreview.stopCamera();
  }


}



















