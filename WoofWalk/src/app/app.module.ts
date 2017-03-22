import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { DogsPage } from '../pages/dogs/dogs';
import { ShopPage } from '../pages/shop/shop';
import { InventoryPage } from '../pages/inventory/inventory';
import { WalkPage } from '../pages/walk/walk';
import { CameraPage } from '../pages/camera/camera';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DogsPage,
    ShopPage,
    InventoryPage,
    WalkPage,
    CameraPage,

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DogsPage,
    ShopPage,
    InventoryPage,
    WalkPage,
    CameraPage
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



