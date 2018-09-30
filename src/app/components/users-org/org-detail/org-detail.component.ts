import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {AlertService} from '../../../services/alert.service';
import {OrgService} from '../../../services/org.service';
import {OrgDetailModel} from '../../../model/orgdetail.model';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.css']
})
export class OrgDetailComponent implements OnInit {
  submitted = false;

  orgDetail = new OrgDetailModel('', '', '', '', '', '', '', '', '');

  constructor(
    private alertService: AlertService,
    private orgService: OrgService,
  ) { }

  ngOnInit() {
  }

  addCustomer() {
    this.submitted = true;
    console.log(this.orgDetail);
    this.orgService.saveOrg(this.orgDetail)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          console.log(data);
          //this.alertService.success(data);
        },
        error => {
          console.log(error);
          //this.alertService.error(error);
        });
  }

  getCustomer(orgId: string) {
    this.orgService.getOrg(orgId)
      .pipe(map(
        (org) => {
          console.log(org);
          return org;
        }
      ))
      .subscribe(
        data => {
          this.orgDetail = data;
        },
        error => {
          console.log(error);
        });
  }

  editCustomer() {
    this.submitted = true;
    console.log(this.orgDetail);
    this.orgService.editOrg(this.orgDetail)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success(data);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        });
  }

}
