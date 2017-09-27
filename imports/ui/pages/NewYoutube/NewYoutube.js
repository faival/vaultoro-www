import React from 'react';
import PropTypes from 'prop-types';
import DocumentEditor from '../../components/YoutubeEditor/YoutubeEditor';

const NewYoutube = ({ history }) => (
  <div className="NewYoutube">
    <h4 className="page-header">New Youtube</h4>
    <DocumentEditor history={history} />
  </div>
);

NewYoutube.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewYoutube;
