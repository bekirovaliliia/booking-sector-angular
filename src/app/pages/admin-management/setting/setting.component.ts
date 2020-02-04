import { Component, OnInit } from '@angular/core';
import { Setting } from '../../../shared/models/setting.model';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {

  setting$: Setting[];

  constructor(private  settingService: SettingsService) {
  }
  ngOnInit() {
    return this.settingService.getSettings().subscribe(data => this.setting$ = data);
  }

  saveChanges(): void {
    this.setting$.forEach(s => this.settingService.updateSetting(s).subscribe());
  }
}

