import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InvoiceMailerService} from '../../services/invoice-mailer.service';
import {Comment} from '../../models/comment.model';

@Component({
  selector: 'app-product-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss']
})
export class ProductCommentsComponent implements OnInit {
  @Input() productId!: string;

  comments: (Comment & { createdAtDate: Date })[] = [];
  isLoading = true;
  isSubmitting = false;

  newComment = {
    author: '',
    text: '',
    rating: 0
  };

  constructor(private commentService: InvoiceMailerService) {
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.isLoading = true;
    this.commentService.getCommentsByProductId(this.productId).subscribe({
      next: (comments) => {
        this.comments = comments
          .map(c => ({
            ...c,
            createdAtDate: new Date((c as any).createdDate ?? (c as any).createdAt)
          }))
          .sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime());
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addComment(): void {
    if (this.newComment.author.trim() &&
      this.newComment.text.trim() &&
      this.newComment.rating > 0) {
      this.isSubmitting = true;

      this.commentService.addComment({
        productId: this.productId,
        author: this.newComment.author.trim(),
        text: this.newComment.text.trim(),
        rating: this.newComment.rating,
        createdDate: this.getNowString()
      }).subscribe({
        next: (newComment) => {
          this.comments.unshift({
            ...newComment,
            createdAtDate: new Date((newComment as any).createdDate ?? (newComment as any).createdAt)
          });
          this.resetForm();
          this.isSubmitting = false;
        },
        error: () => {
          alert('Nie udało się dodać komentarza. Spróbuj ponownie.');
          this.isSubmitting = false;
        }
      });
    }
  }

  setRating(rating: number): void {
    this.newComment.rating = rating;
  }

  getRatingStars(rating: number): { filled: boolean }[] {
    return Array.from({length: 5}, (_, i) => ({filled: i < rating}));
  }

  resetForm(): void {
    this.newComment = {author: '', text: '', rating: 0};
  }

  trackByCommentId(index: number, comment: Comment): any {
    return (comment as any).id || index;
  }

  private getNowString(): string {
    const now = new Date();
    const pad = (n: number) => `${n}`.padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
}
