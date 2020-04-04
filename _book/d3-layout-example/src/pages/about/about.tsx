import React, { useState } from 'react';
import styles from "./about.scss";
import { Link } from 'react-router-dom';

function AboutPage(props) {
  // const [count, setCount] = useState(0);
  return (
    <div className={styles.page} style={props.style}>
      <p>about</p>
      <Link to={'/'}>返回</Link>
    </div>
  );
}
export default AboutPage;
