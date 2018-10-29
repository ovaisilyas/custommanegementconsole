import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {CatalogService} from '../../services/catalog.service';
import {AlertService} from '../../services/alert.service';

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
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getHeaderOptions();
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getExtendedMoqList();
    this.getExtendedCostGreaterList();
    this.getCoreCatalog();
    this.getExtendedCatalog();
  }

  getHeaderOptions() {
    this.catalogService.getHeaderOptions();
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
    this.spinner.show();
    this.coreCatalogs = [];
    this.catalogService.getCoreCatalog()
    .pipe(map(
      (list) => {
        const coreCatlist = list['coreList'];
        return coreCatlist;
      }
    ))
    .subscribe(
      data => {
        this.spinner.hide();
        this.coreCatalogs = data;
        this.localCoreCatalogModel = this.coreCatalogs;
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  getExtendedCatalog() {
    this.spinner.show();
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
        this.spinner.hide();
        this.extendedCatalogs = data;
        this.localExtCatalogModel = this.extendedCatalogs;
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  saveCoreCatalog() {
    this.spinner.show();
    const localModel = this.localCoreCatalogModel;
    const finalSaveData = {
      coreList : localModel,
    };
    this.catalogService.saveCoreCatalog(finalSaveData)
    .subscribe(
      data => {
        this.alertService.success(data.message);
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
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
        this.alertService.success(data.message);
        this.spinner.hide();
      },
      error => {
        this.alertService.error(error);
        this.spinner.hide();
      });
  }

}
