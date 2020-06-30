import { Component, OnInit, Input } from '@angular/core';

import { InputOption } from 'src/app/datatable/shared/input.model';
import { Router } from '@angular/router';
import { InputService } from './shared/input.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @Input() options:InputOption;
  
  constructor(private router:Router, private inputService:InputService) { }

  ngOnInit(): void {
    console.log(this.options)
    this.inputService.setInputOption(this.options);    
  }


}
