
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { User } from '../shared/models/user-model';

export class OldPwdValidators {
  static shouldBe1234(control: AbstractControl, user: User) : Promise<ValidationErrors | null> {
    return new Promise((resolve,reject) => {
        if(control.value !== user.password)
          resolve({ shouldBe1234: true });
        else 
          resolve(null);
    });    
  }

  static matchPwds(control: AbstractControl) {
    let newPwd2 = control.get('newPwd');
    let confirmPwd2 = control.get('confirmPwd');
    if(newPwd2.value !== confirmPwd2.value){
      return { pwdsDontMatch: true };
    }
    return null;
  }
}