import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { getLogs } from '../../actions/logActions';

// eslint-disable-next-line no-shadow
const Logs = ({ logs, loading, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="senter">There are no logs...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  getLogs: PropTypes.func.isRequired,
};

Logs.defaultProps = {
  logs: null,
};

const mapStateToProps = (state) => ({
  // log: state.log,
  logs: state.log.logs,
  loading: state.log.loading,
});

export default connect(mapStateToProps, { getLogs })(Logs);
