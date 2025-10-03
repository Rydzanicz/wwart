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
  selectedPhotoPath: string | null = null;

  newComment = {
    author: '',
    text: '',
    rating: 0
  };

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  fileError: string = '';

  constructor(private commentService: InvoiceMailerService) {
  }

  ngOnInit(): void {
    this.loadComments();
  }

  openImageModal(photoPath: string): void {
    this.selectedPhotoPath = photoPath;
  }

  closeImageModal(): void {
    this.selectedPhotoPath = null;
  }

  loadComments(): void {
    this.isLoading = true;
    this.commentService.getCommentsByProductId(this.productId).subscribe({
      next: (comments) => {
        this.comments = comments
          .map(c => ({
            ...c,
            createdAtDate: new Date(c.createdAt),
            photoPath: c.photoPath ? `/uploads/${c.photoPath}` : null
          }))
          .sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime());
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileError = '';

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Nieprawidłowy typ pliku. Dozwolone: JPEG, PNG, GIF';
        this.clearFileSelection();
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.fileError = 'Plik jest za duży. Maksymalny rozmiar: 5MB';
        this.clearFileSelection();
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearFileSelection(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.fileError = '';
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  addComment(): void {
    if (this.newComment.author.trim() &&
      this.newComment.text.trim() &&
      this.newComment.rating > 0) {

      this.isSubmitting = true;

      const formData = new FormData();
      formData.append('productId', this.productId);
      formData.append('author', this.newComment.author.trim());
      formData.append('text', this.newComment.text.trim());
      formData.append('rating', this.newComment.rating.toString());

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.commentService.addCommentWithImage(formData).subscribe({
        next: (newComment) => {
          this.comments.unshift({
            ...newComment,
            createdAtDate: new Date((newComment as any).createdDate ?? (newComment as any).createdAt)
          });
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Błąd dodawania komentarza:', error);
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
    this.clearFileSelection();
  }

  trackByCommentId(index: number, comment: Comment): any {
    return (comment as any).id || index;
  }

}
