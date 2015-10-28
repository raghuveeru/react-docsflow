var API = {
	BASE_URL: 'http://localhost:3000/',
	BUDGET: {
		ALL: 'api/budget-cuts.json',
		SINGLE: 'api/budget-cuts-single.json',
		EXPORT_TO_EXCEL: 'api/export',
		ADD_TO_SPEECH: 'api/budget-add-to-speech.json'
	},
	ADMIN: {
		USERS: 'api/admin-users.json',
		GROUPS: 'api/admin-groups.json',
	}
}

/**
 * Status Name Mapping
 */

var STATUS_MAPPING = {
	'On sourcing': 'On Sourcing',
	'Working draft': 'Working Draft',
	'Final draft': 'Final draft',
	'Speech': 'Speech'
};

var ROLE_PERMISSION_MAPPING = {
	'System Administrator': ['Admin'],
	'COS Administrator': [],
	'Liaison Officers': [],
	'Registry Officers': [],
	'Head of Department': [],
	'Desk Officer': [],
	'Speech Writer': []
}

window.AppConfig = {
	API                    : API,
	STATUS_MAPPING         : STATUS_MAPPING,
	ROLE_PERMISSION_MAPPING: ROLE_PERMISSION_MAPPING
}

