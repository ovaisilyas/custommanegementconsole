import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {CatalogService} from '../../services/catalog.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent implements OnInit {
  extendedMoqList = [];
  extendedCostGreaterList = [];
  coreCatalogs = [];
  extendedCatalogs = [];
  localCoreCatalogModel = [];
  localExtCatalogModel = [];

  constructor(
    private router: Router,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getExtendedMoqList();
    this.getExtendedCostGreaterList();
    this.getExtendedCatalog();
  }

  getExtendedMoqList() {
    this.catalogService.getMoqlist()
    .pipe(map(
      (list) => {
        const moqList = list['Contract Details'];
        const moq = moqList['contractValues'];
        return moq;
      }
    ))
    .subscribe(
      data => {
        this.extendedMoqList = data;
      },
      error => {
        console.log('MOQ list error');
      });
  }

  getExtendedCostGreaterList() {
    this.catalogService.getCostGreaterlist()
    .pipe(map(
      (list) => {
        const costList = list['Contract Details'];
        const cost = costList['contractValues'];
        return cost;
      }
    ))
    .subscribe(
      data => {
        this.extendedCostGreaterList = data;
      },
      error => {
        console.log('Cost Greater list error');
      });
  }

  getCoreCatalog() {
    this.coreCatalogs = [];
    this.catalogService.getCoreCatalog()
    .subscribe(
      data => {
        this.coreCatalogs = data;
      },
      error => {
        console.log('Core catalog get error');
      });
  }

  saveCoreCatalog() {
    this.spinner.show();
    this.catalogService.saveCoreCatalog(this.localCoreCatalogModel)
    .subscribe(
      data => {
        console.log('Core Catalog saved');
        this.spinner.hide();
      },
      error => {
        console.log('Core Catalog error');
        this.spinner.hide();
      });
  }

  getExtendedCatalog() {
    this.extendedCatalogs = [];
    this.catalogService.getExtendedCatalog()
    .pipe(map(
      (list) => {
        const extCatlist = list['extAisLesList'];
        return extCatlist;
      }
    ))
    .subscribe(
      data => {
        this.extendedCatalogs = data;
        this.localExtCatalogModel = this.extendedCatalogs;
      },
      error => {
        console.log('Extended catalog get error');
      });
  }

  saveExtendedCatalog() {
    this.spinner.show();
    const localModel = this.localExtCatalogModel;

    for (const key in localModel) {
      if (localModel[key].COST.attrValId !== null && localModel[key].COST.attrValId !== '') {
        localModel[key].COST.attrvalue = document.getElementById('optionCost' + localModel[key].COST.attrValId).innerText;
      }
    }
    for (const key in localModel) {
      if (localModel[key].MOQ.attrValId !== null && localModel[key].MOQ.attrValId !== '') {
        localModel[key].MOQ.attrvalue = document.getElementById('optionMoq' + localModel[key].MOQ.attrValId).innerText;
      }
    }

    const finalSaveData = {
      extAisLesList : localModel,
    };

    this.catalogService.saveExtendedCatalog(finalSaveData)
    .subscribe(
      data => {
        console.log('Extended Catalog saved');
        this.spinner.hide();
      },
      error => {
        console.log('Extended Catalog error');
        this.spinner.hide();
      });
  }

  updateCoreCatalogModel(name: any, field: any, value: any) {
    const localModel = this.localCoreCatalogModel;

    for (const key in localModel) {
      if (localModel[key].name === name) {
        localModel[key].field = value;
      }
    }

    this.localCoreCatalogModel = localModel;
  }

  updateExtCatalogModel(name: any, field: any, value: any) {
    const localModel = this.localExtCatalogModel;

    for (const key in localModel) {
      if (localModel[key].name === name) {
        localModel[key].field = value;
      }
    }

    this.localExtCatalogModel = localModel;
  }



}
