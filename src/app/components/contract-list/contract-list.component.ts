import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {UserlistModel} from '../../model/userlist.model';
import {UsersService} from '../../services/users.service';
import {CustomerlistModel} from '../../model/customerlist.model';
import {UserDetailModel} from '../../model/userdetail.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ResetPasswordModel} from '../../model/resetpassword.model';
import {UserStatusModel} from '../../model/userstatus.model';
import {AlertService} from '../../services/alert.service';
import {OrgDetailModel} from '../../model/orgdetail.model';
import {OrgService} from '../../services/org.service';
import {ViewChild, ElementRef} from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  customerList: CustomerlistModel[];
  itemList: UserlistModel[];
  submitted = false;
  userDetail = new UserDetailModel('', '', '', '', '', '', '', '', '', '', '', ''
    , true, false, false, false, '');

  orgDetail = new OrgDetailModel('', '', '', '', '', '', '-2001', '', 'O', '');

  selectedId = '';
  IdKey = 0;
  loading = true;

  constructor(
    private searchService: SearchService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private orgService: OrgService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.usersService.getCustomers()
      .pipe(map(
        (customers) => {
          const organizationList = customers['organizationList'];
          console.log(organizationList);
          return organizationList;
        }
      ))
      .subscribe(
        data => {
          this.customerList = data;
          this.loading = false;
        },
        error => {
          console.log('Unable to Fetch Customers');
        });
  }

  getOrgEntryId(value: any) {
    this.IdKey = this.customerList.findIndex(function(item, i) {
      return item.orgEntityName === value;
    });
    if (this.IdKey !== -1) {
      this.userDetail.parentMemberId = this.customerList[this.IdKey].orgEntityId;
    }
  }

}
