import { Component, Input } from '@angular/core';
import { cards } from '../flow';
@Component({
    selector: 'app-gotoblock-detail',
    template: `
    <div class="detail">
        <h2>Tipo de Card:</h2>
        <span>{{ cards[node.info.pluginid]?.name }}</span>
      
        <!-- Aquí puedes mostrar la información adicional del nodo -->
        <h2>Condicional:</h2>
        <span>{{node.info.config?.conditionenabled  ? 'Sí' : 'No'}}</span>
        <h2>Redirigir a bloque cuando no cumple validación:</h2>
        <span>{{node.info.config?.redirectonfailure ? 'Sí' : 'No'}}</span>
    </div>
  `,
    styles: [
        `
    .detail {
    }

    h2 {
        font-weight: 700;
        font-size: 1rem;
        margin:25px 0 1px;
        padding:0;
    }

    span {
        font-size: 1.5rem;
    }
    `
    ]
})
export class GoToBlockComponent {
    //   zoomLevel = 100;
    @Input() node: any;
    cards = cards;

}
