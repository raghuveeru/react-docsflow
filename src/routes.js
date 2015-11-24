import React from 'react';
import {Route, DefaultRoute, Redirect} from 'react-router';
import Main from './components/Main';
import BudgetLayout from './components/budgets/Layout';
import BudgetView from './components/budgets/BudgetView';
import NewBudget from './components/budgets/New';
import Users from './components/admin/Users';
import Topics from './components/admin/Topics';
import Mapping from './components/admin/Mapping';
import AdminLayout from './components/admin/Layout';

module.exports = (
	<Route handler = {Main} path = '/' name="home">
		<DefaultRoute handler={BudgetLayout} />
				
		<Route handler={NewBudget} path = "budgets/new" name="budgetsNew" />
		<Route handler={BudgetLayout} path = "budgets" name="budgets" />		
		<Route handler={BudgetLayout} path = "budgets/:type" name="budgetsInbox" />		
		<Route handler={BudgetView} path = "budgets/view/:id" name="budgetsView" />		
		<Route handler={NewBudget} path = "budgets/edit/:id" name="budgetsEdit" />		

		<Redirect from='/admin' to='users' />
		<Route handler = {AdminLayout} name='admin'>			
			<Route handler = {Users} name="users" />			
			<Route handler = {Topics} name="topics" />
			<Route handler = {Mapping} name="mapping" />						
		</Route>
		
		
		<Redirect from='/' to='budgetsInbox' params = {{type: 'inbox'}} />		 
	</Route>
)