import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'app/services/accounts/cuenta.service';
import Account from '../../models/account.model';

@Component({
    selector: 'account-cmp',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    accountList: Account[];
    account: Account;
    user: any;
    showForm: boolean;
    currentAccountIndex: number;

    constructor(private accountService: CuentaService) {
        this.accountList = new Array<Account>();
        this.account = new Account();
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.account.user_id = this.user['id_usuario'];
        this.showForm = false;
        this.currentAccountIndex = -1;
        this.accountService.mapAccount(this.account.user_id);
        this.getAccount();
    }

    ngOnInit() {
    }
    
    cancel() {
        this.showForm = false;
    }

    async submit() {
        if (this.currentAccountIndex == -1) {
            this.createAccount();
            //this.accountList.push(this.account);
        } else {
            this.updateAccount(this.currentAccountIndex);
            //this.accountList[this.currentAccountIndex] = this.account;
        }
        await new Promise(r => setTimeout(r, 500));
        this.getAccount();
        //this.account = new Account();
        this.showForm = false;
    }

    addAccountForm() {
        this.showForm = true;
        this.currentAccountIndex = -1;
    }

    editAccountForm(account, index) {
        this.account = account;
        this.showForm = true;
        this.currentAccountIndex = index;
    }

    deleteAccount(index) {
        this.accountService.deleteAccount(this.accountList[index].id).subscribe(data => {
            console.log(data);
        });
        this.getAccount();
    }

    createAccount() {
        this.accountService.createAccount(this.account).subscribe(data => {
            console.log(data);
        });
    }

    updateAccount(index) {
        this.accountService.updateAccount(this.accountList[index]).subscribe(data => {
            console.log(data);
        });
    }

    getAccount() {
        this.accountService.accountList$.subscribe(data => {
            this.accountList = data;
        });
    }
}
