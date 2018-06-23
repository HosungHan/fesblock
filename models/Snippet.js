const mongoose = require('mongoose');
const { Schema } = mongoose;

const snippetSchema = new Schema({
	subject: String,
	title: String,
	body: String,
	datePosted: Date,
	_creator: { type: Schema.Types.ObjectId, ref: 'User' },
	isChallenged: { type: Boolean, default: false },
	reasonChallenged: String,
	lastChallenged: Date,
	_challenger: { type: Schema.Types.ObjectId, ref: 'User' },
	yes: { type: Number, default: 0 },
	yesVoters: { type: [Schema.Types.ObjectId], ref: 'User' },
	no: { type: Number, default: 0 },
	noVoters: { type: [Schema.Types.ObjectId], ref: 'User' },
	trash: { type: Boolean, default: false }
});

mongoose.model('snippets', snippetSchema);
