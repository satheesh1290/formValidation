import { Subject } from 'rxjs';

export interface Users {name: string, email: string, phone: number }


export class UserserviceService {

usersChanges=new Subject<Users[]>()
  private users:Users[]=[];

  constructor() { }

  getUsers(){
    const localdata=localStorage.getItem('users');
    if(localdata !=null){
      this.users=JSON.parse(localdata);
      return this.users;
    }else{
      return this.users;
    }
    
  }

  getUser(id:number){
   return this.users[id];
  }

  addUsers(users:Users){
    this.users.push(users);
    localStorage.setItem('users', JSON.stringify(this.users))
    this.usersChanges.next(this.users)
  }

  updateUser(id:number, user:Users){
    this.users[id]=user;
  }

  deleteUser(id:number){
    this.users.splice(id, 1);
    this.usersChanges.next(this.users)
  }
}

