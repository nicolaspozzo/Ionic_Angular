import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  constructor(public deseoService: DeseosService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/agregar/${lista.id}`);
    }


  }
  borrarLista(lista: Lista) {

    this.deseoService.borrarLista(lista);

  }

  async editarLista(lista: Lista) {

    const alert = await this.alertCtrl.create({

      header: 'Edita Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.tiltulo;
            this.deseoService.guardarStorage();
            console.log(lista.titulo);

          }
        }
      ]
    });

    alert.present();


  }
}


