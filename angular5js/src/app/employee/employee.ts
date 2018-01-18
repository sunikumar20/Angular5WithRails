export class Employee {
  public id: number;
  public firstname: string = 'abc';
  public lastname: string = 'last abc';
  public image: File;
    constructor(firstname, lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
    }
  }
  