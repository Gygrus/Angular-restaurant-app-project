// export interface Roles {
//   client?: boolean;
//   manager?: boolean;
//   admin?: boolean;
// }


export interface User {
  uid: string;
  email: string;
  displayName: string;
  dishesOrdered: string[];
  orderHist: string[][];
  roles: string[];
}
