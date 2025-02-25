import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { JsonPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Injectable, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MatCheckbox } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MatOption } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { LookupItem } from '@poc/core/services/lookup.service';

export type FieldKind = 'text' | 'date' | 'checkbox' | 'select' | 'textarea';

export type FieldDefinition = {
  name: string;
  kind: FieldKind;
  label: string;
  hidden?: boolean;
  placeholder?: string;
  hint?: string;
  class?: string | string[];
  style?: string;
  lookupName?: string;
  multiSelect?: boolean;
  textAreaOptions?: TextAreaOptions;
  validators?: Validators[];
};

export type FormDefinition = {
  name: string;
  label?: string;
  fields: FieldDefinition[];
};

export type TextAreaOptions = {
  rows?: number;
  maxRows?: number;
};

export type FieldValidator = {
  name: 'min' | 'max' | 'required' | 'requiredTrue' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  args?: string | number;
};

@Injectable()
class CustomDataAdapter extends LuxonDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
}

const CALENDAR_FORMATS = {
  parse: {
    dateInput: 'd/M/yyyy'
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM yyyy'
  }
};

@Component({
  selector: 'poc-dynamic-form',
  imports: [
    CdkTextareaAutosize,
    JsonPipe,
    MatCheckbox,
    MatFormField,
    MatError,
    MatInput,
    MatLabel,
    NgClass,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatSuffix,
    MatSelect,
    MatOption
  ],
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CALENDAR_FORMATS },
    { provide: DateAdapter, useClass: CustomDataAdapter }
  ],
  host: { class: 'flex flex-col h-full overflow-y-auto' }
})
export class DynamicFormComponent {
  formDefinition = input<FormDefinition | null>(null);
  formGroup = input.required<FormGroup>();
  lookups = input<Record<string, readonly LookupItem[]>>({});
  isLoading = input<boolean>(false);

  lookupRefresh = output<string>();

  firstVisible = computed(() => {
    const definition = this.formDefinition();
    const fields = definition?.fields ?? [];
    return (fields.find(f => !f.hidden) ?? fields[0]).name;
  });

  public get model() {
    return this.formGroup().getRawValue();
  }

  public focus() {
    //console.log('focus', this.fields());
  }

  protected hasErrors(key: string): boolean {
    const control = this.formGroup().controls[key];
    return control && control.invalid && (control.dirty || control.touched);
  }

  protected getErrorMessage(name: string, label?: string): string {
    const control = this.formGroup().controls[name];
    if (!control || !control.errors) {
      return '';
    }

    const keyName = label || this.toCapitalFirst(name);
    let errorMessage = `Errors on ${keyName}`;
    if (control.errors['required']) {
      errorMessage = `${keyName} is required`;
    }
    if (control.errors['min']) {
      errorMessage = `${keyName} must be bigger than ${control.errors['min'].min}`;
    }
    if (control.errors['max']) {
      errorMessage = `${keyName} must be less than ${control.errors['max'].max}`;
    }
    if (control.errors['minlength']) {
      errorMessage = `${keyName} must be bigger than  ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      errorMessage = `${keyName} must be less than ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control.errors['pattern']) {
      errorMessage = `${keyName} does not match pattern`;
    }
    if (control.errors['email']) {
      errorMessage = `${keyName} is not a valid email`;
    }

    return errorMessage;
  }

  private toCapitalFirst = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

  private static mapValidators(validators: FieldValidator[]) {
    const formValidators = [];

    for (const validation of validators ?? []) {
      switch (validation.name) {
        case 'required':
          formValidators.push(Validators.required);
          break;
        case 'requiredTrue':
          formValidators.push(Validators.requiredTrue);
          break;
        case 'min':
          formValidators.push(Validators.min(validation.args as number));
          break;
        case 'max':
          formValidators.push(Validators.max(validation.args as number));
          break;
        case 'minLength':
          formValidators.push(Validators.minLength(validation.args as number));
          break;
        case 'maxLength':
          formValidators.push(Validators.maxLength(validation.args as number));
          break;
        case 'pattern':
          formValidators.push(Validators.pattern(validation.args as string));
          break;
        case 'email':
          formValidators.push(Validators.email);
          break;
      }
    }
    return formValidators;
  }
}
