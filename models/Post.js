const { model, Schema } = require('mongoose');
const postSchema = new Schema(
	{
		company_name: {
			type: String,
			required: true,
		},
		company_desc: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		company_state: {
			type: String,
			required: true,
		},
		company_city: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = model('post', postSchema);
