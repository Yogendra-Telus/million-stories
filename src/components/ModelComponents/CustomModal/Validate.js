import * as Yup from 'yup';

export const validateTopics = props =>
  Yup.object({
    title: Yup.string('Enter Title')
      .required('This is a required field')
      .max(40, 'Too many characters'),
    description: Yup.string('Enter description').max(400, 'Too many characters'),
    mediaImage: Yup.object({
      fileList: Yup.array().required(),
      file: Yup.object().required(),
    }).shape({}),
    mediaVideo: Yup.object({
      fileList: Yup.array().required(),
      file: Yup.object().required(),
    }).shape({}),
    mediaAudio: Yup.object({
      fileList: Yup.array().required(),
      file: Yup.object().required(),
    }).shape({}),
    embedCode: Yup.string().matches(/<object[^>]*>(.*?)<\/object>/, 'Enter valid embed code!'),
  });
