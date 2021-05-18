import { Component, OnInit } from '@angular/core';
import Expense from '../../models/expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  expenseList: Expense[];
  expense: Expense;
  showForm: boolean;
  currentExpenseIndex: number;
  lista: string[] = ["Comida", "Ropa", "Arriendo", "Otros"];

  constructor() {
    this.expenseList = new Array<Expense>();
    this.expense = new Expense();
    this.showForm = false;
    this.currentExpenseIndex = -1;
  }

  ngOnInit() {
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