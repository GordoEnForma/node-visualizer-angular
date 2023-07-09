import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-actions-container',
    template: `
    <div class="container">
    <div>
        <button
          class="button"
          [ngClass]="{ active: moveCondition}"
          (click)="navigateButtonClicked()"
        >
          <span [ngClass]="{ active: moveCondition}">Mover</span>
        </button>
      </div>
      <div>
        <button
          class="button"
          [ngClass]="{ active: !moveCondition }"
          (click)="selectButtonClicked()"
        >
          <span [ngClass]="{ active: !moveCondition }">Seleccionar</span>
        </button>
      </div>
      
    </div>
  `,
    styles: [
        `
    .container {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 5rem;
      left: 2rem;
      border-radius: 15px;
      display: flex;
      height: 100px;
      border: 1.5px solid black;
      background-color: white;
      color: black;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
    }

    .button {
      background-color: transparent;
      border: none;
      color: black;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid black;
      transition: 0.3s;
    }

    .button.active {
      background-color: #9510AC;
      color: white;
    }

    .button span {
      margin-left: 0.5rem;
    }

    .button span.active {
      color: white;
    }
    `,
    ],
})
export class ActionsContainerComponent {
    @Output() toggleMoveGraph = new EventEmitter<void>();
    @Input() moveCondition: boolean = true;
    selectButtonClicked() {
      this.toggleMoveGraph.emit();
    }
  
    navigateButtonClicked() {
      this.toggleMoveGraph.emit();
    }
}
