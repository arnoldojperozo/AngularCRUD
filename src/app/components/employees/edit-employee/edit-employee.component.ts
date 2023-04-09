import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeesService} from "../../../services/employees.service";
import {Employee} from "../../../models/employee.model";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id) {
          this.service.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
            }
          });
          }
      }
    })
  }

  updateEmployee() {
    this.service.updateEmployee(this.employeeDetails.id, this.employeeDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['employees'])
        }
      });
  }

  deleteEmployee(id: string) {
    this.service.deleteEmployee(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['employees']);
        }
      });
  }
}
