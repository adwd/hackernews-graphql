import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Stories, StoriesVariables } from '../graphql/__generated__/Stories';
import { STORY_FRAGMENT, Story } from '../components/Story';

const STORIES = gql`
  query Stories($limit: Int) {
    stories(limit: $limit) {
      ...StoryFragment
    }
  }
  ${STORY_FRAGMENT}
`;

const Home = () => {
  const { loading, error, data } = useQuery<Stories, StoriesVariables>(
    STORIES,
    {
      variables: {
        limit: 20,
      },
    },
  );

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <IonHeader>
        <IonToolbar color="hack">
          <IonTitle>Hacker News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {data.stories.map(story => (
          <Story story={story} key={story.id} />
        ))}
      </IonContent>
    </>
  );
};

export default Home;
