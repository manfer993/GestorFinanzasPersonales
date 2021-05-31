import { Component, OnInit } from '@angular/core';
import Expense from '../../models/expense.model';
import { CuentaService } from 'app/services/accounts/cuenta.service';
import { CategoriaService } from 'app/services/categories/categoria.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  user: any;
  user_id: string;
  expenseList: Expense[];
  expense: Expense;
  showForm: boolean;
  currentExpenseIndex: number;
  listaCuentas: string[] = [];
  listaCategorias: string[] = [];

  constructor(private accountService: CuentaService, private categoryService: CategoriaService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.user_id = this.user['id_usuario'];
    this.expenseList = new Array<Expense>();
    this.expense = new Expense();
    this.showForm = false;
    this.currentExpenseIndex = -1;
    this.accountService.mapAccount(this.user_id);
    this.getAccounts();
    this.categoryService.mapCategory('G');
    this.getCategories();
  }

  ngOnInit() {
  }

  getAccounts() {
    this.accountService.accountList$.subscribe(data => {
      console.log(data);
      this.listaCuentas = data.map(item => item.name);
    });
  }

  getCategories(){
    this.categoryService.categoryList$.subscribe(data => {
      console.log(data);
      this.listaCategorias = data.map(item => item.name);
    });
  }

  cancel(){    
    this.showForm = false;
  }

  submit() {
    if (this.currentExpenseIndex == -1) {
      this.expenseList.push(this.expense);
    } else {
      this.expenseList[this.currentExpenseIndex] = this.expense;
    }
    this.expense = new Expense();
    this.showForm = false;
  }

  addExpense() {
    this.showForm = true;
    this.currentExpenseIndex = -1;
  }

  editExpense(expense, index) {
    this.expense = expense;
    this.showForm = true;
    this.currentExpenseIndex = index;
  }

  deleteExpense(index) {
    this.expenseList.splice(index, 1);
  }
}