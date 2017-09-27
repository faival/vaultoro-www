import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Glyphicon } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import YoutubeCollection from '../../../api/Youtube/Youtube';
import Loading from '../../components/Loading/Loading';

import YouTube from 'react-youtube';

import './Youtube.scss';

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const ytOpts = {
  width: '300',
}

const getVideoIdFromUrl = (url) => {
  return url.split(`v=`)[1]
}

const getDecryptedTitle = (titleEncrypted) => {

  const titleDecrypted = CryptoJS.AES.decrypt(titleEncrypted, Session.get('passphrase'));

  if (titleEncrypted.indexOf('http') > -1) {
    return titleEncrypted;
  }
  console.log(titleDecrypted.toString(CryptoJS.enc.Utf8))
  
  return titleDecrypted.toString(CryptoJS.enc.Utf8);
}

const Youtube = ({ loading, youtubes, match, history }) => (!loading ? (
  <div className="Youtube">
    <div className="page-header clearfix">
      <h4 className="pull-left">Youtube</h4>
      <Link className="btn btn-success pull-right" to={`youtube/new`}>Add Youtube</Link>
    </div>
    {youtubes.length ? <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Last Updated</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {youtubes.map(({ _id, title, rating, createdAt, updatedAt }) => (
          <tr key={_id}>
            <td>
              <YouTube
                videoId={getVideoIdFromUrl(getDecryptedTitle(title))}
                opts={ytOpts}
              />
            </td>
            <td>{[...Array(rating)].map((rating, index) => (<Glyphicon key={index} glyph="star"/>))}</td>
            <td>{timeago(updatedAt)}</td>
            <td>{monthDayYearAtTime(createdAt)}</td>
            <td>
              <Button
                bsStyle="primary"
                onClick={() => history.push(`youtube/${_id}`)}
                block
              >View</Button>
            </td>
            <td>
              <Button
                bsStyle="danger"
                onClick={() => handleRemove(_id)}
                block
              >Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No youtube videos yet!</Alert>}
  </div>
) : <Loading />);

Youtube.propTypes = {
  loading: PropTypes.bool.isRequired,
  youtubes: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('youtube');
  return {
    loading: !subscription.ready(),
    youtubes: YoutubeCollection.find().fetch().sort((yt, nextYt) => { return (!yt.rating || yt.rating < nextYt.rating )}),
  };
}, Youtube);
