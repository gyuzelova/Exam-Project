import { Component, Input } from '@angular/core';
import { ErrorComponent } from './core/error/error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fish-world';
//   constructor(public error: ErrorComponent) {}
// @Input('message') message = this.error.errorMsg;
}
