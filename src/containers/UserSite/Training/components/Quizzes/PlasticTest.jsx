/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar, Row,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderRadioButtonField from '../../../../../shared/components/form/RadioButton';
import history from '../../../../../shared/utils/history';

class PlasticTest extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      submitQ1: false,
      submitQ2: false,
      submitQ3: false,
      submitQ4: false,
      submitQ5: false,
      submitQ6: false,
      submitQ7: false,
      submitQ8: false,
      submitQ9: false,
      submitQ10: false,
      submit: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirectToTrainingPage = () => {
    history.push('/training');
    window.location.reload(true);
  }

  // state = {
  //   questions: [
  //     {
  //       question: 'What is 8 x 1?',
  //       answers: [
  //         '5',
  //         '6',
  //         '7',
  //         '8',
  //       ],
  //       correctAnswer: 3,
  //     },
  //     {
  //       question: 'What is 5 x 1?',
  //       answers: [
  //         '7',
  //         '5',
  //         '8',
  //         '6',
  //       ],
  //       correctAnswer: 1,
  //     },
  //     {
  //       question: 'What is 7 x 1?',
  //       answers: [
  //         '7',
  //         '8',
  //         '5',
  //         '6',
  //       ],
  //       correctAnswer: 0,
  //     },
  //     {
  //       question: 'What is 3 x 2?',
  //       answers: [
  //         '8',
  //         '5',
  //         '7',
  //         '6',
  //       ],
  //       correctAnswer: 3,
  //     },
  //   ],
  // };

  CORRECT_ANS = {
    Q1: '3',
    Q2: '2',
    Q3: '4',
    Q4: '2',
    Q5: '2',
    Q6: '1',
    Q7: '2',
    Q8: '3',
    Q9: '3',
    Q10: '1',
  }
  handleSubmit = (values) => {
    // for (const key in values) {
    // }
    let result = 0;
    let persentage = 0;
    let perFloat = 0;
    let credit = '';
    Object.keys(values).forEach((key) => {
      if (this.CORRECT_ANS[key] === values[key]) {
        result += 1;
        persentage = (100 / 10) * result;
        perFloat = parseFloat(persentage).toFixed(2);
        console.log(key);
        switch (key) {
          case 'Q1':
            this.setState({ submitQ1: false });
            break;
          case 'Q2':
            this.setState({ submitQ2: false });
            break;
          case 'Q3':
            this.setState({ submitQ3: false });
            break;
          case 'Q4':
            this.setState({ submitQ4: false });
            break;
          case 'Q5':
            this.setState({ submitQ5: false });
            break;
          case 'Q6':
            this.setState({ submitQ6: false });
            break;
          case 'Q7':
            this.setState({ submitQ7: false });
            break;
          case 'Q8':
            this.setState({ submitQ8: false });
            break;
          case 'Q9':
            this.setState({ submitQ9: false });
            break;
          case 'Q10':
            this.setState({ submitQ10: false });
            break;
          default:
            break;
        }
      } else if (key === 'Q1') {
        this.setState({ submitQ1: true });
      } else if (key === 'Q2') {
        this.setState({ submitQ2: true });
      } else if (key === 'Q3') {
        this.setState({ submitQ3: true });
      } else if (key === 'Q4') {
        this.setState({ submitQ4: true });
      } else if (key === 'Q5') {
        this.setState({ submitQ5: true });
      } else if (key === 'Q6') {
        this.setState({ submitQ6: true });
      } else if (key === 'Q7') {
        this.setState({ submitQ7: true });
      } else if (key === 'Q8') {
        this.setState({ submitQ8: true });
      } else if (key === 'Q9') {
        this.setState({ submitQ9: true });
      } else if (key === 'Q10') {
        this.setState({ submitQ10: true });
      }
      return console.log([perFloat]);
    });
    if (perFloat <= 50) {
      credit = 'red';
    } else {
      credit = '#00c0d4';
    }
    console.log({ credit });
    // window.alert(`Result= ${result} / 10 Persentage=  ${perFloat}  %`);
    this.setState({
      submit:
  <div>
    <h4>Quiz Results</h4>
    <p>Please review the correct answer.</p>
    <h5 style={{ color: `${credit}` }}>You got {result} points. Your score is {perFloat} %</h5>
    {/* Result= {result} / 10 <br />Persentage=  {perFloat}  % */}
  </div>,
    });
    window.scrollTo(0, 0);
  };

  render() {
    const { handleSubmit } = this.props;
    const {
      submitQ1, submitQ2, submitQ3, submitQ4, submitQ5, submitQ6, submitQ7, submitQ8, submitQ9, submitQ10, submit,
    } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <h2 style={{ textAlign: 'center' }}>Plastic Waste Quiz</h2><br />
            <Row style={{ textAlign: 'center', margin: '0 auto', width: 'fit-content' }}>
              <div>
                {submit}
              </div>
            </Row>
            <br />
            <form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
              <div className="form__form-group">
                <span className="quiz__text">1. What is a best way to avoid plastic waste?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q1"
                    component={renderRadioButtonField}
                    label="Landfill"
                    radioValue="1"
                    className={submitQ1 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q1"
                    component={renderRadioButtonField}
                    label="Incineration"
                    radioValue="2"
                    className={submitQ1 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q1"
                    component={renderRadioButtonField}
                    label="Refuse"
                    radioValue="3"
                    className={submitQ1 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q1"
                    component={renderRadioButtonField}
                    label="Recycle"
                    radioValue="4"
                    className={submitQ1 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ1 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: Refuse</p>
                      <p className="quiz_correct quiz__radio">Refusing unnecessary plastic items such as plastic bags, plastic bottles, straws and disposable food containers in your daily life helps reducing the hazardous situation for the world.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">2. Burning plastic is a good way to dispose plastic waste.</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q2"
                    component={renderRadioButtonField}
                    label="True"
                    radioValue="1"
                    className={submitQ2 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q2"
                    component={renderRadioButtonField}
                    label="False"
                    radioValue="2"
                    className={submitQ2 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ2 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: False</p>
                      <p className="quiz_correct quiz__radio">Burning plastic in an open field is one of the major causes of air pollution. The toxic chemicals  release while burning plastic  and  later they leach into the environment and human bodies.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">3. Plastic is not only found in the ocean. What percentage of the world’s sea bird have plastic rubbish in their guts?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q3"
                    component={renderRadioButtonField}
                    label="50%"
                    radioValue="1"
                    className={submitQ3 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q3"
                    component={renderRadioButtonField}
                    label="60%"
                    radioValue="2"
                    className={submitQ3 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q3"
                    component={renderRadioButtonField}
                    label="70%"
                    radioValue="3"
                    className={submitQ3 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q3"
                    component={renderRadioButtonField}
                    label="90%"
                    radioValue="4"
                    className={submitQ3 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ3 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: 90%</p>
                      <p className="quiz_correct quiz__radio">In 2015, a study by Australian and British scientists determined that 90% of seabirds living today have ingested some form of plastic, mistaking it for food. If plastic consumption continues at its current rate, 99 percent of seabirds will carry plastic in their guts by 2050. </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">4. Which type of plastic is safe to use for human?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q4"
                    component={renderRadioButtonField}
                    label="PET"
                    radioValue="1"
                    className={submitQ4 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q4"
                    component={renderRadioButtonField}
                    label="PP"
                    radioValue="2"
                    className={submitQ4 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q4"
                    component={renderRadioButtonField}
                    label="PS"
                    radioValue="3"
                    className={submitQ4 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ4 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: PP</p>
                      <p className="quiz_correct quiz__radio">PP is a thermoplastic polymer prized for its resistance to heat and fatigue, strength, toughness and flexibility. It is considered one of the safest plastic which does not leach chemicals.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">5. What is the lifespan of a single used plastic bottle?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q5"
                    component={renderRadioButtonField}
                    label="100 years"
                    radioValue="1"
                    className={submitQ5 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q5"
                    component={renderRadioButtonField}
                    label="450 years"
                    radioValue="2"
                    className={submitQ5 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q5"
                    component={renderRadioButtonField}
                    label="700 years"
                    radioValue="3"
                    className={submitQ5 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ5 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: 450 years</p>
                      <p className="quiz_correct quiz__radio">It takes 450 years for a plastic bottle to degrade in the landfill. They don’t breakdown easily but become microplastics that absorb toxin and continue to pollute the environment.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">6. Reducing the use of plastic is everybody&apos;s responsibility.</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q6"
                    component={renderRadioButtonField}
                    label="True"
                    radioValue="1"
                    className={submitQ6 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q6"
                    component={renderRadioButtonField}
                    label="False"
                    radioValue="2"
                    className={submitQ6 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ6 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: True</p>
                      <p className="quiz_correct quiz__radio">We all have responsibility to reduce using of plastic items.  We should go for eco-friendly alternatives instead single use plastic.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">7. Polyethylene Styrofoam (PS) can usable to contain hot food.</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q7"
                    component={renderRadioButtonField}
                    label="True"
                    radioValue="1"
                    className={submitQ7 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q7"
                    component={renderRadioButtonField}
                    label="False"
                    radioValue="2"
                    className={submitQ7 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ7 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: False</p>
                      <p className="quiz_correct quiz__radio">Polystyrene is made up of multiple units of styrene which are particularly unsafe when heated or used with hot liquid. It will start to melt or break down, causing the chemicals- dioxin, benzene and styrene- to seep into the liquid or food.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">8. Why is plastic dangerous for marine life?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q8"
                    component={renderRadioButtonField}
                    label="They mistake it for food and cannot digest it."
                    radioValue="1"
                    className={submitQ8 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q8"
                    component={renderRadioButtonField}
                    label="They can get tangled in it which hinders their ability to swim."
                    radioValue="2"
                    className={submitQ8 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q8"
                    component={renderRadioButtonField}
                    label="Both a and b "
                    radioValue="3"
                    className={submitQ8 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q8"
                    component={renderRadioButtonField}
                    label="It is not dangerous because they use plastic waste for habitats."
                    radioValue="4"
                    className={submitQ8 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ8 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: Both a and b </p>
                      <p className="quiz_correct quiz__radio">According to UN, it is estimated that up to 13 million metric tons of plastic ends up in the ocean each year. Sea animals can become entangled in or ingest plastic debris , causing suffocation, starvation and drowning. </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">9. Which of the following answers contain the top 5 contribution countries to the world’s plastic pollution problem?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q9"
                    component={renderRadioButtonField}
                    label="Russia, France, USA, Vietnam, India"
                    radioValue="1"
                    className={submitQ9 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q9"
                    component={renderRadioButtonField}
                    label="Indonesia, Thailand, USA, China, France"
                    radioValue="2"
                    className={submitQ9 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q9"
                    component={renderRadioButtonField}
                    label="China, Indonesia, Vietnam, Philippines, Sri Lanka"
                    radioValue="3"
                    className={submitQ9 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q9"
                    component={renderRadioButtonField}
                    label="USA, China, India, UK, Australia"
                    radioValue="4"
                    className={submitQ9 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ9 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: China, Indonesia, Vietnam, Philippines, Sri Lanka</p>
                      <p className="quiz_correct quiz__radio">According to Statistia of Waste Management data,  China, Indonesia, Vietnam, Philippines, and Sri Lanka are the top 5 countries pollution the ocean the most.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form__form-group">
                <span className="quiz__text">10. How many ton of Plastic waste enter into the Ayeyarwaddy river everyday?</span>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q10"
                    component={renderRadioButtonField}
                    label="119 tons"
                    radioValue="1"
                    className={submitQ10 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q10"
                    component={renderRadioButtonField}
                    label="59 tons"
                    radioValue="2"
                    className={submitQ10 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div className="form__form-group-field quiz__radio">
                  <Field
                    name="Q10"
                    component={renderRadioButtonField}
                    label="29 tons"
                    radioValue="3"
                    className={submitQ10 ? 'danger' : ''}
                    disabled={submit !== ''}
                  />
                </div>
                <div>
                  {submitQ10 && (
                    <div>
                      <p className="quiz_correct quiz__radio">Ans: 119 tons</p>
                      <p className="quiz_correct quiz__radio">119 tons of plastic waste enter the Ayeyarwady river every day, which makes it one of the most polluted rivers in the world. (Myanmar Water Portal News, 2019)</p>
                    </div>
                  )}
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit" disabled={submit !== ''}>Submit Answer</Button>
                <Button color="secondary" onClick={() => this.redirectToTrainingPage()}>
                  Cancel
                </Button><br />
              </ButtonToolbar>
              {/* {this.setState({ ans: 0 })} */}
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'plastic_test_form',
})(PlasticTest);
