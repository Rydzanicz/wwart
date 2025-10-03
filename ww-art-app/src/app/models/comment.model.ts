export interface Comment {
  id: number;
  productId: number;
  author: string;
  text: string;
  rating?: number;
  createdAt: string;
  photoPath?: string | null;
}
