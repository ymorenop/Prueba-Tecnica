import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  form!: FormGroup;
  products: any[] = [];
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      value: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

    this.load(); // cargar productos al iniciar
  }

  // Cargar productos
  load(): void {
    this.service.getAll().subscribe((data: any[]) => {
      this.products = [...data];
    });
  }

  // Guardar o actualizar producto
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const payload = {
      name: this.form.value.name,
      value: parseFloat(this.form.value.value)
    };

    const action = this.editingId
      ? this.service.update(this.editingId, payload)
      : this.service.create(payload);

    action.subscribe(() => {
      this.load();        // recargar lista completa inmediatamente
      this.reset(false);  // limpiar formulario sin recargar otra vez
    });
  }

  // Editar producto
  edit(p: any): void {
    this.editingId = p.id;
    this.form.patchValue({
      name: p.name,
      value: p.value
    });
  }

  // Eliminar producto
  delete(id: number): void {
    if (!confirm('¿Desea eliminar este producto?')) return;
    this.service.delete(id).subscribe(() => {
      this.load(); // recargar lista completa inmediatamente
    });
  }

  // Limpiar formulario
  reset(recargar: boolean = true): void {
    this.form.reset();
    this.editingId = null;
    if (recargar) this.load();
  }

  // Formatear valor
  format(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
