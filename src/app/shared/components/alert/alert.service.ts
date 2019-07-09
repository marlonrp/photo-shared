import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  public alertSubject: Subject<Alert> = new Subject<Alert>();
  public keepAfterRouteChange = false;

  public successMessage(
    message: string,
    keepAfterRouteChange: boolean = false
  ) {
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  public warningMessage(
    message: string,
    keepAfterRouteChange: boolean = false
  ) {
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }

  public dangerMessage(message: string, keepAfterRouteChange: boolean = false) {
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }

  public infoMessage(message: string, keepAfterRouteChange: boolean = false) {
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  private alert(
    alertType: AlertType,
    message: string,
    keepAfterRouteChange: boolean
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  public getAlert() {
    return this.alertSubject.asObservable();
  }

  private clear() {
    this.alertSubject.next(null);
  }
}
