import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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


export class Item {
  name: string;
  icon: string;
  quantity: number;
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



