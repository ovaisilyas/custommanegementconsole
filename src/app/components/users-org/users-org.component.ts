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
  selector: 'app-users-org',
  templateUrl: './users-org.component.html',
  styleUrls: ['./users-org.component.css']
})
export class UsersOrgComponent implements OnInit {
  customerList: CustomerlistModel[];
  itemList: UserlistModel[];
  userDetail = new UserDetailModel('', '', '', '', '', '', '', '', '', '', '', ''
    , true, false, false, false, '');
  submitted = false;
  resetPassModel: ResetPasswordModel;
  userStatusModel: UserStatusModel;
  searchTerm = '';
  selectedId = '';
  IdKey = 0;
  loading = true;

  orgDetail = new OrgDetailModel('', '', '', '', '', '', '-2001', '', 'O', '');

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(
    private searchService: SearchService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private orgService: OrgService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.getCustomers();
  }

  onEnter(value: string) {
    this.spinner.show();
    this.searchTerm = value;
    this.searchService.searchData(value)
      .pipe(map(
        (users) => {
          const searchDetails = users['SearchDetails'];
          const searchList = searchDetails['SearchList'];
          return searchList;
        }
      ))
      .subscribe(
        data => {
          this.itemList = data;
          this.alertService.clear();
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          if (this.itemList !== undefined) {
            this.itemList.length = 0;
          }
          this.spinner.hide();
        });
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

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  getUser(userId: string) {
    this.spinner.show();
    this.usersService.getUser(userId)
      .pipe(map(
        (user) => {
          console.log(user);
          return user;
        }
      ))
      .subscribe(
        data => {
          this.userDetail = data;
          this.selectedId = this.getOrgEntryName(this.userDetail.parentMemberId);
          this.userDetail.buyer = JSON.parse(data['buyer']);
          this.userDetail.approver = JSON.parse(data['approver']);
          this.userDetail.admin = JSON.parse(data['admin']);
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.spinner.hide();
        });
  }

  onSaveUser() {
    this.spinner.show();
    this.userDetail.status = true;
    console.log(this.userDetail);
    if (this.userDetail.approver === null) {
      this.userDetail.approver = false;
    }
    if (this.userDetail.admin === null) {
      this.userDetail.admin = false;
    }

    this.usersService.saveUser(this.userDetail)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          this.closeModal();
          this.alertService.success('User Added Successfully');
          this.onEnter(this.searchTerm);
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.alertService.error(error);
        });
  }

  resetPassword(logonId: string) {
    this.spinner.show();
    this.resetPassModel = new ResetPasswordModel(logonId, '-');
    this.submitted = true;
    this.usersService.resetPassword(this.resetPassModel)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          this.alertService.success('Password reset email has been sent successfully');
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.alertService.error(error);
        });
  }

  updateUserStatus(userId: string, event: any) {
    this.spinner.show();
    if (event.currentTarget.checked) {
      status = '1';
    } else {
      status = '0';
    }
    this.userStatusModel = new UserStatusModel(userId, status);
    this.submitted = true;
    this.usersService.updateUserStatus(this.userStatusModel)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          console.log(data['message']);
          this.alertService.success(data['message']);
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.spinner.hide();
        });
  }

  editUser() {
    this.submitted = true;
    console.log(this.userDetail);
    this.usersService.editUser(this.userDetail)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          console.log(data);
          this.alertService.success('User has been updated successfully');
          this.onEnter(this.searchTerm);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        });
  }

  getOrg(orgId: string) {
    this.spinner.show();
    this.orgService.getOrg(orgId)
      .pipe(map(
        (org) => {
          const orgD = org['Organization Details'];
          console.log(orgD);
          return orgD;
        }
      ))
      .subscribe(
        data => {
          this.orgDetail = data;
          this.orgDetail.country = 'Australia';
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.spinner.hide();
        });
  }

  addCustomer() {
    this.spinner.show();
    this.orgDetail.orgEntityType = 'O';
    this.orgDetail.parentMemberId = '-2001';
    console.log(this.orgDetail);
    this.orgService.saveOrg(this.orgDetail)
      .pipe(map(
        (res) => {
          return res;
        }
      ))
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          this.closeModal();
          this.alertService.success('Customer Added Successfully');
        },
        error => {
          this.spinner.hide();
          this.alertService.error(error);
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

  getOrgEntryId(value: any) {
    this.IdKey = this.customerList.findIndex(function(item, i) {
      return item.orgEntityName === value;
    });
    if (this.IdKey !== -1) {
      this.userDetail.parentMemberId = this.customerList[this.IdKey].orgEntityId;
    }
  }

  getOrgEntryName(value: any) {
    this.IdKey = this.customerList.findIndex(function(item, i) {
      return item.orgEntityId === value;
    });
    if (this.IdKey !== -1) {
      return this.selectedId = this.customerList[this.IdKey].orgEntityName;
    }
  }
}
