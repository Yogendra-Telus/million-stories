import React from 'react';

const SelectedValues = ({ values, deleteOption }) => (
  <span className="selected-values-filter">
    {values.label}: {values.value}{' '}
    <div
      className="delete-option"
      onClick={() => deleteOption(values.label)}
      onKeyDown={() => deleteOption(values.label)}
      role="button"
      tabIndex="0"
    >
      +
    </div>
  </span>
);

export default SelectedValues;
