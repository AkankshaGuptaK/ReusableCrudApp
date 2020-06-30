import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ map } from 'rxjs/operators';
import { GetResponse } from 'src/app/datatable/shared/reponse.model';
import { InputService } from '../shared/input.service';
import { InputOption } from '../shared/input.model';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  options:InputOption;
  datatableData=[];
  closeResult: string;

  constructor(private http:HttpClient,private inputService:InputService, private router:Router,
              private dataService:DataService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.options=this.inputService.getInputOption();
    this.getItems();
  }

  getItems(){
    this.dataService.getItems().subscribe(response=>{
      console.log("Response "+JSON.stringify(response));
      this.datatableData=response;
    })
  }

  
  onAddClick(){
    this.router.navigate(['/add']);
  }

  onEdit(index:number){
    this.router.navigate(['/edit',index]);
  }

  executeCallback(callback: Function) : void {
    callback();
  }
  
  onDelete(index:number){
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    this.executeCallback(this.options.events.deleted);
    this.dataService.deleteItem(index).subscribe(data => {
      this.getItems();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
