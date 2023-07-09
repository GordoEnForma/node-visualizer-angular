import { Component, Input } from '@angular/core';
import { cards } from '../flow';
@Component({
  selector: 'app-node-container',
  template: `
    <div class="container" *ngIf="node">
      <ng-container [ngSwitch]="node.info.pliginod"]>
        
        <ng-container *ngSwitchDefault>
        <!-- Mostrar mensaje por defecto si el tipo de nodo no coincide con ningún caso -->
        <h2>Información adicional no disponible</h2>
        </ng-container>
      </ng-container>
      <button class="close-button" (click)="close()">X</button>
      
    </div>
  `,
  styles: [
    `
    .container {
      width: 20%;
      height: 100vh;
      position: fixed;
      border: 1.5px solid black;
      top: 0;
      
      right: 0;
      background-color: white;
      padding: 20px;
      /* box-sizing: border-box; */
      overflow-y: scroll;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color:#ffffff;
        border-radius:50%;
        border: none;
        /* border:1px solid #7721AD; */
        display:inline-block;
        cursor:pointer;
        color:#9510AC;
        font-family:Arial;
        font-size:17px;
        font-weight: bold;
        padding:10px 10px;
        text-decoration:none;
        text-shadow:0px 1px 0px #2f6627;
      
    }
    .close-button:hover {
        color: #ffffff;
        background-color:#af5fbf;
    }

    `
  ]
})
export class NodeContainerComponent {
  @Input() node: any;
  cards = cards;

  close() {
    // Agrega aquí la lógica para cerrar el contenedor del nodo
    this.node.isOpen = false;
  }
}
