import BudgetStore from './BudgetStore';
import UserStore from './UserStore';
import GroupStore from './GroupStore';

module.exports = {
	BudgetStore: new BudgetStore(),
	UserStore: new UserStore(),
	GroupStore: new GroupStore(),
}