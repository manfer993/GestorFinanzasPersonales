import { Component, OnInit } from '@angular/core';
import Account from 'app/models/account.model';
import Category from 'app/models/category.model';
import Income from 'app/models/income.model';
import { CuentaService } from 'app/services/accounts/cuenta.service';
import { CategoriaService } from 'app/services/categories/categoria.service';
import { IngresoService } from 'app/services/incomes/ingreso.service';

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
  cuentas: Account[] = [];
  categorias: Category[] = [];

  constructor(
    private accountService: CuentaService,
    private categoryService: CategoriaService,
    private incomeService: IngresoService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.user_id = this.user['id_usuario'];
    this.accountService.mapAccount(this.user_id);
    this.categoryService.mapCategory('I');
    this.incomeList = new Array<Income>();
    this.income = new Income();
    this.showForm = false;
    this.currentIncomeIndex = -1;
  }

  async ngOnInit() {
    await this.getAccounts();
    await this.getCategories();
    setTimeout(() => {
      this.getIncome();
    },3000);
    this.incomeService.incomList$.subscribe((data:Income[]) => {
      if(data.length > 0 ){
        data = data.map(element => {
          element.category = this.categorias.find(item => item.id == element['fk_categoria']);
          element.account = this.cuentas.find(item => item.id == element['fk_cuenta']);
          return element;
        });          
        this.incomeList = [...this.incomeList, ...data];
      }
    });
  }

  getAccounts() {
    this.accountService.accountList$.subscribe(data => {
      console.log(data);
      this.cuentas = data;
    });
  }

  getCategories() {
    this.categoryService.categoryList$.subscribe(data => {
      console.log(data);
      this.categorias = data;
    });
  }

  cancel() {
    this.showForm = false;
  }

  submit() {
    if (this.currentIncomeIndex == -1) {
      this.createIncome();
    } else {
      this.updateIncome(this.currentIncomeIndex);
    }
    this.getIncome();
    this.showForm = false;
  }

  addIncomeForm() {
    this.showForm = true;
    this.currentIncomeIndex = -1;
  }

  editIncomeForm(income, index) {
    this.income = income;
    this.showForm = true;
    this.currentIncomeIndex = index;
  }

  deleteIncome(index) {
    this.incomeService.deleteIncome(this.incomeList[index].id).subscribe(data => {
      console.log(data);
    });
    this.getIncome();
  }

  createIncome() {
    this.incomeService.createIncome(this.income).subscribe(data => {
      console.log(data);
    });
  }

  updateIncome(index) {
    this.incomeService.updateIncome(this.incomeList[index]).subscribe(data => {
      console.log(data);
    });
  }

  getIncome() {
    console.log('cuentas');
    console.log(this.cuentas);
    this.incomeList = new Array<Income>();
    for (let cuenta of this.cuentas) {
      this.incomeService.mapIncome(cuenta.id);
    }       
  }
}