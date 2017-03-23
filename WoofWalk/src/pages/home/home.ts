import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


import { DogsPage } from '../dogs/dogs';
import { ShopPage } from '../shop/shop';
import { InventoryPage } from '../inventory/inventory';
import { WalkPage } from '../walk/walk';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
  private rootPage;
  private homePage;
  private shopPage;
  private inventoryPage;
  private walkPage;
  private cameraPage;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.rootPage = HomePage;

    this.homePage = HomePage;
    this.shopPage = ShopPage;
    this.inventoryPage = InventoryPage;
    this.walkPage = WalkPage;
    this.cameraPage = CameraPage;
  }


  clicked()
  {
    // for android
    if (document.getElementById('affection').getAttribute("src") == "../www/assets/images/affection_bar.png")
    {
      document.getElementById('affection').setAttribute("src", "../www/assets/images/empty_affection_bar.png");
    }
    else if (document.getElementById('affection').getAttribute("src") == "../www/assets/images/empty_affection_bar.png")
    {
      document.getElementById('affection').setAttribute("src", "../www/assets/images/affection_bar.png");
    }

    if (document.getElementById('hunger').getAttribute("src") == "../www/assets/images/hunger_bar.png")
    {
      document.getElementById('hunger').setAttribute("src", "../www/assets/images/empty_hunger_bar.png");
    }
    else if (document.getElementById('hunger').getAttribute("src") == "../www/assets/images/empty_hunger_bar.png")
    {
      document.getElementById('hunger').setAttribute("src", "../www/assets/images/hunger_bar.png");
    }

    if (document.getElementById('thirst').getAttribute("src") == "../www/assets/images/thirst_bar.png")
    {
      document.getElementById('thirst').setAttribute("src", "../www/assets/images/empty_thirst_bar.png");
    }
    else if (document.getElementById('thirst').getAttribute("src") == "../www/assets/images/empty_thirst_bar.png")
    {
      document.getElementById('thirst').setAttribute("src", "../www/assets/images/thirst_bar.png");
    }



    // web
    if (document.getElementById('affection').getAttribute("src") == "../assets/images/affection_bar.png" )
    {
      document.getElementById('affection').setAttribute("src", "../assets/images/empty_affection_bar.png");
    }
    else if (document.getElementById('affection').getAttribute("src") == "../assets/images/empty_affection_bar.png")
    {
      document.getElementById('affection').setAttribute("src", "../assets/images/affection_bar.png");
    }

    if (document.getElementById('hunger').getAttribute("src") == "../assets/images/hunger_bar.png" )
    {
      document.getElementById('hunger').setAttribute("src", "../assets/images/empty_hunger_bar.png");
    }
    else if (document.getElementById('hunger').getAttribute("src") == "../assets/images/empty_hunger_bar.png")
    {
      document.getElementById('hunger').setAttribute("src", "../assets/images/hunger_bar.png");
    }

    if (document.getElementById('thirst').getAttribute("src") == "../assets/images/thirst_bar.png" )
    {
      document.getElementById('thirst').setAttribute("src", "../assets/images/empty_thirst_bar.png");
    }
    else if (document.getElementById('thirst').getAttribute("src") == "../assets/images/empty_thirst_bar.png")
    {
      document.getElementById('thirst').setAttribute("src", "../assets/images/thirst_bar.png");
    }
  }

  openPage(p)
  {
    this.rootPage = p;
  }

  // toggleMenu()
  // {
  //   var menu = document.getElementById("menu");
  //   if(menu.classList.contains("show-menu"))
  //   {
  //     menu.classList.remove("show-menu");
  //   }
  //   else
  //   {
  //     menu.classList.add("show-menu");
  //   }
  // }



  navigateDogs()
  {
    this.navCtrl.push(DogsPage);
  }
  navigateShop()
  {
    this.navCtrl.push(ShopPage);
  }
  navigateInventory()
  {
    this.navCtrl.push(InventoryPage);
  }
  navigateWalk()
  {
    this.navCtrl.push(WalkPage);
  }
  navigateCamera()
  {
    this.navCtrl.push(CameraPage);
  }

}
