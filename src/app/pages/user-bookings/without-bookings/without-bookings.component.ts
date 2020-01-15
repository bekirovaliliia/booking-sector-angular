import { Component, OnInit } from '@angular/core';

declare  var  require: any;
@Component({
  selector: 'app-without-bookings',
  templateUrl: './without-bookings.component.html',
  styleUrls: ['./without-bookings.component.sass']
})
export class WithoutBookingsComponent implements OnInit {

  imgFish = require('../../../shared/images/fish.jpg');
  constructor() { }

  ngOnInit() {
  }

}
