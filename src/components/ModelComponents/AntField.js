import React, { useEffect } from 'react';
import {
  DatePicker,
  Form,
  Input,
  TimePicker,
  Select,
  Checkbox,
  Radio,
  Switch,
  Upload,
  AutoComplete,
  message,
} from 'antd';

message.config({
  duration: 1,
  maxCount: 1,
});

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = ({
  AntComponent,
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  defaultValue,
  style,
  direction,
  dragInside,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  const customOnChange = props.onChange ? props.onChange : value => form.setFieldValue(field.name, value);

  useEffect(() => {
    form.setFieldValue(field.name, defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`field-container ${direction === 'horizontal' ? 'd-flex align-items-center' : ''}`}>
      <FormItem
        style={style}
        hasFeedback={!!((hasFeedback && submitted) || (hasFeedback && touched))}
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? 'error' : 'success'}
        extra={props.extra}
        label={!(type === 'radio' || type === 'checkbox') && label}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type === 'checkbox' || type === 'radio' ? customOnChange : onInputChange}
        >
          {(selectOptions &&
            selectOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))) ||
            ((type === 'radio' || type === 'checkbox') && label) ||
            (dragInside && dragInside)}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const AntSelect = props => <CreateAntField AntComponent={Select} {...props} />;
export const AntDatePicker = props => <CreateAntField AntComponent={DatePicker} {...props} />;
export const AntRangePicker = props => <CreateAntField AntComponent={DatePicker.RangePicker} {...props} />;
export const AntInput = props => <CreateAntField AntComponent={Input} type="text" {...props} />;
export const AntTimePicker = props => <CreateAntField AntComponent={TimePicker} {...props} />;
export const AntTextarea = props => <CreateAntField AntComponent={Input.TextArea} type="textarea" {...props} />;
export const AntCheckbox = props => <CreateAntField AntComponent={Checkbox} type="checkbox" {...props} />;
export const AntRadio = props => <CreateAntField {...props} type="radio" AntComponent={Radio} />;
export const AntSwitch = props => <CreateAntField {...props} AntComponent={Switch} />;
export const AntDragger = props => <CreateAntField {...props} AntComponent={Upload.Dragger} />;
export const AntAutoComplete = props => <CreateAntField {...props} AntComponent={AutoComplete} />;
export const AntPassword = props => <CreateAntField AntComponent={Input.Password} type="password" {...props} />;
export const AntCheckboxGroup = props => <CreateAntField {...props} type="checkbox" AntComponent={Checkbox.Group} />;
