export class User {
  username: string = '';
  password: string = '';
  email: string = '';
  isLoggedIn: boolean = false;
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
