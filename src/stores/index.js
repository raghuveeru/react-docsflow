import BudgetStore from './BudgetStore';
import UserStore from './UserStore';
import AdminStore from './AdminStore';
import BudgetDetailStore from './BudgetDetailStore';

module.exports = {
	BudgetStore: new BudgetStore(),
	UserStore: new UserStore(),
	AdminStore: new AdminStore(),
	BudgetDetailStore: new BudgetDetailStore(),
}