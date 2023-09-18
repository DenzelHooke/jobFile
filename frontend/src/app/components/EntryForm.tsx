import { ReactNode } from 'react';
import styles from '../styles/entryForm.module.scss';

interface Children {
  designContainer: ReactNode;
  form: ReactNode;
}

const EntryForm = ({ designContainer, form }: Children) => {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.entryForm}>
        <div className={styles.formContent}>{form}</div>
        {designContainer}
      </div>
    </div>
  );
};

export default EntryForm;
