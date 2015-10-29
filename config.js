var API = {
	BASE_URL: 'http://localhost:3000/',
	BUDGET: {
		ALL: 'api/budget-cuts.json',
		SINGLE: 'api/budget-cuts-single.json',
		EXPORT_TO_EXCEL: 'api/export',
		ADD_TO_SPEECH: 'api/budget-add-to-speech.json',
		GET_QUESTION: 'api/budget-cuts-question-detail.json',		
		SAVE_EDIT_QUESTION: 'api/budget-cuts-question-detail.json',
		CREATE_NEW_QUESTION: 'api/budget-cuts-question-detail.json',
		GET_WORKING_DRAFT: 'api/budget-cuts-working-draft.json',
		GET_FINAL_APPROVED_REPLY: 'api/budget-cuts-final-approved-reply.json',
		ASSIGN_TO_OFFICER: 'api/budget-cuts-assign-to-officer.json',
		GET_BUDGET_ACTIVITY: 'api/budget-cuts-activity.json'
	},
	USERS: {
		GET_ALL_USERS: 'api/get-all-users.json',
		GET_RESPONSIBLE_OFFICERS: 'api/get-responsible-officers.json',
		GET_OFFICERS_TO_NOTIFY: 'api/get-officers-to-notify.json',
		GET_HOD_DRAFTING_USER: 'api/get-hod-drafting-user.json',
		GET_ALL_LIASON_OFFICERS: 'api/get-all-liason-officers.json',
		GET_USER_BY_ID: 'api/get-user-by-id.json',
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

var APPROVED_REPLY_TYPES = ["Approved draft", "Anticipated Q&A", "Supplementary Info (upto confidential only)"];

window.AppConfig = {
	API                    : API,
	STATUS_MAPPING         : STATUS_MAPPING,
	ROLE_PERMISSION_MAPPING: ROLE_PERMISSION_MAPPING,
	APPROVED_REPLY_TYPES: APPROVED_REPLY_TYPES
}

