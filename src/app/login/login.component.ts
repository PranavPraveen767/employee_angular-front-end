import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""
  adminName:any=""

  constructor(private api:AdminapiService ,private route:Router){}

  login(){
    if(!this.email || !this.password){
      alert('Please Fill the form');

    }
    else{
     

      this.api.authorization().subscribe({
        next: (res: any) => {
          const { email, password } = res;
          if (email === this.email && password === this.password) {
            Swal.fire({
              title: 'Login Successfull',
              icon: 'success',
            });
            this.api.updateddata({d:true})
            localStorage.setItem("name", res.name)
            localStorage.setItem("password",res.password)

            this.route.navigateByUrl('dashboard');
          } else {
            Swal.fire({
              title: 'Invalid email or password',
              icon: 'error',
            });
          }
        },
        error: (res: any) => {
          console.log(res);
        },
      });
    }
    

  }

}
