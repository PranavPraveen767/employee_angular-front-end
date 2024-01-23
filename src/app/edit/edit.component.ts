import { APP_ID, Component, OnInit } from '@angular/core';
import { employeeModal } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  employee:employeeModal={}
  sampleEmployee:any=""
  constructor(private route:ActivatedRoute, private api:AdminapiService,private router:Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      /* console.log(res.id); */
      const{id}=res
      console.log(id);
      this.viewEmployee(id)
      
      
      
    })
    
  }
  viewEmployee(id:any){
    this.api.viewEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employee=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    
  }


  editEmployee(id:any){
    this.api.updateEmployeeApi(id,this.employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title:"Employee Updated Successfully",
          icon:"success"

        })
        this.router.navigateByUrl('employees')
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  cancelButton(id:any){
    this.viewEmployee(id)
  }

}
