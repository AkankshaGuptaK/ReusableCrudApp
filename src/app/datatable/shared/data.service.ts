import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputOption } from './input.model';
import { InputService } from './input.service';
import { FormGroup } from '@angular/forms';
import { GetResponse } from './reponse.model';
import { map, tap, catchError } from 'rxjs/operators';
import {Item} from './fake-api/item-data';
import { throwError, Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataService{
    option:InputOption;
    apiurl = 'api/items';  
    items:Item[];
    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
        httpOptions = {
        headers: this.headers
    };
    constructor(private http:HttpClient,private inputService:InputService){

    }
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }

    getItems(): Observable<Item[]>{
        // if(this.items.length){
        //     return this.items;
        // }
        // else{
            this.option=this.inputService.getInputOption();
            return this.http.get<Item[]>(this.option.BaseAPIUrl+'/'+this.option.Get).pipe(
                tap(data => {
                    this.items=data;
                    console.log(data);
                }),
                catchError(this.handleError)
            )
        // }
    }

    getUser (id: number): Observable<Item> {
        const url = `${this.apiurl}/${id}`;
        return this.http.get<Item>(url).pipe(
            catchError(this.handleError)
            );
        }

    getItem(index:number){
        return this.items[index];
    }

    updateItem(item:Item,id:number):Observable<Item>{
        this.option=this.inputService.getInputOption();
        const url = `${this.apiurl}/${id}`;
        return this.http
        .put<Item>(
            url,
            item,
            this.httpOptions
        ).pipe(
            map(() => item),
            catchError(this.handleError)
        );
    }

    addItem(item:Item): Observable<Item>{
        this.option=this.inputService.getInputOption();
        item.id=null;
        return this.http.post<Item>(this.option.BaseAPIUrl+'/'+this.option.add, item, this.httpOptions).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    deleteItem (id: number): Observable<Item> {
        const url = `${this.apiurl}/${id}`;
        return this.http.delete<Item>(url, this.httpOptions).pipe(
          catchError(this.handleError)
        );
      }

}