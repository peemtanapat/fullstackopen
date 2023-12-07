import { Fragment } from 'react';
import Parts from './Part';

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <Fragment>
      <Parts parts={parts} />
      <strong>Total of {totalExercises} exercises</strong>
    </Fragment>
  );
};

export default Content;
