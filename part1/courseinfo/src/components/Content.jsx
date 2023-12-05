import { Fragment } from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <Fragment>
      {parts.map((part) => (
        <Part key={part.key} part={part} />
      ))}
    </Fragment>
  );
};

export default Content;
