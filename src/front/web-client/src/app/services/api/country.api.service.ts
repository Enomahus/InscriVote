import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCountriesResponse } from '../nswag/api-nswag-client';
import { ApiBaseService } from './api-base.service';
import { ApiToastOptions } from './models/api-toast-options';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends ApiBaseService {
  getCountries(options: ApiToastOptions = {}): Observable<GetCountriesResponse[]> {
    return this.apiClient.getCountries().pipe(this.handleDataResult(options));
  }
}
