import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public part$ = new BehaviorSubject<number>(0);
  public part = 0;
  public mode$ = new BehaviorSubject<string>('');
}
