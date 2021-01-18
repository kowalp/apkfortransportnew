import { Component, OnInit, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal;
  @Input() data: object;
  @Input() title: string;
  @Input() description: string;
  @Output() sendData: EventEmitter<object> = new EventEmitter<object>();
  private modalRef;
  constructor(private modalService: ModalManager) { }

  ngOnInit() {
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
  confirm() {
    this.sendData.emit(this.data);
    this.modalService.close(this.modalRef);
  }

  closeModal() {
    this.modalService.close(this.modalRef);
  }
}
