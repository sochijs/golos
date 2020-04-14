import React from 'react';
import classNames from 'classnames';
import './Progress.css';

const Progress = ({choice, width, isWin}) => {
  const classesProgress = classNames(
    'Progress',
    {'Progress_win': isWin}
  );
  const classesProgressDeterminate = classNames(
    'Progress-determinate',
    {'Progress-determinate_win': isWin}
  );

  return (
    <div className={classesProgress}>
      <div className={classesProgressDeterminate} style={{width: `${width}%`}}/>
    </div>
  );
};

export default Progress;