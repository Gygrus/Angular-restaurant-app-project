
export interface User {
  uid: string;
  email: string;
  displayName: string;
  dishesOrdered: string[];
  orderHist: string[][];
  isBanned: boolean;
  roles: string[];
}
