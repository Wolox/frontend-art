import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { getRecipeFiles } from '~utils/queries';
import { getRecipeCode } from '~utils/recipes';
import { updateDownloadsCounter } from 'services/FirebaseService';
import { TreeEntry, FileTypes } from '~constants/interfaces/recipe';

import DetailLayout from './layout';

const zipEntry = (zip: JSZip, entry: TreeEntry) => {
  if (entry.type === FileTypes.blob) {
    zip.file(entry.name, entry.src);
  } else {
    const newFolder = zip.folder(entry.name);
    if (newFolder) entry.entries.forEach(newEntry => zipEntry(newFolder, newEntry));
  }
};

function Detail() {
  const { tech, category, recipe: recipeName } = useParams<{
    tech: string;
    category: string;
    recipe: string;
  }>();
  const { data, loading } = useQuery(getRecipeFiles(tech, category, recipeName));
  const recipeCode = getRecipeCode(data?.repository);

  const downloadZip = useCallback(() => {
    const { source } = recipeCode;
    updateDownloadsCounter(tech, recipeName);
    const zip = new JSZip();
    // TODO: Remove TreeEntry type once the parseTree has type checking
    source?.entries.forEach((entry: TreeEntry) => zipEntry(zip, entry));
    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, 'code.zip');
    });
  }, [recipeCode, recipeName, tech]);

  return (
    <DetailLayout
      loading={loading}
      tech={tech}
      category={category}
      title={recipeName}
      recipe={recipeCode}
      onDownload={downloadZip}
    />
  );
}

export default Detail;
