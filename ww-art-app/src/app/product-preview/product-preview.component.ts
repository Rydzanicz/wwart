import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: any;
  @Input() availableShapes: { id: string, name: string, image: string }[] = [];
  @Output() selectedShapeChange = new EventEmitter<string>();
  @Output() frontTextChange = new EventEmitter<string>();
  @Output() backTextChange = new EventEmitter<string>();

  frontText: string = '';
  backText: string = '';

  showFront: boolean = true;
  selectedShape: string = 'bone';
  maxFrontChars: number = 10;
  maxBackChars: number = 20;

  ngOnInit() {
    if (this.product) {
      this.frontText = 'Milka';
      this.backText = '123 456 780';
    }
    if (this.availableShapes.length > 0) {
      this.selectedShape = this.availableShapes[0].id;
      this.selectedShapeChange.emit(this.selectedShape);
    }
  }

  setSelectedShape(shapeId: string): void {
    this.selectedShape = shapeId;
    this.selectedShapeChange.emit(shapeId);
  }

  onFrontTextChange(): void {
    this.frontTextChange.emit(this.frontText);
  }

  onBackTextChange(): void {
    this.backTextChange.emit(this.backText);
  }

  get isFrontTextValid(): boolean {
    return this.frontText.length <= this.maxFrontChars;
  }

  get isBackTextValid(): boolean {
    return this.backText.length <= this.maxBackChars;
  }

  get displayFrontText(): string {
    return this.frontText.substring(0, this.maxFrontChars);
  }

  get displayBackText(): string {
    return this.backText.substring(0, this.maxBackChars);
  }

  get currentTagImage(): string {
    const shape = this.availableShapes.find(s => s.id === this.selectedShape);
    return shape ? shape.image : (this.availableShapes.length ? this.availableShapes[0].image : '');
  }

  get currentShapeName(): string {
    const shape = this.availableShapes.find(s => s.id === this.selectedShape);
    return shape ? shape.name : (this.availableShapes.length ? this.availableShapes[0].name : '');
  }
}
