import { Injectable } from '@angular/core';
import { InputOption } from './input.model';

@Injectable({providedIn:'root'})
export class InputService{
    private inputOption:InputOption;

    getInputOption(){
        return this.inputOption;
    }

    setInputOption(inputOption:InputOption){
        this.inputOption=inputOption;
    }

}