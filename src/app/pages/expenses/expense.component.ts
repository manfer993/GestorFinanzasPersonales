import { Component, OnInit } from '@angular/core';
import Account from 'app/models/account.model';
import Category from 'app/models/category.model';
import Expense from '../../models/expense.model';
import { CuentaService } from 'app/services/accounts/cuenta.service';
import { CategoriaService } from 'app/services/categories/categoria.service';
import { GastoService } from 'app/services/expenses/gasto.service';

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
  cuentasG: Account[] = [];
  categoriasG: Category[] = [];

  constructor(
    private accountService: CuentaService, 
    private categoryService: CategoriaService,
    private expenseService: GastoService
    ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.user_id = this.user['id_usuario'];
    this.accountService.mapAccount(this.user_id);
    this.categoryService.mapCategory('G');
    this.expenseList = new Array<Expense>();
    this.expense = new Expense();
    this.showForm = false;
    this.currentExpenseIndex = -1;
  }

  async ngOnInit() {
    await this.getAccounts();
    await this.getCategories();
    setTimeout(() => {
      this.getExpense();
    },3000);
    this.expenseService.expenseList$.subscribe((data:Expense[]) => {
      if(data.length > 0 ){
        data = data.map(element => {
          element.category = this.categoriasG.find(item => item.id == element['fk_categoria']);
          element.account = this.cuentasG.find(item => item.id == element['fk_cuenta']);
          return element;
        });          
        this.expenseList = [...this.expenseList, ...data];
      }
    });
  }

  getAccounts() {
    this.accountService.accountList$.subscribe(data => {
      console.log(data);
      this.cuentasG = data;
    });
  }

  getCategories(){    
    this.categoryService.categoryList$.subscribe(data => {
      console.log(data);
      this.categoriasG = data;
    });
  }

  cancel(){    
    this.showForm = false;
  }

  submit() {
    if (this.currentExpenseIndex == -1) {
      this.createExpense();
    } else {
      this.updateExpense(this.currentExpenseIndex);
    }
    this.getExpense();
    this.showForm = false;
  }

  addExpenseForm() {
    this.showForm = true;
    this.currentExpenseIndex = -1;
  }

  editExpenseForm(expense, index) {
    this.expense = expense;
    this.showForm = true;
    this.currentExpenseIndex = index;
  }

  deleteExpense(index) {
    this.expenseService.deleteExpense(this.expenseList[index].id).subscribe(data => {
      console.log(data);
    });
    this.getExpense();
  }

  createExpense() {
    this.expenseService.createExpense(this.expense).subscribe(data => {
      console.log(data);
    });
  }

  updateExpense(index) {
    this.expenseService.updateExpense(this.expenseList[index]).subscribe(data => {
      console.log(data);
    });
  }

  getExpense() {
    console.log('cuentas');
    console.log(this.cuentasG);
    this.expenseList = new Array<Expense>();
    for (let cuenta of this.cuentasG) {
      this.expenseService.mapExpense(cuenta.id);
    }       
  }
}