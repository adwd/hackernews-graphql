import React from 'react';
import ReactDOM from 'react-dom';
import { Story } from './Story';
import { StoryFragment } from '../graphql/__generated__/StoryFragment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fakeStory: StoryFragment = {
    __typename: 'Story',
    id: 10,
    title: 'Hi',
    url: 'http://example.com/foo/bar',
    ogpImage: null,
    score: 130,
    by: 'me',
    time: Date.now(),
    kids: [{ __typename: 'Comment', id: 123 }],
  };
  ReactDOM.render(<Story story={fakeStory} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
