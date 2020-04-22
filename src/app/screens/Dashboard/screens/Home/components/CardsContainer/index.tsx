import React from 'react';

import { withSpinner } from '~components/Spinner';

import Card from '../Card';
import styles from './styles.module.scss';

interface Props {
  components: {
    title: string,
    html: string,
    css: string
  }[],
  category: string
}

function CardsContainer({ components, category }: Props) {
  return (
    <div className={styles.cardContainer}>
      {!!components?.length &&
        components.map((comp, index) => (
          <Card key={comp.title} number={index} component={comp} category={category} />
        ))}
    </div>
  );
}

export default withSpinner({
  WrappedComponent: CardsContainer,
  typeLoading: 'wandering-cubes',
  colorSpinner: '#002363',
  classNameContainer: '',
  classNameLoading: styles.loaderContainer
});