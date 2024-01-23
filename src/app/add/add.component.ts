import { Component } from '@angular/core';
import { employeeModal } from '../employee.model';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private api:AdminapiService,private router:Router){}
  //variable to store the value from the input box which have the same structure of model
 employee:employeeModal={}

 cancelEmp(){
  this.employee={}
 }
 addEmployee(){
  console.log(this.employee);
  

if(!this.employee.name || !this.employee.id || !this.employee.email || !this.employee.status){
  Swal.fire({
    icon:'info',
    title:"OOppss....",
    text:"Please Fill In the form Completely"
    
  });
} 
else{
  this.api.addEmployeeApi(this.employee).subscribe({
    next:(res:employeeModal)=>{
      console.log(res);
      Swal.fire({
   icon:"success",
    title:"Employee added Successfully",
      })
      this.router.navigateByUrl('employees');
      
    },
    error:(res:any)=>{
      console.log(res);
         Swal.fire({
                icon:"error",
                  title:"Error"
      })
      
    }
  })
  
}
  
 }

}
