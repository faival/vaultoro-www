import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Youtube from '../Youtube';

Meteor.publish('youtube', function documents() {
  return Youtube.find({ owner: this.userId });
});
