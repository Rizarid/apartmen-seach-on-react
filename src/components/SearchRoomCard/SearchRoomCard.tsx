import { Form } from 'react-final-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { selectUpdateStatus } from 'src/redux/RoomCardsStatus/RoomCardsStatusSlice';
import DropdownGuests from 'src/components/DropdownGuests/DropdownGuests';
import Button from 'src/components/Button/Button';
import DateDropdown from 'src/components/DateDropdown/DateDropdown';

import styles from './SearchRoomCard.module.scss';

const SearchRoomCard = (): JSX.Element => {
  const [isSubmited, submit] = useState(false);
  const isCardsUpdated = useSelector(selectUpdateStatus);
  const router = useRouter();
  const disputch = useDispatch();

  useEffect(() => {
    if (isSubmited && isCardsUpdated) {
      disputch({ type: "UPDATE_ROOMS", payload: 1 })
      router.push('/search');
    }

    return () => {};
  });

  return (
    <Form onSubmit={() => submit(true)}>
      {({ handleSubmit }) => (
        <div className={styles.searchRoomCard}>
          <h1 className={styles.title}>Найдём номера под ваши пожелания</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <DateDropdown from='searchCard'/>
            </div>
            <div className={styles.formItem}>
              <h3 className={styles.formItemTitle}>гости</h3>
              <DropdownGuests from='searchCard'/>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type='submit'
                theme='filled'
                text='подобрать номер'
                isDisabled={isSubmited}
              />
            </div>
          </form>
        </div>
      )}
    </Form>
  );
};

export default SearchRoomCard;
