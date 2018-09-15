import React, { Component } from 'react';

import styles from './Spinner.scss';

class Spinner extends Component {
  render() {
    return (
      <div className={styles.container}>
        <i className="fa fa-spinner fa-spin" />
      </div>
    );
  }
}

export default Spinner;
