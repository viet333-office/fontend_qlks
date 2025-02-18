import { Component, OnInit } from '@angular/core';
import { Users } from '../../Interface/users';
import { UserServiceService } from '../../Service/logic/users-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user: Users  = {
    email: '',
    password: ''
  };
constructor(private userService: UserServiceService){}
ngOnInit(): void {
  
}

login(user:Users){
this.userService.loginAcc(user).subscribe(response => {
  console.log('Đăng nhập thành công!', response);
}, error => {
  console.log('Đăng nhập thất bại!', error);
});
}
}
