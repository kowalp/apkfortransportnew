import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReportsData } from './reports.model';
import { MainService } from 'src/app/shared/services/main.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { KeyValueObject } from 'src/app/shared/models/calendar.model';

@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.scss']
})
export class ReportsContentComponent implements OnInit, OnDestroy {
  @Input() data: ReportsData;
  reportsForm: FormGroup;
  maxDateFrom: Date;
  minDateTo: Date;
  formData: ReportsData;
  driversList: Array<string>;
  roleList: KeyValueObject[] = [
    { key: 'full', value: 'full' },
    { key: 'tour', value: 'tour' },
    { key: 'transfer', value: 'transfer' }
  ];
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private mainService: MainService) { }

  ngOnInit() {
    console.log(this.data);
    this.createForm(this.data);
    if (this.data.driver) this.mainService.getDrivers(+localStorage.getItem('id'));
    this.mainService.setDriversAsObservable().subscribe((data: Array<string>) => this.driversList = data);
    this.formData = this.data;
    this.watchFormChanges();
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  onSubmit(): void {
    this.mainService.sendTripForm(this.information.value);
  }

  get information(): FormArray {
    return this.reportsForm.get('information') as FormArray;
  }

  private createForm(data: ReportsData): void {
    this.reportsForm = this.formBuilder.group({
      information: this.formBuilder.array([])
    });
    let validators;
    validators = Validators.required;
    for (const key in data) {
      key !== 'driver' ? this.information.push(this.formBuilder.control('')) : this.information.push(this.formBuilder.control('', validators));
    }
    console.log(this.reportsForm);
  }

  private watchFormChanges(): void {
    this.reportsForm.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.$unsubscribe)
    )
      .subscribe((value: any) => {
        const data = value.information.filter(item => item !== '' && item !== null);
        console.log(data, value)
      });
  }

}
