import Account from "./account.model";
import Category from "./category.model";

export default class Expense {
    id: string;
    name: string;
    account: Account;
    category: Category;
    date: Date;
    value: number;

    constructor(){
        this.account = new Account();
        this.category = new Category();
    }
}
