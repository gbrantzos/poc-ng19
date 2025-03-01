import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldDefinition, FieldValidator } from '@poc/shared/components/dynamic-form/dynamic-form.component';
import { DateTime } from 'luxon';

export const createDynamicForm = (fields: FieldDefinition[]): FormGroup => {
  const form = new FormGroup({});

  fields.forEach(f => {
    let control: FormControl;
    switch (f.kind) {
      case 'text':
      case 'textarea':
        control = new FormControl('', {
          nonNullable: !f.nullable
        });
        break;
      case 'checkbox':
        control = new FormControl<boolean>(false, {
          nonNullable: !f.nullable
        });
        break;
      case 'date':
        control = new FormControl<DateTime>(DateTime.now(), {
          nonNullable: !f.nullable
        });
        break;
      case 'select':
        control = new FormControl('', {
          nonNullable: !f.nullable
        });
        break;
      default:
        throw new Error(`Unsupported field kind: ${f.kind}`);
    }
    if (f.validators) {
      control.addValidators(prepareValidators(f.validators));
    }
    form.addControl(f.name, control);
  });

  return form;
};

function prepareValidators(validators?: FieldValidator[]) {
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
