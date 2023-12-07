import { Fragment } from 'react';

const Part = ({ part }) => {
  return (
    <Fragment>
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    </Fragment>
  );
};

const Parts = ({parts}) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

export default Parts;
