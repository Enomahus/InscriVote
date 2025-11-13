import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCitiesFromPostCodeResponse } from '../nswag/api-nswag-client';
import { ApiBaseService } from './api-base.service';
import { ApiToastOptions } from './models/api-toast-options';

@Injectable({
  providedIn: 'root',
})
export class CityService extends ApiBaseService {
  getCitiesByPostCode(
    postCode: string,
    options: ApiToastOptions = {}
  ): Observable<GetCitiesFromPostCodeResponse[]> {
    return this.apiClient.getCitiesByPostalCode(postCode).pipe(this.handleDataResult(options));
  }
}
