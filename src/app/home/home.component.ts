import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users, UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  users:Users[]=[];
  constructor(private userService: UserserviceService){}

  ngOnInit(): void {
      this.users=this.userService.getUsers()
      this.userService.usersChanges.subscribe(users=>{
        this.users=users;
        console.log(this.users)
      })
  }

  
  onUpdate(id){
        
  }

  onDelete(id){
    this.userService.deleteUser(id);
  }

  ngOnDestroy(): void {
      // this.userSubscription.unsubscribe
  }
}
