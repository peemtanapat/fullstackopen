import { Fragment } from 'react';

const Total = ({ parts }) => {
  const numberOfExercises = parts.reduce(
    (prev, curr) => curr.exercises + prev,
    0
  );

  return (
    <Fragment>
      <p>Number of exercises {numberOfExercises}</p>
    </Fragment>
  );
};

export default Total;
