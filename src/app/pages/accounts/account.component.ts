import { Component, OnInit } from '@angular/core';
import Account from '../../models/account.model';

@Component({
    selector: 'account-cmp',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    accountList: Account[];
    account: Account;
    showForm: boolean;
    currentAccountIndex: number;

    constructor() {
        this.accountList = new Array<Account>();
        this.account = new Account();
        this.showForm = false;
        this.currentAccountIndex = -1;
    }

    ngOnInit() {
    }

    submit() {
        if(this.currentAccountIndex == -1){
            this.accountList.push(this.account);
        }else{
            this.accountList[this.currentAccountIndex]=this.account;
        }        
        this.account = new Account();
        this.showForm = false;
    }

    addAccount(){
        this.showForm = true;
        this.currentAccountIndex = -1;
    }

    editAccount(account, index) {
        this.account = account;
        this.showForm = true;
        this.currentAccountIndex = index;
    }

    deleteAccount(index) {
        this.accountList.splice(index, 1);
    }
}
