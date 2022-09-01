export const TopicsSubmitMapper = values => ({
  mediaType: values.mediaType,
  topicName: values.topicName || null,
  description: values.description || null,
  parentTopic: values.parentTopic || null,
  media: values.media,
});
