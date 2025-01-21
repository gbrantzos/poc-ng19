export type CustomerID = string;

export type Customer = {
  id: CustomerID;
  code: string;
  fullName: string;
  tin: string;
  dueAt: Date;
  balance: number;
  overdue: boolean;
};
