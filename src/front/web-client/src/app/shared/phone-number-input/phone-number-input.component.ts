import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { CountryCode, parsePhoneNumberWithError } from 'libphonenumber-js';
import { CountryISO, NgxIntlTelInputModule, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-phone-number-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, NgxIntlTelInputModule],
  templateUrl: './phone-number-input.component.html',
  styleUrl: './phone-number-input.component.scss',
})
export class PhoneNumberInputComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true })
  labelForId!: string;
  @Output() controlPhone = new EventEmitter<FormControl>();

  separateDialCode = false;
  searchCountryField = SearchCountryField;
  countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    this.countryISO.France,
    this.countryISO.UnitedKingdom,
    this.countryISO.UnitedStates,
    this.countryISO.China,
  ];

  @Input()
  readonly = false;

  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
  });

  public ngOnInit(): void {
    this.controlPhone.emit(this.phoneForm.controls.phone);
  }

  public onPhoneChange(): void {
    if (!this.control.value || this.control.errors) {
      return;
    }
    const value = this.control.value;
    const phoneNumber = this.formatPhoneNumber(this.control.value, value.countryCode);
    this.control.setValue(phoneNumber);
  }

  public formatPhoneNumber(phone: string, countryCode: CountryCode = 'FR'): string {
    const phoneNumber = parsePhoneNumberWithError(phone, countryCode);
    const formatedNumber = phoneNumber.formatInternational();
    return formatedNumber;
  }
}
