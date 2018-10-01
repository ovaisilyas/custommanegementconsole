import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {UserlistModel} from '../../model/userlist.model';
import {UserRole} from '../../model/roles.model';
import {UsersService} from '../../services/users.service';
import {UserDetailEditModel} from '../../model/userdetailedit.model';
import {CustomerlistModel} from '../../model/customerlist.model';
import {UserDetailModel} from '../../model/userdetail.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ResetPasswordModel} from '../../model/resetpassword.model';
import {UserStatusModel} from '../../model/userstatus.model';
import {AlertService} from '../../services/alert.service';
import {OrgDetailModel} from '../../model/orgdetail.model';
import {OrgService} from '../../services/org.service';

@Component({
  selector: 'app-users-org',
  templateUrl: './users-org.component.html',
  styleUrls: ['./users-org.component.css']
})
export class UsersOrgComponent implements OnInit {
  customerList: CustomerlistModel[];
  itemList: UserlistModel[];
  roleList: UserRole[];
  userDetail = new UserDetailModel('', '', '', '', ''
    , '', []);
  userRoles = new UserRole('-29');
  userDetailEdit = new UserDetailEditModel('', '', '', '', ''
    , '', []);
  submitted = false;
  userEditForm: FormGroup;
  resetPassModel: ResetPasswordModel;
  userStatusModel: UserStatusModel;

  orgDetail = new OrgDetailModel('', '', '', '', '', '', '-2001', '', 'O');

  constructor(
    private searchService: SearchService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private orgService: OrgService,
  ) {}

  ngOnInit() {
    this.getCustomers();
    this.userEditForm = this.formBuilder.group({
      parentMemberId: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email1: new FormControl(''),
      phone1: new FormControl(''),
      userId: new FormControl(''),
      roles: this.formBuilder.array([]),
    });
  }

  onEnter(value: string) {
    this.searchService.searchData(value)
      .pipe(map(
        (users) => {
          const searchDetails = users['SearchDetails'];
          const searchList = searchDetails['SearchList'];
          for (const user of searchList) {
            this.roleList = user['UserRole'];
          }
          return searchList;
        }
      ))
      .subscribe(
        data => {
          this.itemList = data;
          this.alertService.clear();
        },
        error => {
          console.log(error);
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
        },
        error => {
          console.log(error);
        });
  }

  getUser(userId: string) {
    this.usersService.getUser(userId)
      .pipe(map(
        (user) => {
          console.log(user);
          return user;
        }
      ))
      .subscribe(
        data => {
          this.userDetailEdit = data;
          this.userEditForm.patchValue(data);
          this.userEditForm = this.formBuilder.group({
            parentMemberId: new FormControl(this.userDetailEdit.parentMemberId)
          });
        },
        error => {
          console.log(error);
        });
  }

  onSaveUser() {
    this.submitted = true;
    this.userDetail.roles.push(this.userRoles);
    console.log(this.userDetail);
    this.usersService.saveUser(this.userDetail)
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

  resetPassword(logonId: string) {
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
          console.log(data);
          this.alertService.success(data);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        });
  }

  updateUserStatus(userId: string, status: string) {
    if (status === '1') {
      status = '0';
    } else {
      status = '1';
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
        },
        error => {
          console.log(error);
          this.alertService.error(error);
        });
  }

  editUser() {
    this.submitted = true;
    console.log(this.userDetailEdit);
    this.usersService.editUser(this.userDetailEdit)
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

  getOrg(orgId: string) {
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
        },
        error => {
          console.log(error);
        });
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
