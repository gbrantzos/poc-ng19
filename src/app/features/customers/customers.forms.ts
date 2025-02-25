import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';

export type CustomersForms = {
  id: FormControl<string>;
  code: FormControl<string>;
  fullName: FormControl<string>;
  tin: FormControl<string>;
  dueAt: FormControl<DateTime>;
  balance: FormControl<number>;
  overdue: FormControl<boolean>;
  comments?: FormControl<string | null>;
};

const TIN_MIN_LENGTH = 3;

export const createCustomerForm = (): FormGroup<CustomersForms> => {
  return new FormGroup<CustomersForms>({
    id: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    code: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tin: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(TIN_MIN_LENGTH)]
    }),
    dueAt: new FormControl(DateTime.now(), { nonNullable: true, validators: [Validators.required] }),
    balance: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    overdue: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    comments: new FormControl<string | null>(null)
  });
};
