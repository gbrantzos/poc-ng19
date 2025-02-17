import { DateTime } from 'luxon';

export type CustomerID = string;

export type Customer = {
  id: CustomerID;
  code: string;
  fullName: string;
  tin: string;
  dueAt: DateTime;
  balance: number;
  overdue: boolean;
};
