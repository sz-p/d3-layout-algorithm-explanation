import React from 'react';
import styles from "./index.scss";
import { Link } from 'react-router-dom';

function IndexPage() {
  return (
    <div className={styles.page}>
      <Link to={'/treemap'}>treemap</Link>
      <br></br>
      <Link to={'/pack'}>pack</Link>
      <br></br>
      <Link to={'/pie'}>pie</Link>
      <br></br>
      <Link to={'/cluster'}>cluster</Link>
      <br></br>
      <Link to={'/tree'}>tree</Link>
      <br></br>
      <Link to={'/histogram'}>histogram</Link>
      <br></br>
      <Link to={'/force'}>force</Link>
      <br></br>
      <Link to={'/map'}>map</Link>
    </div>
  );
}
export default IndexPage;
