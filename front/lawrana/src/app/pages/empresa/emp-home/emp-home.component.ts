import { Component } from '@angular/core';
import { NavigatorComponent } from '../../../shared/navigator/navigator.component';
import { ViewerComponent } from '../../../shared/viewer/viewer.component';

@Component({
  selector: 'app-emp-home',
  standalone: true,
  imports: [NavigatorComponent, ViewerComponent],
  templateUrl: './emp-home.component.html',
  styleUrl: './emp-home.component.css'
})
export class EmpHomeComponent {

}
