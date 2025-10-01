import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import {NgIf, NgFor, NgClass, CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ChatMessage, PerplexityService} from '../services/PerplexityService';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss'],
  imports: [CommonModule,FormsModule, NgClass]
})
export class AiAssistantComponent implements AfterViewInit {
  question = '';
  loading = false;
  dragging = false;
  history: ChatMessage[] = [];
  isOpen = false;

  @ViewChild('chatInput') chatInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatHistory') chatHistory!: ElementRef<HTMLDivElement>;

  constructor(private perplexity: PerplexityService) {}

  ngAfterViewInit() {
    this.focusInput();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.focusInput();
      this.scrollToBottom();
    }
  }

  ask() {
    if (!this.question.trim() || this.loading) return;
    this.history.push({ role: 'user', content: this.question });
    this.loading = true;
    this.perplexity.askWithHistory(this.getFullHistory()).subscribe({
      next: (res: string) => {
        this.history.push({ role: 'assistant', content: res });
        this.loading = false;
        this.scrollToBottom();
      },
      error: () => {
        this.history.push({ role: 'assistant', content: 'Błąd komunikacji z Perplexity' });
        this.loading = false;
        this.scrollToBottom();
      }
    });
    this.question = '';
    this.scrollToBottom();
  }

  getFullHistory(): ChatMessage[] {
    return [
      { role: 'system', content: 'Odpowiadaj krótko i rzeczowo.' },
      ...this.history
    ];
  }

  resetChat() {
    this.history = [];
    this.question = '';
    this.focusInput();
  }

  focusInput() {
    setTimeout(() => this.chatInput?.nativeElement.focus(), 0);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatHistory) {
        this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
      }
    }, 0);
  }
}
