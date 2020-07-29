/**
* @typedef {Object} Company
* @property {string} [address1]
* @property {string} [address2]
* @property {string} [city]
* @property {string} [company_number]
* @property {string} [postcode]
* @property {string} [region]
* @property {number} [site_id]
* @property {User} [user]
* @property {string} user_name
* @property {string} [years_trading]
*/

/**
* @typedef {Object} Lead
* @property {string} Data
* @property {string} PK
* @property {string} Sk
* @property {string} [first_name]
* @property {string} [full_name]
* @property {string} [last_name]
* @property {string} [phone]
*/

/**
* @typedef {Object} Mutation
* @property {Company} [addCompany]
* @property {Lead} [addLead]
* @property {User} [addProfile]
* @property {Service} [addService]
*/

/**
* @typedef {Object} Query
* @property {Company} [getCompany]
* @property {Array<(Lead|null|undefined)>} [getLeads]
* @property {UserProfile} [getProfile]
* @property {ServiceConnection} [getServices]
* @property {User} [user]
*/

/**
* @typedef {Object} Service
* @property {string} Data
* @property {string} PK
* @property {string} SK
* @property {string} [status]
* @property {string} [user_name]
*/

/**
* @typedef {Object} ServiceConnection
* @property {Array<(Service|null|undefined)>} [items]
* @property {string} [nextToken]
*/

/**
* @typedef {Object} User
* @property {Company} [company]
* @property {string} [first_name]
* @property {string} full_name
* @property {string} [last_name]
* @property {string} [phone]
* @property {string} user_name
*/

/**
* @typedef {Object} UserProfile
* @property {string} [address1]
* @property {string} [address2]
* @property {string} [city]
* @property {string} [company_number]
* @property {Array<(Company|null|undefined)>} [companydetails]
* @property {string} [first_name]
* @property {string} [full_name]
* @property {string} [last_name]
* @property {string} [phone]
* @property {string} [postcode]
* @property {string} [region]
* @property {number} [site_id]
* @property {User} [user]
* @property {string} user_name
* @property {string} [years_trading]
*/