var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DatapointSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	val: {
		type: Number,
		default: '',
		trim: true,
		required: "value can't be blank"
	},
	coords: {
		type: [Number],
		index: '2d'
	},
	comment: {
		type: String,
		default: '',
		trim: true
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Datapoint', DatapointSchema);
