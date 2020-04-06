import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import {useHttp} from '../hooks/http.hook';
import {useHistory} from 'react-router';

function createAnswer(value = '') {
  return {
    answer: value,
    id: nanoid()
  };
}

export const CreatePage = () => {
  const history = useHistory();
  const {loading, request} = useHttp();
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([
    createAnswer(),
    createAnswer()
  ]);

  const changeAnswerHandler = (value, id) => {
    const copyAnswers = [...answers];
    const idx = answers.findIndex(a => a.id === id);
    copyAnswers[idx].answer = value;

    setAnswers(copyAnswers);
  };

  const addAnswerHandler = (evt) => {
    evt.preventDefault();
    const newAnswer = createAnswer();
    setAnswers([...answers, newAnswer]);
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      // Избавимся от id
      const copyAnswers = answers.map(a => {
        return {
          answer: a.answer
        };
      });
      const data = await request('/api/vote/create', 'POST', {title, answers: copyAnswers});
      history.push(`/vote/${data.vote._id}`);
    } catch (e) {
    }

  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создать опрос</h1>
        <form action="/api/vote/create" method="POST" onSubmit={submitHandler}>
          <div className="card">
            <div className="card-content">
              <div className="input-field">
                <input type="text"
                       id="title"
                       name="title"
                       placeholder="Название голосования"
                       value={title}
                       onChange={(evt) => setTitle(evt.target.value)}/>
                <label htmlFor="title">Название голосования</label>
              </div>
              {answers.map((a, i) => {
                return (
                  <div className="input-field" key={a.id}>
                    <input type="text"
                           id={a.id}
                           name="a.id"
                           placeholder={`Ответ ${i + 1}`}
                           value={a.answer}
                           onChange={(evt) => changeAnswerHandler(evt.target.value, a.id)}/>
                  </div>
                );
              })}
              <button className="btn" onClick={addAnswerHandler}>Добавить ответ</button>
            </div>
            <div className="card-action">
              <button className="btn" disabled={loading}>Создать</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};