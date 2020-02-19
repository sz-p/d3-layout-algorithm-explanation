import React from 'react';
import styles from "./index.scss";
import { Link } from 'react-router-dom';

function IndexPage() {
  return (
    <div className={styles.page}>
      <Link to={'/treemap'}>treemap</Link>
      <br></br>
      <Link to={'/pie'}>pie</Link>
    </div>
  );
}
export default IndexPage;
