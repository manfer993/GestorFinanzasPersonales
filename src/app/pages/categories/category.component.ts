import { Component, OnInit } from '@angular/core';
import Category from 'app/models/category.model';
import { CategoriaService } from 'app/services/categories/categoria.service';

@Component({
    selector: 'category-cmp',
    moduleId: module.id,
    templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
    categoryList: Category[];
    category: Category;
    types = [
        { id: "I", name: "Ingresos" },
        { id: "G", name: "Gastos" }
    ];
    showForm: boolean;
    currentCategoryIndex: number;

    constructor(private categoryService: CategoriaService) {
        this.categoryList = new Array<Category>();
        this.category = new Category();
        this.showForm = false;
        this.currentCategoryIndex = -1;
        this.getCategory();
    }

    ngOnInit() {
        this.categoryService.categoryList$.subscribe(data => {
            console.log(data);
            this.categoryList = [...this.categoryList, ...data];
        });
    }

    cancel() {
        this.showForm = false;
    }

    submit() {
        if (this.currentCategoryIndex == -1) {
            this.createCategory();
        } else {
            this.updateCategory(this.currentCategoryIndex);
        }
        setTimeout(() => {
            this.getCategory();
        }, 5);
        this.showForm = false;
    }

    addCategoryForm() {
        this.showForm = true;
        this.currentCategoryIndex = -1;
    }

    editCategoryForm(category, index) {
        this.category = category;
        this.showForm = true;
        this.currentCategoryIndex = index;
    }

    deleteCategory(index) {
        this.categoryService.deleteCategory(this.categoryList[index].id).subscribe(data => {
            console.log(data);
        });
        this.getCategory();
    }

    createCategory() {
        this.categoryService.createCategory(this.category).subscribe(data => {
            console.log(data);
        });
    }

    updateCategory(index) {
        this.categoryService.updateCategory(this.categoryList[index]).subscribe(data => {
            console.log(data);
        });
    }

    getCategory() {
        this.categoryList = new Array<Category>();
        this.categoryService.mapCategory('I');
        this.categoryService.mapCategory('G');
    }
}
