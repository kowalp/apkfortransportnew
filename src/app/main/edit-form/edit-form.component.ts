import { KeyValueObject } from './../../shared/models/calendar.model';
import { SVGIconEnum } from './../../shared/enums/svg-icons.enum';
import { FormModel, TripCategory } from './../../shared/Interfaces/Form.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MainService } from './../../shared/services/main.service';
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { formUtils } from 'src/app/shared/utils/code/form.utils';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnDestroy {
  @Input() formFields: TripCategory[];
  counter: number = 0;
  reservationForm: FormGroup;
  disableNext: boolean;
  minDate: Date;
  displayData: boolean = false;
  formData: TripCategory[];

  readonly xIcon: SVGIconEnum = SVGIconEnum.X;
  readonly tickIcon: SVGIconEnum = SVGIconEnum.TICK;
  private $unsubscribe: Subject<void> = new Subject<void>();
  @ViewChild('container', { static: false }) container: ElementRef;
  constructor(private formBuilder: FormBuilder, private mainService: MainService, private renderer: Renderer2) { }

  ngOnInit() {
    this.minDate = new Date(Date.now());
    this.mainService.setFormsData();
    this.mainService.getFormsDataAsObservable().subscribe((data: FormModel) => {
      const arr = this.formFields;
      this.formData = this.formFields;
      data.tripCategory.forEach(element => {
        arr.push(element);
      });
      // TODO: Decice If we should keep number of ppl as dropdown or just text field
      // arr.push(data.numberOfPeople);
      this.formData = arr;
      this.createForm(this.formData);
      this.watchFormChanges();
      console.log(this.formData);
    });
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  previousState(): void {
    this.counter--;
    this.disableNext = false;
  }

  nextState(): void {
    if (this.counter + 2 > this.formData.length) {
      this.disableNext = true;
    } else {
      this.counter++;
    }
  }

  get information(): FormArray {
    return this.reservationForm.get('information') as FormArray;
  }

  lockSpefificCharsOnIntegers(event: KeyboardEvent): void {
    formUtils.inputLockCommaAndPointerOnKeyDown(event);
    formUtils.inputLockENumberOnKeyDown(event);
    formUtils.inputLockNegativeNumberOnKeyDown(event);
  }

  private createForm(data: TripCategory[]): void {
    this.reservationForm = this.formBuilder.group({
      information: this.formBuilder.array([])
    });
    let validators;
    data.forEach((item) => {
      if (item.inputType === 'email') {
        validators = item.optional ? Validators.email : [Validators.required, Validators.email];
        this.information.push(this.formBuilder.control(localStorage.getItem('email') ? localStorage.getItem('email') : '', validators));
      } else if (item.inputType === 'phone') {
        validators = item.optional ? Validators.pattern('[0-9]+') : [Validators.required, Validators.pattern('[0-9]+')];
        this.information.push(this.formBuilder.control('', validators));
      } else if (item.inputType === 'number') {
        validators = item.optional ? Validators.pattern('[0-9]+') : [Validators.required, Validators.max(100), Validators.pattern('[0-9]+')];
        this.information.push(this.formBuilder.control('', validators));
      } else {
        validators = item.optional ? null : Validators.required;
        this.information.push(this.formBuilder.control('', validators));
      }
    });
  }

  onSubmit(): void {
    this.mainService.sendTripForm(this.prepareDataToSend(this.information.value));
  }

  private watchFormChanges(): void {
    this.reservationForm.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.$unsubscribe)
    )
      .subscribe((value: any) => {
        const data  = value.information.filter( item => item !== '' && item !== null);
        this.displayData = data.length > 0;
        const dropdownValues = value.information.filter(item => item.value);
        if (dropdownValues.length === 2) {
          for (const key in value.information) {
            if (value.information[key].value) {
              this.information.at(+key).patchValue({ key : 'Choose either transfer or trip', value: null});
            }
          }
        }
      });
  }

  private prepareDataToSend(data: any[]): KeyValueObject[] {
    const arr = [];
    const form = this.formData;
    for (const key in data) {
      if (true) {
        arr.push({ key: form[key].key, value: data[key] });
      }
    }
    return arr;
  }
}
