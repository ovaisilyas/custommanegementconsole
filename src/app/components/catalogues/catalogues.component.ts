import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {CatalogService} from '../../services/catalog.service';
import {AlertService} from '../../services/alert.service';
import {ConfirmationDialogService} from '../../confirmation-dialog/confirmation-dialog/confirmation-dialog.service';

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
  storeRangeList = [];
  //endlessExtendedList = [];
  //coreExtendedList = [];

  constructor(
    private router: Router,
    private catalogService: CatalogService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
  ) { }

  ngOnInit() {
    this.getHeaderOptions();
    if (sessionStorage.getItem('WCToken') === null) {
      this.router.navigate(['/login']);
    }
    //this.getExtendedMoqList();
    //this.getExtendedCostGreaterList();
    this.getCoreCatalog();
    this.getExtendedCatalog();
    this.getStoreRange();
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
    .subscribe(
      data => {
        this.spinner.hide();
        this.coreCatalogs = data['coreList'];
        //this.coreExtendedList = data['extendedList'];
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  getStoreRange() {
    this.spinner.show();
    this.coreCatalogs = [];
    this.catalogService.getStoreRange()
      .subscribe(
        data => {
          this.spinner.hide();
          this.storeRangeList = data['storeList'];
        },
        error => {
          this.spinner.hide();
          this.alertService.error(error);
        });
  }

  saveStoreRange() {
    this.spinner.show();
    const finalSaveData = {
      storeList: this.storeRangeList,
    };
    this.catalogService.saveStoreRange(finalSaveData)
      .subscribe(
        data => {
          this.alertService.success(data.message + ' (Changes will apply on next business day)');
          this.spinner.hide();
        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
  }

  public openConfirmationDialogStore() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to save ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.saveStoreRange();
        }
      })
      .catch(error => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getExtendedCatalog() {
    this.spinner.show();
    this.extendedCatalogs = [];
    this.catalogService.getExtendedCatalog()
    .subscribe(
      data => {
        this.spinner.hide();
        this.extendedCatalogs = data['extAisLesList'];
        //this.endlessExtendedList = data['extendedList'];
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
  }

  public openConfirmationDialogCore() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to save ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.saveCoreCatalog();
        }
      })
      .catch(error => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  saveCoreCatalog() {
      this.spinner.show();
      const finalSaveData = {
        coreList: this.coreCatalogs,
        //extendedList: this.coreExtendedList,
      };
      this.catalogService.saveCoreCatalog(finalSaveData)
        .subscribe(
          data => {
            this.alertService.success(data.message + ' (Changes will apply on next business day)');
            this.spinner.hide();
          },
          error => {
            this.alertService.error(error);
            this.spinner.hide();
          });
  }

  public openConfirmationDialogExtended() {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to save ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.saveExtendedCatalog();
        }
      })
      .catch(error => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  saveExtendedCatalog() {
      this.spinner.show();
      /*const localModel = this.extendedCatalogs;

      for (const key in localModel) {
        if (localModel[key].attrValId !== null && localModel[key].attrValId !== '') {
          localModel[key].attrvalue = document.getElementById('optionCost' + localModel[key].attrValId).innerText;
        }
      }
      for (const key in localModel) {
        if (localModel[key].attrValId !== null && localModel[key].attrValId !== '') {
          localModel[key].attrvalue = document.getElementById('optionMoq' + localModel[key].attrValId).innerText;
        }
      }*/
      const finalSaveData = {
        extAisLesList: this.extendedCatalogs,
        //extendedList: this.endlessExtendedList,
      };

      this.catalogService.saveExtendedCatalog(finalSaveData)
        .subscribe(
          data => {
            this.alertService.success(data.message + ' (Changes will apply on next business day)');
            this.spinner.hide();
          },
          error => {
            this.alertService.error(error);
            this.spinner.hide();
          });
  }

}
