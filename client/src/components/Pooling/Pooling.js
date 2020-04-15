import React, {useState} from 'react';
import Checkbox from '../UI/Checkbox/Checkbox';
import Button from '../UI/Button/Button';
import './Pooling.css';

const Pooling = ({voteId, answers, onSubmitChoice}) => {
  const [answerId, setAnswerId] = useState(null);

  return (
    <div className="Pooling">
      <ul className="Pooling-list">
        {answers.map(answer => (
          <li className="Pooling-item" key={answer._id}>
            <Checkbox
              type="radio"
              name="answer"
              onChange={() => setAnswerId(answer._id)}
            >{answer.answer}</Checkbox>
          </li>
        ))}
      </ul>
      <div className="Pooling-action">
        <Button
          className="Button_type_active"
          disabled={!!!answerId}
          onClick={() => onSubmitChoice(voteId, answerId)}
        >Голосовать</Button>
        <Button onClick={() => onSubmitChoice(voteId, null, true)}>Воздержаться</Button>
      </div>
    </div>
  );
};

export default Pooling;