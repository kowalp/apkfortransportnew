import { FormGroup } from '@angular/forms';
import { MainService } from './../../shared/services/main.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit, OnDestroy {
  @Input() formData: any;
  @Input() formType: string;
  reservationForm: FormGroup;
  private $unsubscribe: Subject<void> = new Subject<void>();

  constructor(private mainService: MainService) { }

  ngOnInit() {
    if(this.formData) {
      this.mainService.createForm(this.formType);
      this.watchFormChanges();
    }
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  updateValue(event: any, key: string): void {
    this.reservationForm.patchValue({[key]: event.target.value});
  }

  private watchFormChanges(): void {
    this.reservationForm.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.$unsubscribe)
    )
      .subscribe((value: any) => {
      });
  }
}
