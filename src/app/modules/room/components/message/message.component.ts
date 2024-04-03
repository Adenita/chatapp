import {Component, Input} from '@angular/core';
import {MessageTransport} from "../../../../shared/models/message";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent {
  @Input() isSender!: boolean;
  @Input() message!: MessageTransport
  dateFormat: string = 'hh:mm - EEEE, MMMM d Y';

  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date) {
    return this.datePipe.transform(date, this.dateFormat);
  }
}
