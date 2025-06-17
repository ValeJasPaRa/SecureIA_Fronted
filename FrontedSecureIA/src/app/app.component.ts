import { Component } from '@angular/core';
import { RolComponent } from "./components/rol/rol.component";

@Component({
  selector: 'app-root',
  imports: [ RolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontedSecureIA';
}
