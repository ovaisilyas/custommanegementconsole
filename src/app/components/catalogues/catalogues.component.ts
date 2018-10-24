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
  extendedMoqList = {
    'cfcondId': '51509',
    'onFilter': false,
    'cfcondvalId': '51509',
    'identifier': 'EXTENDED',
    'cfcondgrpId': '38506',
      'COST': {
        'CFcondId': '',
        'cfcondvalId': '51509',
        'attrVal': '5',
        'attrValId': ''
      },
      'MOQ': {
        'CFcondId': '',
        'cfcondvalId': '51509',
        'attrVal': '2',
        'attrValId': ''
      },
      'RQ': {
        'CFcondId': '',
        'cfcondvalId': '51509',
        'attrVal': false,
        'attrValId': ''
      }
  };

  extendedCostGreaterList = {};
  coreCatalogs = {};
  extendedCatalogs = {};
  localCoreCatalogModel = {};
  localExtCatalogModel = {};

  constructor(
    private router: Router,
    private catalogService: CatalogService,
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    this.getExtendedMoqList();
    this.getExtendedCostGreaterList();
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
    this.catalogService.saveCoreCatalog(this.localCoreCatalogModel)
    .subscribe(
      data => {
        console.log('Core Catalog saved');
      },
      error => {
        console.log('Core Catalog error');
      });
  }

  getExtendedCatalog() {
    this.extendedCatalogs = [];
    this.catalogService.getExtendedCatalog()
    .pipe(map(
      (product) => {
        const searchDetails = product['SearchDetails'];
        const searchList = searchDetails['SearchList'];
        return searchList;
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
    this.catalogService.saveExtendedCatalog(this.localExtCatalogModel)
    .subscribe(
      data => {
        console.log('Extended Catalog saved');
      },
      error => {
        console.log('Extended Catalog error');
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
