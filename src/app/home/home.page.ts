import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private shared:SharedService, private router: Router) {}

  seHizoClick(valor: string){
    this.shared.tituloDeChat = valor == '4A' ? 'Aula PPS 4°A' : 'Aula PPS 4°B';
    this.router.navigate(['/chat'])
  }
}
