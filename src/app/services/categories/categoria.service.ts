import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Category from 'app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoryList = new Subject<any>();
  categoryList$ = this.categoryList.asObservable();
  
  constructor(private http: HttpClient) { }

  getCategory(type: string) {
    const category_type = { 'tipo': type }
    return this.http.get('http://localhost:80/rest/src/categorias.php', { params: category_type });
  }

  getCategoryById(id: string) {
    const category_id = { 'id': id }
    return this.http.get('http://localhost:80/rest/src/categorias.php', { params: category_id });
  }

  createCategory(category: Category) {
    const postCategory = { nombre: category.name, tipo: category.type }
    return this.http.post('http://localhost:80/rest/src/categorias.php', postCategory);
  }

  updateCategory(category: Category) {
    const putCategory = { id_categoria: category.id, nombre: category.name, tipo: category.type }
    return this.http.put('http://localhost:80/rest/src/categorias.php', putCategory);
  }

  deleteCategory(categoryId: string) {
    const category_id = { 'id': categoryId }
    return this.http.delete('http://localhost:80/rest/src/categorias.php', { params: category_id });
  }

  mapCategory(type: string) {
    this.getCategory(type).subscribe((data: any[]) => {
      this.categoryList.next(data.map(item => {
        const category = new Category();
        category.id = item['ID_CATEGORIA'];
        category.name = item['NOMBRE'];
        category.type = item['TIPO'];
        category['type_name'] = item['TIPO'] == 'I'? 'Ingresos':'Gastos';        
        return category;
      }));
    });
  }
}
