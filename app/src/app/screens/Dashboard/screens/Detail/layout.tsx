import React from 'react';

import { withSpinner } from '~components/Spinner';
import { Recipe } from '~constants/interfaces/recipe';

import RecipePreview from '../Category/components/RecipePreview';

import Code from './components/Code';
import styles from './styles.module.scss';

interface Props {
  tech: string;
  category: string;
  title: string;
  recipe: Recipe;
  onDownload: () => void;
}

function DetailLayout({ tech, category, title, recipe, onDownload }: Props) {
  return (
    <>
      <div className={styles.upperSection}>
        <div className="row space-between m-bottom-4 middle">
          <h1 className="title">{title}</h1>
        </div>
        <div className={styles.detailsRecipe}>
          <RecipePreview recipe={recipe} />
        </div>
      </div>
      <Code
        downloadCommand={`npx @wolox/cookbook install ${tech} ${category} ${title}`}
        title={title}
        source={recipe.source}
        onDownload={onDownload}
      />
    </>
  );
}

export default withSpinner({
  WrappedComponent: DetailLayout,
  typeLoading: 'wandering-cubes',
  colorSpinner: '#002363',
  classNameContainer: '',
  classNameLoading: styles.loaderContainer
});
