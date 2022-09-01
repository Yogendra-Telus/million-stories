/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import actionCreator from '../../store/actions/PartnerActions';
import PartnerModal from '../modal/PartnerModal';

const Partner = props => {
  props.setDisplay(' partners-page');
  props.setTheme('dark');
  props.setTitle('Partners');
  const [partner, setPartner] = useState(undefined);
  if (!props.partners) {
    props.getAllPartners();
  }

  const handlePartner = selectedPartner => {
    setPartner(selectedPartner);
  };

  return (
    <>
      <section className="partner-container">
        <div className="partner-header">
          <h4>Partners</h4>
          <p>
            Thank you to our partners.
            <span>Click on a logo to learn more about them.</span>
          </p>
        </div>
        <div className="partner-grid">
          {!_.isEmpty(props.partners) &&
            props.partners.map(item => (
              <div className="logo_box" key={item.id}>
                <img
                  className="logo-white"
                  // style={{ filter: 'grayscale(1)  invert(80%) brightness(1)' }}
                  src={item.logo}
                  alt="item.title"
                />
                <img className="logo-color" src={item.logo} alt="item.title" onClick={() => handlePartner(item)} />
              </div>
            ))}
        </div>
      </section>
      {partner && <PartnerModal partner={partner} setPartner={setPartner} />}
    </>
  );
};

export default connect(
  state => state.partners,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(Partner);
