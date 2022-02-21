export interface User {
  username: string;
  handle: string;
  img: string;
}

export enum PopUpType {
  EMPTY = "",
  LOADING = "loading",
  USERS = "users",
  ERROR = "error",
}
