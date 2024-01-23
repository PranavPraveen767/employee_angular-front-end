import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModal } from '../employee.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  employeedetails: employeeModal[] = [];
  searchkey: string = '';

  /* for pagination */
  p: number = 1;
  constructor(private api: AdminapiService) {}
  //lifecycle hook - call just after the component is created and constructor is called
  ngOnInit(): void {
    this.allEmployee();
  }

  allEmployee() {
    this.api.getAllEmployeeApi().subscribe({
      next: (res: any) => {
        this.employeedetails = res;
        console.log(this.employeedetails);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  removeEmployee(id: any) {
    this.api.deleteEmployeeApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allEmployee();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  sortId() {
    this.employeedetails.sort((a: any, b: any) => a.id - b.id);
  }

  sortName() {
    this.employeedetails.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  generatePdf() {
    /* create an object */
    const pdf = new jsPDF();
    let head = [['ID', 'Employee Name', 'E Mail', 'Status']];
    let body: any = [];
    this.employeedetails
      .filter((item) => item.id !== '1')
      .forEach((item) => {
        body.push([
          item.id,
          item.name,
          item.email,
          item.status === '1' ? 'Active' : 'Inactive',
        ]);
      });

    /* fontSize */
    pdf.setFontSize(16);
    pdf.setFont('sans-serif');
    /* titile */
    pdf.text('Employee Details', 10, 10);
    /* table */
    autoTable(pdf, { head, body });
    /* to open in a new tab */
    pdf.output('dataurlnewwindow');

    /* save and download */
    pdf.save('Employee.pdf');
  }
}
