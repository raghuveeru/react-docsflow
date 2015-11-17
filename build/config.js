var API = {
	BASE_URL: 'http://localhost:3000/',
	BUDGET: {
		ALL: 'api/budget-cuts.json',
		SINGLE: 'api/budget-cuts-single.json',
		EXPORT_TO_EXCEL: 'api/export',
		ADD_TO_SPEECH: 'api/budget-add-to-speech.json',
		GET_QUESTION: 'api/budget-cuts-question-detail.json',				
		EDIT_QUESTION: 'api/budget-cuts-question-detail.json',
		CREATE_NEW_QUESTION: 'api/budget-cuts-new-question-response.json',
		
		GET_WORKING_DRAFT: 'api/budget-cuts-working-draft.json',
		EDIT_WORKING_DRAFT: 'api/budget-cuts-working-draft.json',
		CREATE_NEW_WORKING_DRAFT: 'api/budget-cuts-new-working-draft-response.json',
		
		GET_FINAL_APPROVED_REPLY: 'api/budget-cuts-final-approved-reply.json',
		EDIT_FINAL_APPROVED_REPLY: 'api/budget-cuts-final-approved-reply.json',
		CREATE_NEW_FINAL_APPROVED_REPLY: 'api/budget-cuts-new-final-approved-reply-response.json',
		
		ASSIGN_TO_OFFICER: 'api/budget-cuts-assign-to-officer.json',
		GET_BUDGET_ACTIVITY: 'api/budget-cuts-activity.json',
		CREATE_NEW_BUDGET_CUT: 'api/new-budget-cut-response.json',

		DELETE_BUDGET_CUT: 'api/delete-budget-cut-response.json',
		UPDATE_BUDGET_CUT: 'api/budget-cuts-single.json',
		DELETE_ATTACHMENT: 'api/delete-attachment.json'
	},
	TOPICS: {
		GET_MAIN_TOPICS: 'api/get-main-topics.json',
		GET_BUDGET_CUT_TOPICS: 'api/get-budget-cut-topics.json',
		CREATE_MAIN_TOPIC: 'api/new-topic-response.json',
		EDIT_MAIN_TOPIC: 'api/edit-topic-response.json',
		DELETE_MAIN_TOPIC: 'api/delete-topic-response.json',
		CREATE_BUDGET_CUT_TOPIC: 'api/new-budget-cut-topic-response.json',
		EDIT_BUDGET_CUT_TOPIC: 'api/edit-budget-cut-topic-response.json',
		DELETE_BUDGET_CUT_TOPIC: 'api/delete-budget-cut-topic-response.json',

		UPDATE_ORDER_MAIN_TOPICS: 'api/update-order-main-topics.json',
		UPDATE_ORDER_SUB_TOPICS: 'api/update-order-sub-topics.json',
	},
	USERS: {
		GET_ALL_USERS: 'api/get-all-users.json',
		GET_ALL_USERS_ADMIN: 'api/get-all-users.json',
		GET_RESPONSIBLE_OFFICERS: 'api/get-responsible-officers.json',
		GET_OFFICERS_TO_NOTIFY: 'api/get-officers-to-notify.json',
		GET_HOD_DRAFTING_USER: 'api/get-hod-drafting-user.json',
		GET_HOD_SOURCING_USER: 'api/get-hod-sourcing-user.json',
		GET_MPS: 'api/get-mps.json',
		GET_ALL_LIASON_OFFICERS: 'api/get-all-liason-officers.json',
		GET_USER_BY_ID: 'api/get-user-by-id.json',


		CREATE_NEW_USER: 'api/create-new-user.json',
		CREATE_NEW_MP: 'api/create-new-mp.json',
		CREATE_NEW_HOD: 'api/create-new-hod.json',
		CREATE_NEW_LIASON_OFFICER: 'api/create-new-liason-officer.json',

		DELETE_USER: 'api/delete-user.json',
		GET_USER_ROLE: 'api/get-user-role.json'
	},
	NOTIFICATIONS: {
		ALL: 'api/notifications.json'
	}
};

/**
 * Status Name Mapping
 */

var STATUS_MAPPING = [
	{
		name: 'On sourcing',
		color: '#F36C60'
	},
	{
		name: 'Working draft',
		color: '#FFAE6E'
	},
	{
		name: 'Final draft',
		color: '#0699F9'
	},
	{
		name: 'Speech',
		color: '#D687C6'
	}
];

var ALL_NOTIFICATIONS_LINK = 'http://href.xom';

var ROLE_PERMISSION_MAPPING = {
	'System Administrator': ['Admin'],
	'COS Administrator': ['canViewSpeech', 'canEditDeleteBudgetCut'],
	// 'Liaison Officers': [],
	'Registry Officers': ['canCreateBudgetCut'],
	// 'Head of Department': [],
	'Desk Officer': [],
	'Speech Writer': ['canViewSpeech']
};

var ROLES = [
	{
		name: 'System Administrator',
		id: 1,
		showInCreateUser: true,
		permissions: ['Admin']
	},
	{
		name: 'COS Administrator',
		id: 2,		
		permissions: ['canViewSpeech', 'canEditDeleteBudgetCut', 'canSeeAdminMenu', 'canAssignToOfficer']
	},
	{
		name: 'Liaison Officers',
		id: 3,
		showInCreateUser: false,
		permissions: ['canEditQuestionDetails', 'canEditWorkingDraft', 'canAssignToOfficer']
	},
	{
		name: 'Registry Officers',
		id: 4,
		showInCreateUser: true,
		permissions: ['canCreateBudgetCut', 'canAssignToOfficer']
	},
	{
		name: 'Head of Department',
		id: 5,
		showInCreateUser: false,
		permissions: ['canEditQuestionDetails', 'canEditWorkingDraft', 'canAssignToOfficer']
	},
	{
		name: 'Desk Officer',
		id: 6,
		showInCreateUser: true,
		permissions: ['canEditWorkingDraft', 'canEditFinalDraft', 'canAssignToOfficer']
	},
	{
		name: 'Speech Writer',
		id: 7,
		showInCreateUser: true,
		permissions: ['canViewSpeech']
	},
];

var APPROVED_REPLY_TYPES = ["Approved draft", "Anticipated Q&A", "Supplementary Info (upto confidential only)"];

window.AppConfig = {
	API                    : API,
	STATUS_MAPPING         : STATUS_MAPPING,	
	APPROVED_REPLY_TYPES: APPROVED_REPLY_TYPES,
	ROLES: ROLES,
	SUBJECT_TEMPLATE: '[MOM COS - {status}] - {topic} - {mp}',
	ALL_NOTIFICATIONS_LINK: ALL_NOTIFICATIONS_LINK
}

