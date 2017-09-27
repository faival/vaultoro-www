/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class YoutubeEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        rating: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        rating: {
          required: 'Need a rating in here, Seuss.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'youtube.update' : 'youtube.insert';
    const doc = {
      title: this.title.value.trim(),
      body: 'any',
      rating: parseInt(this.rating.value.trim(), 10)
    };

    const encryptedTitle = CryptoJS.AES.encrypt(doc.title, Session.get('passphrase')).toString();
    delete doc.title 
    doc.title = encryptedTitle

    if (existingDocument) doc._id = existingDocument;

    Meteor.call(methodToCall, doc, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDocument ? 'Youtube updated!' : 'Youtube added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/youtube/${documentId}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Youtube Url</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={doc && doc.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Youtube Rating</ControlLabel>
        <select
          className="form-control"
          name="title"
          ref={rating => (this.rating = rating)}
          defaultValue={doc && doc.rating}
          placeholder="Rating"
        >
        {
          [0, 1, 2, 3, 4].map(rating=> (<option value={rating}>{rating + 1}</option>))
        }
        </select>
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {doc && doc._id ? 'Save Changes' : 'Add Youtube'}
      </Button>
    </form>);
  }
}

YoutubeEditor.defaultProps = {
  doc: { title: '' },
};

YoutubeEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default YoutubeEditor;
