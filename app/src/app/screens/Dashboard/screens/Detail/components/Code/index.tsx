import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import CodeSnippet from '~components/CodeSnippet';
import Tree from '~components/Tree';
import { SelectedFile, TreeRecipe } from '~constants/interfaces/recipe';

import styles from './styles.module.scss';

interface Props {
  title: string;
  downloadCommand?: string;
  source: TreeRecipe;
  onDownload: () => void;
}

const defaultSelectedFile = {
  id: '',
  name: '',
  src: '',
  lang: '',
  isBinary: false
};

function Code({ title, source, downloadCommand, onDownload }: Props) {
  const [fileData, setFileData] = useState<SelectedFile>(defaultSelectedFile);
  const handleFileSelect = (data: SelectedFile = defaultSelectedFile) => {
    setFileData(data);
  };

  return (
    <div className={styles.filesStructureContainer}>
      <div className={`m-bottom-6 ${styles.header}`}>
        <div className="row">
          {downloadCommand && (
            <div className="column start m-left-6">
              <p className="subtitle m-bottom-2">Install using @wolox/cookbook CLI:</p>
              <div className="m-bottom-2">
                <pre className={styles.installInstructions}>{downloadCommand}</pre>
              </div>
            </div>
          )}
          <div className="column start m-left-6">
            <p className="subtitle m-bottom-2">Download files instead:</p>
            <button className={styles.downloadButton} type="button" onClick={onDownload}>
              Download code
            </button>
          </div>
        </div>
      </div>
      <h3 className={styles.fileName}>{fileData.name || '(Choose a file from the picker)'}</h3>
      <div className={styles.codeContainer}>
        <Tree handleSelect={handleFileSelect} source={source} title={title} activeId={fileData.id} />
        <div className={styles.codeSnippets}>
          {fileData.lang === 'md' ? (
            <ReactMarkdown
              className="full-width column markdown-container"
              source={fileData.src}
              escapeHtml={false}
            />
          ) : (
            <CodeSnippet
              className={`${styles.code} ${styles.codeVisible}`}
              code={fileData.isBinary ? 'Not supported file' : fileData.src}
              lang={fileData.lang}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Code;
