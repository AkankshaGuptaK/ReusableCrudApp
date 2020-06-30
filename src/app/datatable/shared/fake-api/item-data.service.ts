import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Item} from './item-data';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class ItemData implements InMemoryDbService {
  createDb(){
    const items: Item[]=[
      { id: 1, name: 'Ram',age: 20,salary:200000 , email: 'ram@gmail.com', contact: '0000000000'  },
      { id: 2, name: 'Shyam',age: 25,salary:250000, email: 'sh@gmail.com', contact: '1111111111'  },
      { id: 3, name: 'Mohan', age: 30,salary:300000, email: 'moh@live.in', contact: '2222222222'  },
      { id: 4, name: 'Rohan', age: 35,salary:350000, email: 'rohan@gmail.com', contact: '6666666666' },
      { id: 5, name: 'Sumit', age: 40,salary:400000, email: 'sumit@live.in', contact: '9909999999'  }

    ];
    return {items};
  }
}