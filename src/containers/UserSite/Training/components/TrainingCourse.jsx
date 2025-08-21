/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable camelcase */

import React, { PureComponent } from 'react';
import { Row, Col, Modal } from 'reactstrap';
import history from '../../../../shared/utils/history';

import '../Training.css';

const reference = `${process.env.PUBLIC_URL}/img/Trainingview/reference.png`;

class TrainingCourseAPI extends PureComponent {
  state = {
    isOpen: false,
    ref: null,
  };

  redirectToQuizPage = (quizId) => {
    history.push(`/training/quiz/${quizId}`);
    window.location.reload(true);
  };

  redirectToTrainingSlidePage = (trainingSlideId) => {
    history.push(`/training/trainingSlide/${trainingSlideId}`);
    window.location.reload(true);
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  openModal = (data) => {
    this.setState({
      ref: data,
      isOpen: true,
    });
  };

  render() {
    const { training_slides } = this.props;
    const { isOpen, ref } = this.state;

    return (
      <Row>
        {training_slides.list &&
          training_slides.list.map((data, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col md={6} key={index}>
              <div className="training-card-container">
                <div className="training-card">
                  <div className="training-card-header">
                    <h3 className="training-title" style={{ color: '#2D6E43', fontWeight: 700 }}>{data.Title}</h3>
                    <img
                      src={reference}
                      alt="reference"
                      className="training-icon"
                      onClick={() => this.openModal(data.Reference)}
                    />
                  </div>
                  <p className="training-description">{data.Description}</p>
                  <p className="training-author" style={{ color: '#0cf75aff', fontWeight: 400 }}>By {data.Name}</p>
                  <div className="training-buttons">
                    <button
                      className="learn-button"
                      onClick={() => this.redirectToTrainingSlidePage(data._id)}
                    >
                    Learn
                    </button>
                    <button
                      className="quiz-button"
                      onClick={() => this.redirectToQuizPage(data.quizID._id)}
                    >
                    Quiz
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}

        <Modal isOpen={isOpen} className="modal-dialog--success">
          <div className="modal__header">
            <button
              className="lnr lnr-cross modal__close-btn"
              type="button"
              onClick={this.closeModal}
            />
            {ref && <h4 className="bold-text modal__title">Reference Websites</h4>}
          </div>
          <div className="modal__body">
            {ref &&
              ref.map((prop, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={idx}>
                  <a href={prop} target="_blank" rel="noopener noreferrer">
                    {prop}
                  </a>
                </p>
              ))}
          </div>
        </Modal>
      </Row>
    );
  }
}

export default TrainingCourseAPI;
