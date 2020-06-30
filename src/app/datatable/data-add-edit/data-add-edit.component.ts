import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DataService} from '../shared/data.service';
import { InputService } from '../shared/input.service';
import { InputOption } from '../shared/input.model';

@Component({
  selector: 'app-data-add-edit',
  templateUrl: './data-add-edit.component.html',
  styleUrls: ['./data-add-edit.component.css']
})
export class DataAddEditComponent implements OnInit {
  editIndex:number;
  mode:string;
  itemForm:FormGroup;
  options:InputOption;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private dataService:DataService,
      private inputService:InputService ) { }

  ngOnInit(): void {
    this.options=this.inputService.getInputOption();
    this.activatedRoute.params.subscribe(
      (params:Params)=>{
        if(params.id != null){
          this.editIndex=+params.id;
          this.mode='Edit';
        }
        else{
          this.mode='Add';
        }
        this.formInit();
      }
    )
  }

  formInit(){
    var employee_name='';
    var employee_age;
    var employee_salary;
    //let recipeIngredients=new FormArray([]);
    if(this.mode=='Edit'){
      this.dataService.getUser(this.editIndex).subscribe(data => {
        let item = data;
        employee_name=item.name;
        employee_age=item.age;
        employee_salary=item.salary;
        this.itemForm=new FormGroup({
          'name':new FormControl(employee_name,Validators.required),
          'age':new FormControl(employee_age,Validators.required),
          'salary':new FormControl(employee_salary,Validators.required)
        })
      });
    }
    else{
      this.itemForm=new FormGroup({
        'name':new FormControl(employee_name,Validators.required),
        'age':new FormControl(employee_age,Validators.required),
        'salary':new FormControl(employee_salary,Validators.required)
      })
    }    
  }

  executeCallback(callback: Function) : void {
    callback();
  }

  onSubmit(){
    if(this.mode=='Add'){
      this.dataService.addItem(this.itemForm.value)
      .subscribe(response => {
          console.log(response);
          this.executeCallback(this.options.events.added);
          this.onCancel();
      });
    }
    else{
      this.dataService.getUser(this.editIndex).subscribe(data => {
        let item = data;
        item.name = this.itemForm.value.name;
        item.age = this.itemForm.value.age;
        item.salary = this.itemForm.value.salary;
        this.dataService.updateItem(item,this.editIndex).subscribe(data1 => {
          this.executeCallback(this.options.events.edited);
          this.onCancel();
        });
      });
      // this.dataService.updateItem(this.itemForm.value,this.editIndex)
      // .subscribe(response => {
      //   console.log(response);
      //   this.onCancel();
      // });
    }
  }

  onCancel(){
    this.router.navigate(['']);
  }

}
