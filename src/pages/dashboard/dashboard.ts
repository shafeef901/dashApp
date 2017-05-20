import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { FeedPage } from '../feed/feed';
import 'rxjs/Rx';

import { DashboardModel } from './dashboard.model';
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'dashboard-page',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  dashboard: DashboardModel = new DashboardModel();
  loading: any;

  constructor(
    public nav: NavController,
    public dashboardService: DashboardService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }


  ionViewDidLoad() {
    this.loading.present();
    this.dashboardService
      .getData()
      .then(data => {
        this.dashboard.banner_image = data.banner_image;
        this.dashboard.banner_title = data.banner_title;
        this.dashboard.populars = data.populars;
        this.dashboard.categories = data.categories;
        this.loading.dismiss();
      });
  }


  goToFeed(category: any) {
    this.nav.push(FeedPage, {
      category: category
    });
  }

}
