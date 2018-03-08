import { Injectable, EventEmitter } from "@angular/core";


@Injectable()
export class UtilService {

    userAccountInfo: EventEmitter<any> = new EventEmitter<any>();
    
}