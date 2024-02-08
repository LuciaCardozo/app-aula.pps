import { Component, OnInit, ViewChild } from '@angular/core';
import { ScrollToBottomDirective } from 'src/app/scroll-to-bottom.directive';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  styles: [
    `
    :host {
      font-size: 2em;
    }

    .my-list {
      overflow: auto;
    }
    `,
  ],
})

export class ChatPage implements OnInit {
  @ViewChild(ScrollToBottomDirective)
  scroll?: ScrollToBottomDirective;
  spinnerShow: boolean = false;
  mostrarChat=false;
  nombreJuego:any = this.shared.tituloDeChat;
  lista:any = [];
  data:any=this.shared.tituloDeChat == 'Aula PPS 4°A' ? 'chatAhorcado' : 'chatPreguntados';
  nuevoMensaje = {
    emisor: "",
    mensaje : "",
    horario: Date.now()
  };
  usuarioActual:any;
  mensaje:any;
  constructor(private database:AuthService, public shared:SharedService) {}

  async ngOnInit() {
    console.log(this.shared.tituloDeChat)
    this.usuarioActual = this.database.emailUsuarioLogeado;
    try{
      this.spinnerShow = true;
      const res = await this.database.traerTodo(this.data);
      res?.subscribe((listaref:any) => {
      this.lista = listaref.map((userRef:any) => userRef.payload.doc.data());
      //Lo ordeno por date
      this.spinnerShow = false;
      return this.lista.sort((a:any, b:any) => new Date(a.horario).getTime() - new Date(b.horario).getTime());
     });
    }catch(error){
      this.spinnerShow = false;
      console.log("nose pudo subscribir la lista",error);
    }
  }

  mensajeChat(){
    this.nuevoMensaje = {
      emisor: this.usuarioActual,
      mensaje : this.mensaje,
      horario: Date.now()
    }
    //alert(JSON.stringify(this.nuevoMensaje));
    this.database.alta(this.data, this.nuevoMensaje);
    this.mensaje = "";
  }
  

}
