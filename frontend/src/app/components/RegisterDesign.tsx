import React from 'react';
import styles from '../styles/design.module.scss';
// const image =
//   'https://images.unsplash.com/photo-1462556791646-c201b8241a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80';
const image =
  'https://images.pexels.com/photos/8616015/pexels-photo-8616015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const componentStyles = {
  backgroundImage: `url(${image})`,
};

const RegisterDesign = () => {
  return (
    <div className={styles.design_panel} style={componentStyles}>
      <div className={styles.design_panel_inner}>
        <h2 className="heading-text">
          Never lose track of your job applications again.
        </h2>
        <p>JobFile makes it easy to stay organized and land that dream job.</p>
      </div>
    </div>
  );
};

export default RegisterDesign;
