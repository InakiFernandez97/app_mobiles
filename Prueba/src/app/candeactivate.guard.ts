import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
export interface CanComponentDeactivate {
canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
providedIn: 'root',
})
export class CanDeactivateGuard implements
CanDeactivate<CanComponentDeactivate> {
canDeactivate(
compone nt: CanComponentDeactivate
): Observable<boolean> | Promise<boolean> | boolean {
return component && component.canDeactivate ? component.canDeactivate() :
true;
}
}