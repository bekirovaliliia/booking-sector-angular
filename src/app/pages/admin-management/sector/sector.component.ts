import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.sass']
})
export class SectorComponent implements OnInit {
  searchText: string;
  opened: boolean;
  mode = new FormControl('side');
  constructor() { }

  ngOnInit() {
  }
}
