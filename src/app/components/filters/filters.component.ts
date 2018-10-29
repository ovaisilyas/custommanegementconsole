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
  localBrandList = {
    'BrandName_OFF': [],
    'BrandName_ON': []
  };
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
        console.log(error);
      });
  }

  getBrandList() {
    this.filtersService.getBrandList()
    .pipe(map(
      (list) => {
        const brandList = list['brandOnOffList'];
        return brandList;
      }
    ))
    .subscribe(
      data => {
        this.brandsList = data;
        this.localBrandList = data;
        console.log(this.localBrandList);
      },
      error => {

      });
  }

  saveCategoriesList(catgory: any) {
    this.spinner.show();
    const localLevelCategoryModel = this.localLevelCategoryList;
    const selectedOnList = [];
    const selectedOffList = [];
    let includeStoreProducts = false;
    let includeCoreProducts = false;
    for (const key in localLevelCategoryModel) {
      if (localLevelCategoryModel[key].identifier === catgory) {
        for (const i in localLevelCategoryModel[key].ChildCategory_ON) {
          if (i) {
            selectedOnList.push(localLevelCategoryModel[key].ChildCategory_ON[i].CategoryId);
          }
        }
        for (const i in localLevelCategoryModel[key].ChildCategory_OF) {
          if (i) {
            selectedOffList.push(localLevelCategoryModel[key].ChildCategory_OF[i].CategoryId);
          }
        }
        includeCoreProducts = localLevelCategoryModel[key].includeCoreProducts;
        includeStoreProducts = localLevelCategoryModel[key].includeStoreProducts;
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
        this.alertService.success('Filters saved successfully');
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });

  }

  saveBrandsList(brand: any) {
    this.spinner.show();
    const localBrandListModel = this.localBrandList;

    this.filtersService.saveBrandList(localBrandListModel)
    .subscribe(
      data => {
        this.spinner.hide();
        this.alertService.success('Brand filters saved successfully');
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  moveItemToRight(item: any, catagory: any, tab: any) {
    const currentField = this.localLevelCategoryList;

    const catOnList = document.getElementById('selectOn' + catagory);
    if (item === 'selected') {
      for (let i = 0; i < catOnList.options.length ; i++) {
        if (catOnList.options[i].selected) {
          for (const key in currentField) {
            if (currentField[key].TopCategoryId === catagory) {
              currentField[key].ChildCategory_ON = currentField[key].ChildCategory_ON.filter(function(x) {return x.CategoryId !== catOnList.options[i].value; });
              currentField[key].ChildCategory_OF.push({'CategoryId': catOnList.options[i].value, 'CategoryName': catOnList.options[i].text});
            }
          }
        }
      }
    }
    if (item === 'all') {
      for (let i = 0; i < catOnList.options.length ; i++) {
        for (const key in currentField) {
          if (currentField[key].TopCategoryId === catagory) {
            currentField[key].ChildCategory_ON = currentField[key].ChildCategory_ON.filter(function(x) {return x.CategoryId !== catOnList.options[i].value; });
            currentField[key].ChildCategory_OF.push({'CategoryId': catOnList.options[i].value, 'CategoryName': catOnList.options[i].text});
          }
        }
      }
    }

      this.localLevelCategoryList = currentField;

  }

  moveItemToLeft(item: any, catagory: any, tab: any) {
    const currentField = this.localLevelCategoryList;

    const catOffList = document.getElementById('selectOff' + catagory);
    if (item === 'selected') {
      for (let i = 0; i < catOffList.options.length ; i++) {
        if (catOffList.options[i].selected) {
          for (const key in currentField) {
            if (currentField[key].TopCategoryId === catagory) {
              currentField[key].ChildCategory_OF = currentField[key].ChildCategory_OF.filter(function(x) {return x.CategoryId !== catOffList.options[i].value; });
              currentField[key].ChildCategory_ON.push({'CategoryId': catOffList.options[i].value, 'CategoryName': catOffList.options[i].text});
            }
          }
        }
      }
    }
    if (item === 'all') {
      for (let i = 0; i < catOffList.options.length ; i++) {
        for (const key in currentField) {
          if (currentField[key].TopCategoryId === catagory) {
            currentField[key].ChildCategory_OF = currentField[key].ChildCategory_OF.filter(function(x) {return x.CategoryId !== catOffList.options[i].value; });
            currentField[key].ChildCategory_ON.push({'CategoryId': catOffList.options[i].value, 'CategoryName': catOffList.options[i].text});
          }
        }
      }
    }

      this.localLevelCategoryList = currentField;

  }



  moveBrandItemToRight(item: any, tab: any) {
    const currentField = this.localBrandList;

    const catOnList = document.getElementById('selectOnBrand');
    if (item === 'selected') {
      for (let i = 0; i < catOnList.options.length ; i++) {
        if (catOnList.options[i].selected) {
              currentField.BrandName_ON = currentField.BrandName_ON.filter(function(x) {return x.brandName !== catOnList.options[i].value; });
              currentField.BrandName_OFF.push({'brandName': catOnList.options[i].text});
        }
      }
    }
    if (item === 'all') {
      for (let i = 0; i < catOnList.options.length ; i++) {
            currentField.BrandName_ON = currentField.BrandName_ON.filter(function(x) {return x.brandName !== catOnList.options[i].value; });
            currentField.BrandName_OFF.push({'brandName': catOnList.options[i].text});
      }
    }
    currentField.BrandName_OFF = this.sortArray(currentField.BrandName_OFF);
    currentField.BrandName_ON = this.sortArray(currentField.BrandName_ON);
    this.localBrandList = currentField;

  }

  moveBrandItemToLeft(item: any, tab: any) {
    const currentField = this.localBrandList;

    const catOffList = document.getElementById('selectOffBrand');
    if (item === 'selected') {
      for (let i = 0; i < catOffList.options.length ; i++) {
        if (catOffList.options[i].selected) {
              currentField.BrandName_OFF = currentField.BrandName_OFF.filter(function(x) {return x.brandName !== catOffList.options[i].value; });
              currentField.BrandName_ON.push({'brandName': catOffList.options[i].text});
        }
      }
    }
    if (item === 'all') {
      for (let i = 0; i < catOffList.options.length ; i++) {
            currentField.BrandName_OFF = currentField.BrandName_OFF.filter(function(x) {return x.brandName !== catOffList.options[i].value; });
            currentField.BrandName_ON.push({'brandName': catOffList.options[i].text});
      }
    }
    currentField.BrandName_OFF = this.sortArray(currentField.BrandName_OFF);
    currentField.BrandName_ON = this.sortArray(currentField.BrandName_ON);
    this.localBrandList = currentField;
  }



  sortArray(sortArray) {
    const sortable = [];
    for (const key in sortArray) {
      if (key) {
        sortable.push(sortArray[key]);
      }
    }

    sortable.sort(function(a, b) {
        return a - b;
    });
    return sortable;
  }


}
