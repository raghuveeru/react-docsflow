import BudgetStore from './BudgetStore';
import AdminStore from './AdminStore';
import BudgetDetailStore from './BudgetDetailStore';
import NotificationStore from './NotificationStore';

module.exports = {
	BudgetStore: new BudgetStore(),
	AdminStore: new AdminStore(),
	BudgetDetailStore: new BudgetDetailStore(),
	NotificationStore: new NotificationStore(),	
}