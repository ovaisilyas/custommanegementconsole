import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search.service';
import {map} from 'rxjs/operators';
import {UsersService} from '../../services/users.service';
import { ProductService } from '../../services/product.service';
import {CategoryListModel} from '../../model/categorylist.model';
import {AlertService} from '../../services/alert.service';
import {ViewChild, ElementRef} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductListModel } from '../../model/product.modal';

@Component({
  selector: 'app-products-price',
  templateUrl: './products-price.component.html',
  styleUrls: ['./products-price.component.css']
})
export class ProductsPriceComponent implements OnInit {
  categoryList: CategoryListModel[];
  productList: ProductListModel[];
  loading = true;
  selectedId = '';
  IdKey = 0;
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private usersService: UsersService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
  }

  onEnter(value: string) {
    this.spinner.show();
    this.searchTerm = value;
    this.searchService.searchProduct(value)
      .pipe(map(
        (product) => {
          const searchDetails = product['SearchDetails'];
          const searchList = searchDetails['SearchList'];
          return searchList;
        }
      ))
      .subscribe(
        data => {
          this.productList = data;
          this.alertService.clear();
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          if (this.productList !== undefined) {
            this.productList.length = 0;
          }
          this.spinner.hide();
        });
  }

  getCategory() {
    this.productService.getCategory()
      .pipe(map(
        (category) => {
          const categoryList = category['categoryList'];
          console.log(categoryList);
          return categoryList;
        }
      ))
      .subscribe(
        data => {
          this.categoryList = data;
          this.loading = false;
        },
        error => {
          console.log('Unable to Fetch Category');
        });
  }

  openContract(value: any) {
    this.productService.getContractDetail(value);
  }

  getCategoryId(value: any) {
    this.IdKey = this.categoryList.findIndex(function(item, i) {
      return item.identifier === value;
    });
    if (this.IdKey !== -1) {
      this.categoryList = this.categoryList[this.IdKey].uniqueID;
    }
  }

  getOrgEntryName(value: any) {
    this.IdKey = this.categoryList.findIndex(function(item, i) {
      return item.uniqueID === value;
    });
    if (this.IdKey !== -1) {
      return this.selectedId = this.categoryList[this.IdKey].identifier;
    }
  }

}
