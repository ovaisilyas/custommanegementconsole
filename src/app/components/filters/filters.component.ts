import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {FiltersService} from '../../services/filters.service';
import {AlertService} from '../../services/alert.service';

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
  selectedLevelCategoryList = [];
  selectedBrandList = [];



  constructor(
    private router: Router,
    private filtersService: FiltersService,
    private alertService: AlertService,
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
    .pipe(map(
      (list) => {
        const categoryList = list['categories'];
        return categoryList;
      }
    ))
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
    .pipe(map(
      (list) => {
        const brandList = list['brands'];
        return brandList;
      }
    ))
    .subscribe(
      data => {
        this.brandsList = data;
        this.localBrandList = this.brandsList;
      },
      error => {

      });
  }

  saveCategoriesList(catgory: any) {
    this.spinner.show();
    const localLevelCategoryModel = this.localLevelCategoryList;
    const selectedOnList = [];
    const selectedOffList = [];
    const includeStoreProducts = false;
    const includeCoreProducts = false;
    for (const key in localLevelCategoryModel) {
      if (localLevelCategoryModel[key].identifier === catgory) {
        for (const i in localLevelCategoryModel[key].ChildCategory_ON) {
          if (i) {
            selectedOnList.push(localLevelCategoryModel[key].ChildCategory_ON[i].categoryId);
            selectedOffList.push(localLevelCategoryModel[key].ChildCategory_OFF[i].categoryId);
          }
        }
      }
    }

    const selectedLevelCategoryList = {
      'categoryId_on': selectedOnList,
      'categoryId_of': selectedOffList,
      'includeStoreProducts': includeStoreProducts,
      'includeCoreProducts': includeCoreProducts,
    };

    this.filtersService.saveLevelTwoCategories(selectedLevelCategoryList)
    .subscribe(
      data => {
        this.spinner.hide();
        this.alertService.success(data.message);
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });

  }

  saveBrandsList(brand: any) {
    this.spinner.show();
    const localBrandListModel = this.localBrandList;
    const selectedOnList = [];
    const selectedOffList = [];
    const includeStoreProducts = false;
    const includeCoreProducts = false;

    for (const key in localBrandListModel) {
      if (localBrandListModel[key].identifier === brand) {
        for (const i in localBrandListModel[key].ChildCategory_ON) {
          if (i) {
            selectedOnList.push(localBrandListModel[key].ChildCategory_ON[i].categoryId);
            selectedOffList.push(localBrandListModel[key].ChildCategory_OFF[i].categoryId);
          }
        }
      }
    }

    const selectedBrandsList = {
      'categoryId_on': selectedOnList,
      'categoryId_of': selectedOffList,
      'includeStoreProducts': includeStoreProducts,
      'includeCoreProducts': includeCoreProducts,
    };

    this.filtersService.saveBrandList(selectedBrandsList)
    .subscribe(
      data => {
        this.spinner.hide();
        this.alertService.success(data.message);
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  moveItemToRight(item: any, catagory: any, tab: any) {
    let currentField = [];
    if (tab === 'category') {
      currentField = this.localLevelCategoryList;
    } else {
      currentField = this.localBrandList;
    }
    const catOnList = document.getElementById('selectOn' + catagory);
    if (item === 'selected') {
      for (let i = 0; i < catOnList.options.length ; i++) {
        if (catOnList.options[i].selected) {
          for (const key in currentField) {
            if (currentField[key].topCategoryId === catagory) {
              currentField[key].ChildCategory_ON = currentField[key].ChildCategory_ON.filter(function(x) {return x.categoryId !== catOnList.options[i].value; });
              currentField[key].ChildCategory_OFF.push({'categoryId': catOnList.options[i].value, 'categoryName': catOnList.options[i].text});
            }
          }
        }
      }
    }
    if (item === 'all') {
      for (let i = 0; i < catOnList.options.length ; i++) {
        for (const key in currentField) {
          if (currentField[key].topCategoryId === catagory) {
            currentField[key].ChildCategory_ON = currentField[key].ChildCategory_ON.filter(function(x) {return x.categoryId !== catOnList.options[i].value; });
            currentField[key].ChildCategory_OFF.push({'categoryId': catOnList.options[i].value, 'categoryName': catOnList.options[i].text});
          }
        }
      }
    }
    if (tab === 'category') {
      this.localLevelCategoryList = currentField;
    } else {
      this.localBrandList = currentField;
    }
  }

  moveItemToLeft(item: any, catagory: any, tab: any) {
    let currentField = [];
    if (tab === 'category') {
      currentField = this.localLevelCategoryList;
    } else {
      currentField = this.localBrandList;
    }
    const catOffList = document.getElementById('selectOff' + catagory);
    if (item === 'selected') {
      for (let i = 0; i < catOffList.options.length ; i++) {
        if (catOffList.options[i].selected) {
          for (const key in currentField) {
            if (currentField[key].topCategoryId === catagory) {
              currentField[key].ChildCategory_OFF = currentField[key].ChildCategory_OFF.filter(function(x) {return x.categoryId !== catOffList.options[i].value; });
              currentField[key].ChildCategory_ON.push({'categoryId': catOffList.options[i].value, 'categoryName': catOffList.options[i].text});
            }
          }
        }
      }
    }
    if (item === 'all') {
      for (let i = 0; i < catOffList.options.length ; i++) {
        for (const key in currentField) {
          if (currentField[key].topCategoryId === catagory) {
            currentField[key].ChildCategory_OFF = currentField[key].ChildCategory_OFF.filter(function(x) {return x.categoryId !== catOffList.options[i].value; });
            currentField[key].ChildCategory_ON.push({'categoryId': catOffList.options[i].value, 'categoryName': catOffList.options[i].text});
          }
        }
      }
    }
    if (tab === 'category') {
      this.localLevelCategoryList = currentField;
    } else {
      this.localBrandList = currentField;
    }
  }



}
