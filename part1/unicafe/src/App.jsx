import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ label, value }) => (
  <p>
    {label} : {value}
  </p>
);


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  const average = ((good - bad) / total).toFixed(1);
  const positivePercentage = `${((good * 100) / total).toFixed(1)} %`;

  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{positivePercentage}</td>
        </tr>
      </tbody>
    </table>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = (setter, value) => {
    console.log('value now', value);
    setter(value);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handleFeedback(setGood, good + 1)} text="Good" />
      <Button handleClick={() => handleFeedback(setNeutral, neutral + 1)} text="Neutral" />
      <Button handleClick={() => handleFeedback(setBad, bad + 1)} text="Bad" />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;