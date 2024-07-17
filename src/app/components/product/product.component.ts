import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Category } from '../../interfaces/Category';
import { Product } from '../../interfaces/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnChanges {
  title = 'Formulário de Cadastro:';

  @Input()
  categories: Category[] = [];

  @Input()
  product: Product = {} as Product;

  @Output()
  saveEmitter = new EventEmitter();

  formGroupProduct: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupProduct = this.formBuilder.group({
      id: { value: null, disabled: true },
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      newProduct: [''],
      promotion: ['']
    })
  }
  ngOnChanges(): void {
    if (this.product.id) {
      this.formGroupProduct.setValue(this.product);
    }
  }

  ngOnInit(): void { }

  save() {
    if (this.formGroupProduct.valid) {
      Object.assign(this.product, this.formGroupProduct.value);
      this.saveEmitter.emit(true);
    }
  }

  cancel() {
    this.saveEmitter.emit();
  }

  selectedCategory(cat1: Category, cat2: Category) {
    return cat1 && cat2 ? cat1.id === cat2.id : false;
  }

  get pfgName() { return this.formGroupProduct.get("name") }
  get pfgDescription() { return this.formGroupProduct.get("description") }
  get pfgPrice() { return this.formGroupProduct.get("price") }
  get pfgCategory() { return this.formGroupProduct.get("category") }
}
