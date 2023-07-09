import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NodeContainerComponent } from './node-container/node-container-component';
import { ActionsContainerComponent } from './actions-container/actions-container.component';
import { ZoomContainerComponent } from './zoom-container/zoom-container.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeContainerComponent,
    ActionsContainerComponent,
    ZoomContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxGraphModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
