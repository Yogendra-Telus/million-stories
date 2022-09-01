/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Button, message } from 'antd';
import { bindActionCreators } from 'redux';
import MaskedInput from 'antd-mask-input';

import Validate from './Validate';
import actionCreator from '../../store/actions/PartnerActions';
import { InitialMapper } from './Mapper';
import CustomField from '../ModelComponents/CustomField';
import { AntInput, AntCheckboxGroup, AntTextarea } from '../ModelComponents/AntField';
import * as Constants from '../../config/Constants';

const BecomeAPartner = props => {
  props.setTheme('dark');
  props.setTitle('Become a Partner');
  const submit = e => {
    const { partnershipType, firstName, lastName } = props.values;
    e.preventDefault();
    props
      .postBecomeAPartnerMail({
        ...props.values,
        name: `${firstName} ${lastName}`,
        partnershipType: partnershipType && partnershipType.length ? partnershipType.join(', ') : null,
      })
      .then(
        () => {
          message.success(Constants.mailSentCaption);
          props.resetForm(InitialMapper);
        },
        () => message.error(Constants.somethingWentWrongCaption)
      );
  };
  const options = [
    {
      label: 'Content',
      value: 'Content',
    },
    {
      label: 'Distribution',
      value: 'Distribution',
    },
    {
      label: 'Sponsorship',
      value: 'Sponsorship',
    },
    {
      label: 'Marketing',
      value: 'Marketing',
    },
  ];
  return (
    <div className="">
      <section className="partnerwrapper">
        <div className="partner-content-wrapper">
          <div className="partner-container">
            <div className="row">
              <div className="col-md-5 col-xs-12">
                <h4>Help us make a difference.</h4>
                <p>
                  Million Stories is here to make financial competence fun and engaging for everyone by using the power
                  of entertainment to capture attention, inspire action, create change, promote entrepreneurship and
                  inspire individual achievement.
                </p>
                <p>
                  Through great storytelling, we intend to break down the taboo of talking about finances and change the
                  perception that financial matters are boring. Or even hopeless.
                </p>
                <p>
                  The need is urgent. Most people don’t even know what they don’t know, and the statistics are
                  staggering:
                  <p>
                    <ul>
                      <li>More than 78% of Americans live paycheck to paycheck</li>
                      <li>Only 44% of Millennials are financially literate</li>
                      <li>The average Millennial is $42K in-debt</li>
                      <li>Collectively there is $1.5 trillion in student loan debt</li>
                      <li>The under-25 age group is the fastest growing group filing for bankruptcy</li>
                    </ul>
                  </p>
                </p>
                <p>
                  The lack of financial proficiency amongst us is devastating, but we’re doing something to change that
                  trajectory. We’re making financial competence entertaining, interesting and accessible to all. Along
                  the way, we intend to create a national conversation and, yes, inspire a movement.
                </p>
                <p>
                  Of course, we can’t do it alone. We need your help in getting the word out, sharing our content with
                  those who need it most, developing more content, and a whole lot more.
                </p>
                <p>Together, we can accomplish great things. Let’s meet!</p>
              </div>
              <div className="col-md-6 col-xs-12">
                <h4 className="hide-on-mobile">Start here.</h4>
                <form className="dark-theme">
                  <CustomField
                    name="company"
                    label="COMPANY"
                    placeholder="Your Company's Name"
                    maxLength={100}
                    component={AntInput}
                  />

                  <div className="row">
                    <div className="col-md-6 col-9">
                      <CustomField
                        name="firstName"
                        label="FIRST NAME"
                        placeholder="Your First Name"
                        maxLength={50}
                        component={AntInput}
                      />
                    </div>
                    <div className="col-md-6 col-9">
                      <CustomField
                        name="lastName"
                        label="LAST NAME"
                        placeholder="Your Last Name"
                        maxLength={50}
                        component={AntInput}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-9">
                      <CustomField name="title" label="TITLE" placeholder="Your Work Title" component={AntInput} />
                    </div>
                    <div className="col-md-6 col-9">
                      <CustomField name="email" label="WORK EMAIL" placeholder="your@email.com" component={AntInput} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-9">
                      <div className="ant-col ant-form-item-label">
                        <label title="PHONE">PHONE</label>
                      </div>
                      <MaskedInput
                        mask="(111) 111-1111"
                        name="phone"
                        size="14"
                        label="PHONE"
                        placeholder="(xxx) xxx-xxxx"
                        value={props.values.phone}
                        onChange={e => props.setFieldValue('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <p id="emailHelp" className="form-msg">
                    WHAT TYPE OF PARTNERSHIP ARE YOU INTERESTED IN?
                  </p>
                  <div className="row-checkbox">
                    <CustomField options={options} name="partnershipType" component={AntCheckboxGroup} />
                  </div>
                  <CustomField
                    rows={5}
                    label="YOUR MESSAGE"
                    className="user-msg-label"
                    name="message"
                    component={AntTextarea}
                  />
                  <div className="partner-btn-container">
                    <div className="coloured-border" />
                    <Button onClick={submit} disabled={!props.isValid} className="">
                      LET&apos;S MEET
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(null, dispatch => bindActionCreators(actionCreator, dispatch))(
  withFormik({ validationSchema: Validate, mapPropsToValues: () => InitialMapper })(BecomeAPartner)
);
