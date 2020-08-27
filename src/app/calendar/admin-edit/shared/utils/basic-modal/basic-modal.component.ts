import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { formUtils } from 'src/app/shared/utils/code/form.utils';
import { KeyValueObject } from 'src/app/shared/models/calendar.model';

@Component({
  selector: 'basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicModalComponent implements OnInit, OnDestroy {
  @ViewChild('myModal', { static: true }) myModal;
  @Input() title: string;
  @Input() disableButton: boolean = false;
  @Input() headerText: string;
  @Input() formData: object;
  @Output() sendRowToAdd: EventEmitter<object> = new EventEmitter<object>();
  @Output() sendRowToEdit: EventEmitter<object> = new EventEmitter<object>();
  tableRow: FormGroup;
  minDate: Date;
  private modalRef;
  private $unsubscribe: Subject<void> = new Subject<void>();
  constructor(private modalService: ModalManager, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.minDate = new Date(Date.now());
    this.createForm(this.formData);
    console.log(this.formData);
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  get information(): FormArray {
    return this.tableRow.get('information') as FormArray;
  }

  openModal() {
    this.modalRef = this.modalService.open(this.myModal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }

  lockSpefificCharsOnIntegers(event: KeyboardEvent): void {
    formUtils.inputLockCommaAndPointerOnKeyDown(event);
    formUtils.inputLockENumberOnKeyDown(event);
    formUtils.inputLockNegativeNumberOnKeyDown(event);
  }

  editRow() {
    this.sendRowToEdit.emit(this.information.value);
  }

  addRow() {
    this.sendRowToAdd.emit(this.information.value);
  }

  closeModal() {
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
  }

  private createForm(data: any): void {
    this.tableRow = this.formBuilder.group({
      information: this.formBuilder.array([])
    });
    let validators;
    validators = Validators.required;
    for (const key in data) {
        key !== 'driver' ? this.information.push(this.formBuilder.control('')) : this.information.push(this.formBuilder.control('', validators));
    }
  }

  private prepareDataToSend(data: any[]): KeyValueObject[] {
    const arr = [];
    for (const key in data) {
      if (true) {
        arr.push({ key: Object.keys(this.formData)[key], value: data[key] });
      }
    }
    return arr;
  }
}
