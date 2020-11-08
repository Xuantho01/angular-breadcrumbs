import { TreeNode,MenuItem } from 'primeng/primeng';
import { Component, OnInit, ViewEncapsulation,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
// import {  MenuItem } from 'primeng/primeng';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit  {
  // privattitle="Angular Breadcrumb Demo"
  breadcrumbs: MenuItem[];
  rumbs: Observable<MenuItem[]>;
  constructor(private titleService: Title, private breadcrumbService: BreadcrumbService ) {
  }
  
  // ngOnInit(): void {
  //   this.breadcrumbService.breadcrumbChanged.subscribe( crumbs => {
  //     this.titleService.setTitle(this.createTitle(crumbs));
  //   })
  // }

  ngOnInit() {
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
        this.breadcrumbs = crumbs.map(c => this.toPrimeNgMenuItem(c));
        console.log("asd");
        console.log(this.breadcrumbs);
    });
    // this.rumbs = this.breadcrumbService.rumbs;

}
private toPrimeNgMenuItem(crumb: Breadcrumb) {
  return <MenuItem>{ label: crumb.displayName, url: `#${crumb.url}`}
}

  private createTitle(routesCollection: Breadcrumb[]) {
    const title = 'Angular Demo';
    const titles = routesCollection.filter((route) => route.displayName);

    if (!titles.length) { return title; }

    const routeTitle = this.titlesToString(titles);
    return `${routeTitle} ${title}`;
}

private titlesToString(titles) {
    return titles.reduce((prev, curr) => {
        return `${curr.displayName} - ${prev}`;
    }, '');
}

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
}
