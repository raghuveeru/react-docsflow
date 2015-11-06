import BudgetStore from './BudgetStore';
import AdminStore from './AdminStore';
import BudgetDetailStore from './BudgetDetailStore';

module.exports = {
	BudgetStore: new BudgetStore(),
	AdminStore: new AdminStore(),
	BudgetDetailStore: new BudgetDetailStore(),
}