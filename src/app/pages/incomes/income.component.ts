import { Component, OnInit } from '@angular/core';
import Income from '../../models/income.model';
import { CuentaService } from 'app/service/cuenta.service';

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
  lista: string[] = [];

  constructor(private accountService: CuentaService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.user_id = this.user['id_usuario'];
    this.incomeList = new Array<Income>();
    this.income = new Income();
    this.showForm = false;
    this.currentIncomeIndex = -1;
    this.getAccounts();
  }

  ngOnInit() {
  }

  getAccounts() {
    this.accountService.getAccount(this.user_id).subscribe(data => {
      console.log(data);
      for (var myData of Object.values(data)) {
        this.lista.push(myData['NOMBRE']);
      }
    });
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