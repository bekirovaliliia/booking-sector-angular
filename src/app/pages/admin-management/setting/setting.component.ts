import { Component, OnInit } from '@angular/core';
import { Setting } from '../../../shared/models/setting.model';
import { SettingsService } from '../../../core/services/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {

  setting$: Setting[];

  constructor(private  settingService: SettingsService,
              private toastr: ToastrService,) {
  }
  ngOnInit() {
    return this.settingService.getSettings().subscribe(data => this.setting$ = data);
  }

  saveChanges(): void {
    this.setting$.forEach(s => this.settingService.updateSetting(s).subscribe());
    this.toastr.success('Settings changed successfully');
  }
}

