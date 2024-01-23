import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  activeNo: number = 0;
  inactiveNo: number = 0;
  adminName: any = '';
  AdminDetails: any = {};

  constructor(private api: AdminapiService) {
    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Employee Status',
      },
      tooltip: {
        valueSuffix: '%',
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7,
              },
              filter: {
                operator: '>',
                property: 'percentage',
                value: 10,
              },
            },
          ],
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Employees',
          colorByPoint: true,
          data: [
            {
              name: 'Active',
              y: 8,
            },
            {
              name: 'Inactive',
              y: 4,
            },
          ],
        },
      ],
    };
    HC_exporting(Highcharts);
  }

  ngOnInit(): void {
    this.getAllEmployees();
    if (localStorage.getItem('name')) {
      this.adminName = localStorage.getItem('name');
    }

    this.api.authorization().subscribe((res: any) => {
      this.AdminDetails = res;
      if(res.picture){
        this.profileImage=res.picture
      }
    });
  }

  empLength: number = 0;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};
  selected: Date | null = new Date();
  profileImage: string = './assets/images/profilepic.png';
  editAdminStatus: boolean = false;

  employees: any = [];

  showSidebar: boolean = true;

  menuBar() {
    this.showSidebar = !this.showSidebar;
  }

  getAllEmployees() {
    this.api.getAllEmployeeApi().subscribe({
      next: (res: any) => {
        this.empLength = res.length;
        this.employees = res;
        this.activeNo = res.filter((item: any) => item.status === '1').length;

        this.inactiveNo = res.filter((item: any) => item.status === '0').length;
      },
      error: (res: any) => {
        console.log(res);
      },
    });
  }

  edit() {
    this.editAdminStatus = true;
  }

  editt() {
 this.api.authorization().subscribe((res: any) => {
   this.AdminDetails = res;
   if (res.picture) {
     this.profileImage = res.picture;
   }
 });

 this.editAdminStatus = false;  }

  getFile(event: any) {
    let imgdetails = event.target.files[0];
    console.log(imgdetails);
    //create an object for gfilereader() class
    let fr= new FileReader()

    //read
    fr.readAsDataURL(imgdetails);

    //convert
    fr.onload=(event:any)=>{
      this.profileImage=event.target.result
    this.AdminDetails.picture = this.profileImage;

    }
  }
  updateAdmin(){
    this.api.updateAdminapi(this.AdminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: 'success',
          title:'Wow',
          text:'Admin updates successfully'
        })
        localStorage.setItem("name",res.name)
        localStorage.setItem("pswd",res.pswd)
        this.adminName=localStorage.getItem
        
      },
      error:(err:any)=>{
        console.log(err);
         Swal.fire({
          icon: 'success',
          title:'Error',
          text:'error'
         })
        
      }
    })

  }


  

}
