import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  selectedDeliveryMethod: 'paczkomat' | 'kurier' = 'paczkomat';
  showDetails = false;

  selectDeliveryMethod(method: 'paczkomat' | 'kurier'): void {
    this.selectedDeliveryMethod = method;
    this.showDetails = true;
  }

  proceedToOrder(): void {
  }
}
