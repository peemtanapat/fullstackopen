import { Fragment } from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({ courses }) => {
  return (
    <Fragment>
      {courses.map((course) => (
        <>
          <Header text={course.name} />
          <Content parts={course.parts} />
        </>
      ))}
    </Fragment>
  );
};

export default Course;
