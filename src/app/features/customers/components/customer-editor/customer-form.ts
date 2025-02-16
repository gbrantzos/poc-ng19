import { FormControl, FormGroup, Validators } from '@angular/forms';

export type CustomerForm = {
  id: FormControl<string>;
  code: FormControl<string>;
  fullName: FormControl<string>;
  tin: FormControl<string>;
  dueAt: FormControl<Date>;
  balance: FormControl<number>;
  overdue: FormControl<boolean>;
  comments?: FormControl<string | null>;
};

const TIN_MIN_LENGTH = 3;

export const createCustomerForm = (): FormGroup<CustomerForm> => {
  return new FormGroup<CustomerForm>({
    id: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    code: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tin: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(TIN_MIN_LENGTH)]
    }),
    dueAt: new FormControl(new Date(), { nonNullable: true, validators: [Validators.required] }),
    balance: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    overdue: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
    comments: new FormControl<string | null>(null)
  });
};
