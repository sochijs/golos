import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import './CreateVote.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Checkbox from '../UI/Checkbox/Checkbox';

function createAnswer(value = '', canDelete = false, error = null) {
  return {
    answer: value,
    id: nanoid(),
    canDelete
  };
}

const CreateVote = ({onSubmit, loading}) => {
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([
    createAnswer(),
    createAnswer()
  ]);
  const [isPublic, setIsPublic] = useState(false);
  const changeAnswerHandler = (value, id) => {
    const copyAnswers = [...answers];
    const idx = answers.findIndex(a => a.id === id);
    copyAnswers[idx].answer = value;

    setAnswers(copyAnswers);
  };

  const addAnswerHandler = (evt) => {
    evt.preventDefault();
    const newAnswer = createAnswer('', true);
    setAnswers([...answers, newAnswer]);
  };

  const deleteAnswerHandler = (id) => {
    const copyAnswers = answers.filter(a => a.id !== id);
    setAnswers(copyAnswers);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    // Избавимся от id
    const copyAnswers = answers.filter(a => a.answer !== '').map(a => {
      return {
        answer: a.answer
      };
    });

    onSubmit(title, copyAnswers, isPublic);
  };

  return (
    <div className="CreateVote">
      <div className="CreateVote-wrapper">
        <form className="CreateVote-form" action="/api/vote/create" method="POST" onSubmit={onSubmitHandler}>
          <div className="CreateVote-content">
            <Input
              name="title"
              className="CreateVote-question"
              placeholder="Название голосования"
              label="Название голосования"
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
              required
            />
            <div className="CreateVote-answers">Варианты для ответа <span className="CreateVote-required">*</span></div>
            {answers.map((a, i) => {
              return (
                <Input
                  key={a.id}
                  placeholder={`Ответ ${i + 1}`}
                  name={a.id}
                  value={a.answer}
                  onChange={(evt) => changeAnswerHandler(evt.target.value, a.id)}
                  required
                >
                  {a.canDelete &&
                  <i className="material-icons CreateVote-deleteAnswer"
                     onClick={() => deleteAnswerHandler(a.id)}>close</i>}
                </Input>
              );
            })}
            <Button onClick={addAnswerHandler}>Добавить ответ</Button>
          </div>
          <div className="CreateVote-action">
            <Button className="Button_type_active" disabled={loading}>Создать</Button>
            <Checkbox
              type="checkbox"
              label="Публичный вопрос?"
              onChange={(evt) => setIsPublic(evt.target.checked)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVote;