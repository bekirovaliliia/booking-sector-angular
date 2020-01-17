import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { find, get, pull } from 'lodash';

@Component({
  selector: 'app-sectors-tags-input',
  templateUrl: './sectors-tags-input.component.html',
  styleUrls: ['./sectors-tags-input.component.scss']
})
export class SectorsTagsInputComponent implements OnInit {

  constructor(private formBuider: FormBuilder) { }
  tags: string[] = ['10', '11', '12', '13', '14'];
  form: FormGroup;

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.form.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
  }

  ngOnInit() {
    this.form = this.formBuider.group({
      tag: [undefined],
    });
  }
}
