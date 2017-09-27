import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { CryptoJS } from 'meteor/jparker:crypto-aes';
import App from '../../ui/layouts/App/App';
import Documents from '../../api/Documents/Documents'
import Youtube from '../../api/Youtube/Youtube'

import '../../ui/stylesheets/app.scss';

Meteor.startup(() => {

  Session.set('passphrase', Meteor.settings.public.clientSessionEncriptionKey);

  render(<App />, document.getElementById('react-root'))

});
