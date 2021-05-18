import { Component, OnInit } from '@angular/core';
import Income from '../../models/income.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  incomeList: Income[];
  income: Income;
  showForm: boolean;
  currentIncomeIndex: number;
  lista: string[] = ["Salario", "Venta", "Prestamo", "Otros"];

  constructor() {
    this.incomeList = new Array<Income>();
    this.income = new Income();
    this.showForm = false;
    this.currentIncomeIndex = -1;
  }

  ngOnInit() {
  }
  
  submit(){
    if(this.currentIncomeIndex == -1){
        this.incomeList.push(this.income);
    }else{
        this.incomeList[this.currentIncomeIndex]=this.income;
    }
    this.income = new Income();
    this.showForm = false;
  }

  addIncome(){
    this.showForm = true;
    this.currentIncomeIndex = -1;
  }

  editIncome(income, index) {
    this.income = income;
    this.showForm = true;
    this.currentIncomeIndex = index;
  }

  deleteIncome(index) {
    this.incomeList.splice(index,1);
  }
}