import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import _ from 'lodash';

const PartnerModal = ({ partner, setPartner }) => {
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    setModalState(!_.isEmpty(partner));
  }, [partner]);

  const toggleModalState = () => {
    setModalState(!modalState);
    setPartner(undefined);
  };

  const extractURL = str => str.split('//')[1];

  return (
    <Modal
      className="partner-modal"
      title={partner.name}
      visible={modalState}
      onCancel={toggleModalState}
      footer={null}
    >
      <div className="partner-detail-container">
        <div className="partner-description-container">
          {partner.description}
          {partner.link && (
            <a target="_blank" rel="noopener noreferrer" href={partner.link}>
              {extractURL(partner.link)}
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PartnerModal;
