import { Component, Input, OnInit } from '@angular/core';
declare  var  require: any;
@Component({
  selector: 'app-without-datas',
  templateUrl: './without-datas.component.html',
  styleUrls: ['./without-datas.component.sass']
})
export class WithoutDatasComponent implements OnInit {
  imgFish = require('../images/fish.jpg');
  @Input() withoutDatasText: string;
  constructor() { }

  ngOnInit() {
  }

}
