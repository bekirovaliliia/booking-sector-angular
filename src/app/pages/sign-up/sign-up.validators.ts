import { FormControl, FormGroup } from '@angular/forms';

export class SignUpValidators {
  static validatePhone(c: FormControl) {
    const operatorsUkraineCode: string[] = [
      '050',
      '066',
      '095',
      '099',
      '039',
      '067',
      '068',
      '096',
      '097',
      '098',
      '063',
      '093',
      '091',
      '092',
      '094',
      '073'
    ];

    const phone = c.value;
    const operator = phone[0] + phone[1] + phone[2];
    if (phone.length > 3) {
      const coincidence = operatorsUkraineCode.filter(x => x === operator);
      if (coincidence.length < 1) {
        return { validatePhone: true };
      }
    }
    return null;
  }

  static validateEmail(c: FormControl) {
    const email = c.value;

    if (email.length > 8) {
      if (email.includes('@')) {
        if (email.includes('.')) {
          const firstPartEmail = email.split('@', 2);
          const twoPartEmail = firstPartEmail[1].split('.', 2);

          if (email === 'test@gmail.com' || email === 'test@test.com') {
            return { validateEmail: true };
          }

          if (
            firstPartEmail[0] === twoPartEmail[0] &&
            firstPartEmail[0] === twoPartEmail[1] &&
            twoPartEmail[0] === twoPartEmail[1]
          ) {
            return { validateEmail: true };
          }
        }
      }
    }
    return null;
  }

  static validatePassword(c: FormControl) {
    const password = c.value;
    if (password.length > 5) {
      if (
        password.includes('111111') ||
        password.includes('123456') ||
        password.includes('qwerty') ||
        password.includes('000000') ||
        password.includes('password')
      ) {
        return { validatePassword: true };
      }
    }

    return null;
  }

  static validatePasswords(passwordForm: string, confirmForm: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordForm].value;
      const confirm = group.controls[confirmForm].value;

      if (
        password !== '' &&
        confirm !== '' &&
        password.length > 5 &&
        confirm.length > 5
      ) {
        if (password !== confirm) {
          return {
            validatePasswords: true
          };
        }
      }
    };
  }

  static validateName(firstNameForm: string, lastNameForm: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const firstName = group.controls[firstNameForm].value;
      const lastName = group.controls[lastNameForm].value;

      if (firstName !== '' && lastName !== '') {
        if (firstName === lastName) {
          return {
            validateName: true
          };
        }
      }
    };
  }
}

