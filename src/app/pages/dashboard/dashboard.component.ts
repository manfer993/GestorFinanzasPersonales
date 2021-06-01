import { Component, OnInit } from '@angular/core';
import Account from 'app/models/account.model';
import Expense from 'app/models/expense.model';
import Income from 'app/models/income.model';
import { CuentaService } from 'app/services/accounts/cuenta.service';
import { IngresoService } from 'app/services/incomes/ingreso.service';
import { GastoService } from 'app/services/expenses/gasto.service';

import Chart from 'chart.js';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  colorsOpt = ['text-primary', 'text-warning', 'text-danger', 'text-success', 'text-gray'];
  backgroundColor = ['#007bff', '#ffc107', '#dc3545', '#28a745', '#6c757d'];
  user: any;
  accounts: Account[];
  incomeList: Income[];
  expenseList: Expense[];

  public canvasE: any;
  public ctxE;
  public canvas: any;
  public ctx;
  public canvasI: any;
  public ctxI;
  public chartEmailE;
  public chartEmailI;
  public chartHours;

  incomeTotal = 0;
  expenseTotal = 0;
  total = 0;
  constructor(
    private accountService: CuentaService,
    private incomeService: IngresoService,
    private expenseService: GastoService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.accountService.mapAccount(this.user['id_usuario']);
    this.accounts = new Array<Account>();
  }

  getAccounts() {
    this.accountService.accountList$.subscribe((data: Account[]) => {
      console.log(data);
      this.accounts = data.slice(0, 4);
      this.accounts = this.accounts.map((item, index) => {
        item['color'] = this.colorsOpt[index];
        return item;
      });
    });
  }

  getIncomes() {
    this.incomeList = new Array<Income>();
    for (let account of this.accounts) {
      this.incomeService.mapIncome(account.id);
    }
  }

  getExpenses() {
    this.expenseList = new Array<Expense>();
    for (let account of this.accounts) {
      this.expenseService.mapExpense(account.id);
    }
  }

  async ngOnInit() {
    this.canvasI = document.getElementById("chartIncomes");
    this.ctxI = this.canvasI.getContext("2d");
    this.canvasE = document.getElementById("chartExpenses");
    this.ctxE = this.canvasE.getContext("2d");
    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");
    await this.getAccounts();
    this.incomeService.incomList$.subscribe((data: Income[]) => {
      if (data.length > 0) {
        data = data.map(element => {
          return element;
        });
        this.incomeList = [...this.incomeList, ...data];
        this.chartIncomes();
        this.incomeTotal = this.accounts.map(item => this.incomeList.filter(element => element['fk_cuenta'] == item.id))
          .filter(item => item.length)
          .map(item => item.map(element => element.value).reduce((a, b) => a + b)).reduce((a, b) => a + b)
      }
    });
    this.expenseService.expenseList$.subscribe((data: Expense[]) => {
      if (data.length > 0) {
        data = data.map(element => {
          return element;
        });
        this.expenseList = [...this.expenseList, ...data];
        this.chartExpenses();
        this.expenseTotal = this.accounts.map(item => this.expenseList.filter(element => element['fk_cuenta'] == item.id))
          .filter(item => item.length)
          .map(item => item.map(element => element.value).reduce((a, b) => a + b)).reduce((a, b) => a + b);
      }
    });
    setTimeout(() => {
      this.getIncomes();
      this.getExpenses();
    }, 3000);

    setTimeout(() => {
      this.total = this.incomeTotal - this.expenseTotal;
      this.chartComparison();
    }, 5500);   
  }

  chartExpenses() {
    this.chartEmailE = new Chart(this.ctxE, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Expenses",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: this.backgroundColor,
          borderWidth: 0,
          data: this.accounts.map(item => this.expenseList.filter(element => element['fk_cuenta'] == item.id))
          .filter(item => item.length)
          .map(item => item.map(element => element.value).reduce((a, b) => a + b))
        }]
      },
      options: {
        legend: {
          display: false
        },
        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }
          }],
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
  }

  chartIncomes() {
    this.chartEmailI = new Chart(this.ctxI, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [{
          label: "Incomes",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: this.backgroundColor,
          borderWidth: 0,
          data: this.accounts.map(item => this.incomeList.filter(element => element['fk_cuenta'] == item.id))
            .filter(item => item.length)
            .map(item => item.map(element => element.value).reduce((a, b) => a + b))
        }]
      },

      options: {

        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
  }

  chartComparison(){
    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: this.accounts.map(item => item.name),
        datasets: [{
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.accounts.map(item => this.expenseList.filter(element => element['fk_cuenta'] == item.id))
          .filter(item => item.length)
          .map(item => item.map(element => element.value).reduce((a, b) => a + b))
        },
        {
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.accounts.map(item => this.incomeList.filter(element => element['fk_cuenta'] == item.id))
          .filter(item => item.length)
          .map(item => item.map(element => element.value).reduce((a, b) => a + b))
        }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });
  }
}
