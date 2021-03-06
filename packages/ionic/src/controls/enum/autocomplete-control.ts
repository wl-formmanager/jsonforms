/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { Component } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsState } from '@jsonforms/core';

@Component({
  selector: 'jsonforms-autocomplete-control',
  template: `
    <ion-item no-padding no-lines>
      <ion-label stacked>{{ label }}</ion-label>
      <ion-label stacked *ngIf="error" color="error">{{ error }}</ion-label>
      <ionic-selectable
        item-content
        [ngModel]="data"
        [items]="options"
        [canSearch]="true"
        (onChange)="onChange($event)"
      >
        <ng-template ionicSelectablePlaceholderTemplate>
          {{ description }}
        </ng-template>
      </ionic-selectable>
    </ion-item>
  `
})
// TODO pressing ESC twice causes crash, see https://github.com/ionic-team/ionic/issues/11776
export class AutoCompleteControlRenderer extends JsonFormsControl {
  options: any[];

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
  }

  mapAdditionalProps() {
    this.options = this.scopedSchema.enum;
  }
}
