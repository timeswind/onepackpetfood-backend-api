var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true},
  school: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: false },
  cover: { type: String, required: false },
  content: { type: String, required: true },
  views: { type: Number },
  tags: { type: [String] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

ArticleSchema.index({
  school: 1,
  user: 1
});

module.exports = mongoose.model('Article', ArticleSchema);
