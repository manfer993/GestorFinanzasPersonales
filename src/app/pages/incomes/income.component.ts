import { Component, OnInit } from '@angular/core';
import Income from '../../models/income.model';
import { CuentaService } from 'app/services/accounts/cuenta.service';
import { CategoriaService } from 'app/services/categories/categoria.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  user: any;
  user_id: string;
  incomeList: Income[];
  income: Income;
  showForm: boolean;
  currentIncomeIndex: number;
  listaCuentas: string[] = [];
  listaCategorias: string[] = [];

  constructor(private accountService: CuentaService, private categoryService: CategoriaService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.user_id = this.user['id_usuario'];
    this.incomeList = new Array<Income>();
    this.income = new Income();
    this.showForm = false;
    this.currentIncomeIndex = -1;
    this.accountService.mapAccount(this.user_id);
    this.getAccounts();
    this.categoryService.mapCategory('I');
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
    if (this.currentIncomeIndex == -1) {
      this.incomeList.push(this.income);
    } else {
      this.incomeList[this.currentIncomeIndex] = this.income;
    }
    this.income = new Income();
    this.showForm = false;
  }

  addIncome() {
    this.showForm = true;
    this.currentIncomeIndex = -1;
  }

  editIncome(income, index) {
    this.income = income;
    this.showForm = true;
    this.currentIncomeIndex = index;
  }

  deleteIncome(index) {
    this.incomeList.splice(index, 1);
  }
}