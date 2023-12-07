const Total = ({ parts }) => {
  const numberOfExercises = parts.reduce(
    (prev, curr) => curr.exercises + prev,
    0
  );

  return <p>Number of exercises {numberOfExercises}</p>;
};

export default Total;
