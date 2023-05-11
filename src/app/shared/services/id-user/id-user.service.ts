import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdUserService {

  @Output() id_document: EventEmitter<String> = new EventEmitter()

  constructor() { }

}
