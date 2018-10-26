import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {FiltersService} from '../../services/filters.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  levelCategoryList = [];
  brandsList = [];
  localLevelCategoryList = [];
  localBrandList = [];



  constructor(
    private router: Router,
    private filtersService: FiltersService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getLevelTwoCategories();
    this.getBrandList();
  }

  getLevelTwoCategories() {
    this.filtersService.getLevelTwoCategories()
    .subscribe(
      data => {
        this.levelCategoryList = data;
        this.localLevelCategoryList = this.levelCategoryList;
      },
      error => {

      });
  }

  getBrandList() {
    this.filtersService.getBrandList()
    .subscribe(
      data => {
        this.brandsList = data;
        this.localBrandList = this.brandsList;
      },
      error => {

      });
  }

  moveItemToRight(item: any, catagory: any) {
    if (item === 'selected') {

    }
    if (item === 'all') {

    }
  }

  moveItemToLeft(item: any, catagory: any) {
    if (item === 'selected') {

    }
    if (item === 'all') {

    }
  }


}
