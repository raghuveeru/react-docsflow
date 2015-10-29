import BudgetStore from './BudgetStore';
import UserStore from './UserStore';
import GroupStore from './GroupStore';
import BudgetDetailStore from './BudgetDetailStore';

module.exports = {
	BudgetStore: new BudgetStore(),
	UserStore: new UserStore(),
	GroupStore: new GroupStore(),
	BudgetDetailStore: new BudgetDetailStore(),
}