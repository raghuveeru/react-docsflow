import React from 'react';
import {Route, DefaultRoute, Redirect} from 'react-router';
import Main from './components/Main';
import BudgetLayout from './components/budgets/Layout';
import BudgetView from './components/budgets/BudgetView';
import NewBudget from './components/budgets/New';
import Users from './components/admin/Users';
import Groups from './components/admin/Groups';
import AdminLayout from './components/admin/Layout';

module.exports = (
	<Route handler = {Main} path = '/'>
		<DefaultRoute handler={BudgetLayout} />
				
		<Route handler={NewBudget} path = "budgets/new" name="budgetsNew" />
		<Route handler={BudgetLayout} path = "budgets" name="budgets" />		
		<Route handler={BudgetLayout} path = "budgetsInbox" name="budgetsInbox" />		
		<Route handler={BudgetView} path = "budgets/view/:id" name="budgetsView" />		

		<Route handler = {AdminLayout} name='admin'>			
			<Route handler = {Users} name="users" />
			<Route handler = {Groups} name="groups" />
			<Route handler = {Users} name="topics" />						
		</Route>
		
		
	</Route>
)