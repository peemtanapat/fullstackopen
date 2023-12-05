import { Fragment } from 'react';

const Header = ({ course }) => {
  return (
    <Fragment>
      <h1>{course}</h1>
    </Fragment>
  );
};

export default Header;
