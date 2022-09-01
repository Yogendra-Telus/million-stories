import * as yup from 'yup';

const ValidationEditPlaylist = yup.object({
  name: yup
    .string()
    .required()
    .max(48),
});

export default ValidationEditPlaylist;
