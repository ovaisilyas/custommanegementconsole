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
    this.getHeaderOptions();
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getLevelTwoCategories();
    this.getBrandList();
  }

  getHeaderOptions() {
    this.filtersService.getHeaderOptions();
  }


  getLevelTwoCategories() {
    this.spinner.show();
    this.filtersService.getLevelTwoCategories()
    .pipe(map(
      (list) => {
        const categoryList = list['categories'];
        return categoryList;
      }
    ))
    .subscribe(
      data => {
        this.spinner.hide();
        this.levelCategoryList = data;
        this.localLevelCategoryList = this.levelCategoryList;
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  getBrandList() {
    this.spinner.show();
    this.filtersService.getBrandList()
    .pipe(map(
      (list) => {
        const brandList = list['brandOnOffList'];
        return brandList;
      }
    ))
    .subscribe(
      data => {
        this.spinner.hide();
        this.brandsList = data;
        this.localBrandList = data;
        console.log(this.localBrandList);
      },
      error => {
        this.spinner.hide();
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

  saveBrandsList() {
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

    const catOnList = document.getElementById('selectOn' + catagory) as HTMLSelectElement;
    if (item === 'selected') {
      for (let i = 0; i < catOnList.options.length ; i++) {
        if (catOnList.options[i].selected) {
          for (const key in currentField) {
            if (currentField[key].TopCategoryId === catagory) {
              currentField[key].ChildCategory_ON = currentField[key].ChildCategory_ON.filter(function(x) {return x.CategoryId !== catOnList.options[i].value; });
              currentField[key].ChildCategory_OF.push({'CategoryId': catOnList.options[i].value, 'CategoryName': catOnList.options[i].text});
              currentField[key].ChildCategory_OF.sort(function(a, b) {
                const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
              currentField[key].ChildCategory_ON.sort(function(a, b) {
                const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
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
            currentField[key].ChildCategory_OF.sort(function(a, b) {
              const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                  return 1;
              }
              return 0;
          });
            currentField[key].ChildCategory_ON.sort(function(a, b) {
              const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                  return 1;
              }
              return 0;
          });
          }
        }
      }
    }

      this.localLevelCategoryList = currentField;

  }

  moveItemToLeft(item: any, catagory: any, tab: any) {
    const currentField = this.localLevelCategoryList;

    const catOffList = document.getElementById('selectOff' + catagory) as HTMLSelectElement;
    if (item === 'selected') {
      for (let i = 0; i < catOffList.options.length ; i++) {
        if (catOffList.options[i].selected) {
          for (const key in currentField) {
            if (currentField[key].TopCategoryId === catagory) {
              currentField[key].ChildCategory_OF = currentField[key].ChildCategory_OF.filter(function(x) {return x.CategoryId !== catOffList.options[i].value; });
              currentField[key].ChildCategory_ON.push({'CategoryId': catOffList.options[i].value, 'CategoryName': catOffList.options[i].text});
              currentField[key].ChildCategory_OF.sort(function(a, b) {
                const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
              currentField[key].ChildCategory_ON.sort(function(a, b) {
                const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
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
            currentField[key].ChildCategory_OF.sort(function(a, b) {
              const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                  return 1;
              }
              return 0;
          });
            currentField[key].ChildCategory_ON.sort(function(a, b) {
              const nameA = a.CategoryName.toLowerCase(), nameB = b.CategoryName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                  return 1;
              }
              return 0;
          });
          }
        }
      }
    }


      this.localLevelCategoryList = currentField;

  }



  moveBrandItemToRight(item: any, tab: any) {
    const currentField = this.localBrandList;

    const catOnList = document.getElementById('selectOnBrand') as HTMLSelectElement;
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
    currentField.BrandName_OFF.sort(function(a, b) {
      const nameA = a.brandName.toLowerCase(), nameB = b.brandName.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
          return 1;
      }
      return 0;
  });
    currentField.BrandName_ON.sort(function(a, b) {
      const nameA = a.brandName.toLowerCase(), nameB = b.brandName.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
          return 1;
      }
      return 0;
  });
    this.localBrandList = currentField;

  }

  moveBrandItemToLeft(item: any, tab: any) {
    const currentField = this.localBrandList;

    const catOffList = document.getElementById('selectOffBrand') as HTMLSelectElement;
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
    currentField.BrandName_OFF.sort(function(a, b) {
      const nameA = a.brandName.toLowerCase(), nameB = b.brandName.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
          return 1;
      }
      return 0;
  });
    currentField.BrandName_ON.sort(function(a, b) {
      const nameA = a.brandName.toLowerCase(), nameB = b.brandName.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
          return 1;
      }
      return 0;
  });
    this.localBrandList = currentField;
  }


}
