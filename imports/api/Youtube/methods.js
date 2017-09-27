import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Youtube from './Youtube';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'youtube.insert': function documentsInsert(doc) {
    console.log(doc)
    check(doc, {
      title: String,
      body: String,
      rating: Number,
    });

    try {
      return Youtube.insert({ owner: this.userId, ...doc });
    } catch (exception) {

      console.log(exception)
      throw new Meteor.Error('500', exception);
    }
  },
  'youtube.update': function documentsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
      rating: Number,
    });

    try {
      const documentId = doc._id;
      Youtube.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'youtube.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      return Documents.remove(documentId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});

rateLimit({
  methods: [
    'youtube.insert',
    'youtube.update',
    'youtube.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
