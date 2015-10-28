module.exports = {
	actions: {
		UPDATE_BUDGETS: 'UPDATE_BUDGETS',
		UPDATE_USERS: 'UPDATE_USERS',
		UPDATE_GROUPS: 'UPDATE_GROUPS',
		SELECT_ALL_BUDGETS: 'SELECT_ALL_BUDGETS',
		SELECT_BUDGET: 'SELECT_BUDGET',
		GET_BUDGET_BY_ID: 'GET_BUDGET_BY_ID',
		ADD_TO_SPEECH: 'ADD_TO_SPEECH'
	},
	customStyles: {
		overlay : {
			position          : 'fixed',
			top               : 0,
			left              : 0,
			right             : 0,
			bottom            : 0,
			backgroundColor   : 'rgba(0,0,0, 0.75)'
		},
		content : {
			top                   : '50%',
			left                  : '50%',
			right                 : 'auto',
			bottom                : 'auto',
			marginRight           : '-50%',
			transform             : 'translate(-50%, -50%)',
			padding: 0,
		}
	}
}