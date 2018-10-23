import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('WCToken').length === 0) {
      this.router.navigate(['/login']);
    }
  }

}
