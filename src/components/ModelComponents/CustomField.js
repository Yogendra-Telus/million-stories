import React from 'react';
import { Field } from 'formik';

const CustomField = ({ ...input }) => (
  <Field
    name={input.name}
    id={input.id}
    component={input.Component}
    selectOptions={input.selectOptions && input.selectOptions}
    defaultValue={input.defaultValue && input.defaultValue}
    {...input}
  />
);

export default CustomField;
