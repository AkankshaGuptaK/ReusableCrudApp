import { Component, OnInit } from '@angular/core';
import { InputOption } from 'src/app/datatable/shared/input.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reusable crud app';
  options = {
    BaseAPIUrl: "api",  
    Get: "items", //calls---> http://dummy.restapiexample.com/api/v1/employees
    edit: "update/:id",
    add: "items",
    delete: "delete",
    dataTableOptions: {
  Columns:[  {name: "Name", data: "employee_name" ,format:"text"},
   {name: "Age", data: "employee_age", format:"number"},
   {name: "Salary", data: "employee_salary",format:"amount" }]   
    },
    events: {    
      edited: function () {console.log("Edited called");},
      added: function () {console.log("Added called");},
      deleted: function () {console.log("Deleted called");},  }
  };

  inputOptionObj:InputOption=<InputOption>(this.options);

  ngOnInit(){

  }
  
}
