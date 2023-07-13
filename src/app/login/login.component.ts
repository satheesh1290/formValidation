import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  isLoggedin=false;
  id:number;
  editMode=false;

  loginForm!: FormGroup;

  constructor(private userService: UserserviceService,
              private route:ActivatedRoute,
              private router:Router){}

  ngOnInit(): void {
      this.route.params
      .subscribe((params:Params)=>{
            this.id=+params['id'];
            this.editMode=params['id']!=null;
            this.initForm();
      })

      
  }

  onSubmit(){   
  //  this.loginForm.reset();
  }

  onLogin(){
    this.isLoggedin=!this.isLoggedin;
 if(this.userService.getUsers().find(e=>e.email===this.loginForm.value['email'] || e.phone===this.loginForm.value['phone'])) {
   alert('Logged in successfully');
 }else{
  alert('please register');
 } 
  }



  onRegister(){
    if(!this.userService.getUsers().find(e=>e.email===this.loginForm.value['email'] || e.phone===this.loginForm.value['phone'])) {
      this.userService.addUsers(this.loginForm.value) 
    }else{
     alert('user already exists');
    }
   }

   onUpdate(){
    if(this.editMode){
      this.userService.updateUser(this.id, this.loginForm.value)
      this.router.navigate(['/'])
   }else{
    this.router.navigate(['/login'])
   }
  }

  get user(){
    return this.loginForm.get('name')
  }

  get email(){
    return this.loginForm.get('email')
  }

  get phone(){
    return this.loginForm.get('phone')
  }
  private initForm(){
    let name='';
    let email='';
    let phone:number;
    if(this.editMode){
    const user=this.userService.getUser(this.id)
    name=user.name;
    email=user.email;
    phone=user.phone;
    }
    this.loginForm=new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.pattern('[a-zA-Z% ]*'), Validators.minLength(4)]),
      email: new FormControl(email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9.-_%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
      phone: new FormControl(phone, [Validators.required, Validators.pattern('[0-9]{10}')])
    });
   }
}
