import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../_services/chat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // Component State
  isChatboxOpen = false;
  messageText = '';
  textareaRows = 1;
  isLoading = false;
  maxMessageLength = 500;
  isTyping = false

  // Message History
  messages: { type: 'sent' | 'received', text: string, time: string }[] = [];

  // Template References
  @ViewChild('chatContent') chatContent!: ElementRef;
  @Output() chatboxOpened = new EventEmitter<boolean>();

  constructor(private chatService: ChatService) {}

  // Public Methods (called from parent)
  public openChat(): void {
    if (!this.isChatboxOpen) {
      this.toggleChatbox();
    }
  }

  public closeChat(): void {
    if (this.isChatboxOpen) {
      this.toggleChatbox();
    }
  }

  // UI Handlers
  toggleChatbox(): void {
    this.isChatboxOpen = !this.isChatboxOpen;
    this.chatboxOpened.emit(this.isChatboxOpen);
    if (this.isChatboxOpen) {
      this.scrollBottom();
    }
  }

  onInputChange(): void {
    this.textareaRows = Math.min(6, Math.max(1, this.messageText.split('\n').length));
  }

  onSubmit(): void {
    if (this.isValid(this.messageText)) {
      this.writeMessage();
      this.sendToApi();
    }
  }

  // Core Logic
  private isValid(value: string): boolean {
    const trimmed = value.replace(/\n/g, '').replace(/\s/g, '');
    return trimmed.length > 0 && trimmed.length <= this.maxMessageLength;
  }

  private writeMessage(): void {
    this.messages.push({
      type: 'sent',
      text: this.formatMessageText(this.messageText.trim()),
      time: this.getCurrentTime()
    });
    this.messageText = '';
    this.textareaRows = 1;
    this.scrollBottom();
  }

  private sendToApi(): void {
    this.isLoading = true;

    this.chatService.sendMessage(this.messages[this.messages.length - 1].text).subscribe({
      next: (response) => this.handleApiSuccess(response),
      error: (error) => this.handleApiError(error),
      complete: () => this.isLoading = false
    });
  }

  // Helpers
  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private formatMessageText(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  private scrollBottom(): void {
    setTimeout(() => {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    }, 50);
  }

  // Response Handlers
  private handleApiSuccess(response: { status: string, response: string }): void {
    this.isTyping = true;

    setTimeout(() => {
      const responseText = response?.response || 'Thank you for your message!';

      this.messages.push({
        type: 'received',
        text: this.formatMessageText(responseText),
        time: this.getCurrentTime()
      });

      this.isTyping = false;
      this.scrollBottom();
    }, 1000);
  }


  private handleApiError(error: HttpErrorResponse): void {
    let errorMessage = 'Sorry, we encountered an error. Please try again later.';

    if (error.status === 400) {
      errorMessage = error.error?.message || 'Please check your message and try again.';
    } else if (error.status === 0) {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    this.messages.push({
      type: 'received',
      text: errorMessage,
      time: this.getCurrentTime()
    });
  }
}
