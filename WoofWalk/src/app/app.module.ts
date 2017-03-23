import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import '../../node_modules/chart.js/dist/Chart.bundle.min.js';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HomePage } from '../pages/home/home';
import { DogsPage } from '../pages/dogs/dogs';
import { ShopPage } from '../pages/shop/shop';
import { InventoryPage } from '../pages/inventory/inventory';
import { WalkPage } from '../pages/walk/walk';
import { CameraPage } from '../pages/camera/camera';
import { DogStatsPage } from '../pages/dog-stats/dog-stats';

import { Globals } from '../providers/Globals';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DogsPage,
    ShopPage,
    InventoryPage,
    WalkPage,
    CameraPage,
    DogStatsPage


  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DogsPage,
    ShopPage,
    InventoryPage,
    WalkPage,
    CameraPage,
    DogStatsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

// This class is for the function getImagePath, which gets the appropriate path, depending on the platform, to the image with the filename name
// usage:
//     in the file you want to use it in, include the line
//         import { ImagePath } from '../app/app.module';
//     then create a private variable of the ImagePath type
//         imgpath : ImagePath = new ImagePath();
//     then all variables can be declared, getting the image path by doing
//         this.imgpath.getImagePath(...)
export class ImagePath {

  globals : Globals;

  constructor() {
    this.globals = Globals.getInstance();
  }
  
  public getImagePath(file: string) : string
  {
    var result = "";

    if(this.globals.getPlatform() == "core") {
      result += "../assets/images/";
      result += file;      
    } else {
      if(this.globals.getPlatform() == "android" || this.globals.getPlatform() == "ios") {
	result += "../www/assets/images/";
	result += file;
      } else {
	//unknown/unsupported platform
	throw new Error("Unknown/unsupported Platform");
      }
    }

    return result;
  }
}

export class Item {
  name: string; // the name of the item
  icon: string; // the file path to the icon image
  quantity: number; // the quantity of the item that the player has in their inventory
  // id: number;

  constructor(name: string, icon: string, quantity: number) {
    this.name = name;
    this.icon = icon;
    this.quantity = quantity;
  }

  getName()
  {
    return this.name;
  }

  getIcon()
  {
    return this.icon;
  }

  getQuantity()
  {
    return this.quantity;
  }

  setQuantity(q: number)
  {
    this.quantity = q;
  }

}



