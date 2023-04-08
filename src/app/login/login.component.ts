import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {
      sessionStorage.clear();
  }

  userdata:any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required])),
    //password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    password: this.builder.control('', Validators.compose([Validators.required]))
  });
  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetBycode(this.loginform.value.id).subscribe(result => {
        this.userdata = result;
        if(this.userdata.password == this.loginform.value.password){
          if(this.userdata.isactive){            
            sessionStorage.setItem('username',this.userdata.id);
            sessionStorage.setItem('userrole',this.userdata.role);
            this.toastr.success('Welcome ' + this.userdata.name,'Login successfully')
          }else{
            this.toastr.error('Inactive user, please contact sys admin','Login denied')  
          }
          this.router.navigate([''])
        }else{
          this.toastr.error('Invalid password','Login denied')
        }        
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
