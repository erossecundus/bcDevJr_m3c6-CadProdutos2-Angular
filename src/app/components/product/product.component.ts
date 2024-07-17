import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../interfaces/Category';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  title = 'Formulário de Cadastro:';

  @Input()
  categories : Category[] = [];

  @Input()
  product ?: Product;

  @Output()
  saveEmitter = new EventEmitter();
  
  constructor() {}

  ngOnInit() : void {}

  save() {
    this.saveEmitter.emit(true);
  }

  cancel() {
    this.saveEmitter.emit();
  }

  selectedCategory(cat1: Category, cat2: Category) {
    return cat1 && cat2 ? cat1.id === cat2.id : false;
  }
}
