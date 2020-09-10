import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private state: StateService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.state.part$.subscribe(
                (part) => {
                  if (part === 3) {
                    this.router.navigate(['/part-three/auth/login']);
                  } else if (part === 4) {
                    this.router.navigate(['/part-four/auth/login']);
                  }
                }
              );
            }
            observer.next(true);
          }
        );
      }
    );
  }
}
