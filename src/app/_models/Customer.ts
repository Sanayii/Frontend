export interface Customer {
  id: string;
  fName: string;
  lName: string;
  age: number;
  city: string;
  street: string;
  government: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  userPhones: string[];
}