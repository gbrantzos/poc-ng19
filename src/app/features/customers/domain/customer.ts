export type CustomerID = string;

export interface Customer {
  id: CustomerID;
  code: string;
  fullName: string;
  tin: string;
  dueAt?: Date;
  balance: number;
  overdue: boolean;
}
