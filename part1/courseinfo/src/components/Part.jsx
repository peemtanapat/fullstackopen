import { Fragment } from 'react';

const Part = ({ part }) => {
  return (
    <Fragment>
      <p>
        {part.name} {part.exercises}
      </p>
    </Fragment>
  );
};

export default Part;
