import { ConexionService } from './../../services/conexion.service';
import { Messages } from './../../models/messages';
import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: Messages;
  constructor( public Cs: ConexionService) { }

  ngOnInit(): void {
  }

}
