import { Component, OnInit } from '@angular/core';
import { User } from '../../Interface/users';
import { UserServiceService } from '../../Service/logic/users-service.service';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  user: User  = {
  firstname:'',
  lastname:'',
  email:'',
  password:'',
  role:''
  };
constructor(private userService: UserServiceService , private router: Router){}
ngOnInit(): void {
  
}


register(user: User) {
  this.userService.register(user).subscribe(response => {
    console.log("Đăng ký thành công!", response);
    this.router.navigate(['/login']); 
  }, error => {
    console.error("Đăng ký thất bại!", error);
  });
}
}
