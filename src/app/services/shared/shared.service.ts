import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  tituloDeChat: string = '';
  spinner: boolean = false;
  constructor() { }

  showSpinner() {
    this.spinner = true;
  }

  hiddenSpinner() {
    this.spinner = false;
  }
}
