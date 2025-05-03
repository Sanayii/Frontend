export interface EditCustomerDTO {
  id: string;         // lowercase 'id'
  fName: string;      // lowercase 'f'
  lName: string;      // lowercase 'l'
  age: number;
  city: string;
  street: string;
  government: string;
  email: string;
  phoneNumber: string[];
}
