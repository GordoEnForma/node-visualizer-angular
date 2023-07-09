import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-zoom-container',
    template: `
    <div class="container">
      <div class="zoom-button" (click)="zoomOut()">
        <span>-</span>
      </div>
      <div class="zoom-value">
        {{ zoomLevel * 100 }}%
      </div>
      <div class="zoom-button" (click)="zoomIn()">
        <span>+</span>
      </div>
    </div>
  `,
    styles: [
        `
    .container {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      /* border: 1px solid black; */
      border-radius: 10px;
      padding: 10px;
      box-shadow: 0.5px 1px 0px 2px #C9B5A5;
    }

    .zoom-button {
      cursor: pointer;
      margin: 0 10px;
      padding: 5px;
    }

    .zoom-value {
      font-weight: bold;
      margin: 0 5px;
    }
    span {
        font-size: 1.5rem;
    }
    `
    ]
})
export class ZoomContainerComponent implements OnChanges {
    //   zoomLevel = 100;
    @Input() zoomLevel: number;
    @Output() changeZoomLevel = new EventEmitter<number>();

    zoomContainerStyle = {};

    round(num:number) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.zoomLevel && !changes.zoomLevel.firstChange) {
            console.log(this.round(changes.zoomLevel.currentValue) );
            this.zoomLevel = this.round(changes.zoomLevel.currentValue);
        }
        this.updateContainerStyle();
    }
    zoomIn() {
        if (this.zoomLevel === 4) return;
        this.zoomLevel += 0.1;
        this.zoomLevel = this.round(this.zoomLevel);
        this.changeZoomLevel.emit(this.zoomLevel);
        this.updateContainerStyle();
    }

    zoomOut() {
        if (this.zoomLevel === 0.1) return;
        this.zoomLevel -= 0.1;
        this.zoomLevel = this.round(this.zoomLevel);
        this.changeZoomLevel.emit(this.zoomLevel);
        this.updateContainerStyle();
    }
    private updateContainerStyle(): void {
      const nodeContainer = document.querySelector('app-node-container');
      if (nodeContainer) {
        const nodeContainerWidth = nodeContainer.firstElementChild.clientWidth;
        this.zoomContainerStyle = { right: `${nodeContainerWidth + 20}px` };
        console.log(nodeContainerWidth);
      } else {
        this.zoomContainerStyle = {};
      }
    }
}
