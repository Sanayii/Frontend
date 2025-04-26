import { CommonModule } from '@angular/common';
import { Component ,ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  isChatboxOpen = false;
  dropdownOpen = false;
  messageText = '';
  textareaRows = 1;

  messages: { type: 'sent' | 'received',text: string, time: string }[] = [];

  @ViewChild('chatContent') chatContent!: ElementRef;


  @Output() chatboxOpened = new EventEmitter<boolean>(); // <-- هذا الجديد

  toggleChatbox() {
    this.isChatboxOpen = !this.isChatboxOpen;
    this.chatboxOpened.emit(this.isChatboxOpen); // <-- نخبر الأب بالحالة الجديدة
  }

  openChat() {
    this.isChatboxOpen = true;
    this.chatboxOpened.emit(true);
  }

  closeChat() {
    this.isChatboxOpen = false;
    this.chatboxOpened.emit(false);
  }






  onInputChange() {
    const lineCount = this.messageText.split('\n').length;
    this.textareaRows = Math.min(6, lineCount);
  }

  onSubmit() {
    if (this.isValid(this.messageText)) {
      this.writeMessage();
      setTimeout(() => this.autoReply(), 1000);
    }
  }

  isValid(value: string): boolean {
    const trimmed = value.replace(/\n/g, '').replace(/\s/g, '');
    return trimmed.length > 0;
  }

  getCurrentTime(): string {
    const now = new Date();
    const pad = (num: number) => (num < 10 ? '0' + num : num);
    return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  writeMessage() {
    this.messages.push({
      type: 'sent',
      text: this.messageText.trim().replace(/\n/g, '<br>'),
      time: this.getCurrentTime()
    });
    this.messageText = '';
    this.textareaRows = 1;
    this.scrollBottom();
  }

  autoReply() {
    this.messages.push({
      type: 'received',
      text: 'Thank you for your awesome support!',
      time: this.getCurrentTime()
    });
    this.scrollBottom();
  }

  scrollBottom() {
    setTimeout(() => {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    });
  }

  formatMessageText(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  //

}
