/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */

import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import renderRadioButtonField from '../../../../../shared/components/form/RadioButton';
import history from '../../../../../shared/utils/history';
import { addNewUserAnsQuiz } from '../../../../../redux/actions/apiActions/userAnsQuizActions';
import './QuizStyles.css';

class PlasticTestAPI extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    submitResult: null,
    sub: Array(10).fill(false),
  };

  redirectToTrainingPage = () => {
    history.push('/training');
    window.location.reload(true);
  };

  handleSubmit = (values) => {
    const { Questions } = this.props.quizzes.detail;
    const token = localStorage.getItem('jwt');
    const { id } = jwtDecode(token);
    let result = 0;
    const arr = Questions.map((q, i) => {
      const userAnswer = values[i] !== undefined ? values[i].toString() : '';
      const correct = q.CorrectAnswer.toString();
      const isWrong = userAnswer !== correct;
      if (!isWrong) result += 1;
      return isWrong;
    });

    const percentage = (100 / Questions.length) * result;
    const color = percentage <= 50 ? 'red' : '#18b525ff';

    this.setState({ submitResult: { result, percentage, color }, sub: arr }, () => window.scrollTo(0, 0));

    addNewUserAnsQuiz({
      quizID: this.props.quizzes.detail._id,
      userID: id.toString(),
      UserAns: values,
      TotalCorrectAns: result,
      TotalCorrectPersentage: percentage,
    });
  };

  render() {
    const { quizzes, handleSubmit } = this.props;
    const { submitResult, sub } = this.state;

    return (
      <div className="quiz-container">
        {quizzes.detail && (
          <div className="quiz-card">
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#2d3748',
                marginBottom: '10px',
              }}
              dangerouslySetInnerHTML={{ __html: quizzes.detail.title }}
            />

            <p
              className="quiz-subtitle"
              style={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#4a5568',
                marginBottom: '24px',
              }}
            >
              This short lesson will teach you how to dispose your plastic waste without creating risk for public health and environment.
            </p>

            {submitResult && (
              <div className="quiz-result">
                <h4>Quiz Results</h4>
                <p>Please review the correct answers.</p>
                <h5 style={{ color: submitResult.color, marginBottom: '20px' }}>
                  You got {submitResult.result} points. Your score is {submitResult.percentage.toFixed(2)}%
                </h5>
              </div>
            )}

            <form onSubmit={handleSubmit(this.handleSubmit)} className="quiz-form">
              {quizzes.detail.Questions.map((q, idx) => (
                <div className="quiz-question-card" key={idx}>
                  <p className="quiz-question-title" style={{ marginBottom: '20px', color: '#2D6E43' }}>{q.Question}</p>
                  <div className="quiz-options">
                    {q.OptionalAnswers.map((ans, ai) => (
                      // eslint-disable-next-line jsx-a11y/label-has-for
                      <label className="quiz-radio-option" key={ai}>
                        <Field
                          name={`${idx}`}
                          component={renderRadioButtonField}
                          radioValue={ans}
                          label={ans}
                          className={`quiz-radio-button ${sub[idx] ? 'danger' : ''}`}
                          disabled={!!submitResult}
                        />
                      </label>
                    ))}
                  </div>
                  {sub[idx] && (
                    <div className="quiz-feedback">
                      <strong>Answer:</strong> {q.CorrectAnswer}<br />
                      {q.Explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="quiz-buttons">
                <button type="submit" className="quiz-btn submit" disabled={!!submitResult}>
                  Submit Answer
                </button>
                <button type="button" onClick={this.redirectToTrainingPage} className="quiz-btn cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default reduxForm({ form: 'plastic_quiz' })(PlasticTestAPI);
