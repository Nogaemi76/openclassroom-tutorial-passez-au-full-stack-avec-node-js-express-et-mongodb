import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-part-three',
  templateUrl: './part-three.component.html',
  styleUrls: ['./part-three.component.scss']
})
export class PartThreeComponent implements OnInit, OnDestroy {

  constructor(private state: StateService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuth$.next(false);
    this.auth.userId = '';
    this.auth.token = '';
    this.state.part$.next(3);
    this.state.part = 3;
  }

  ngOnDestroy() {
  }

}
