import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent {
  @Input() content!: string;
  @Input() isSender!: boolean;
}
