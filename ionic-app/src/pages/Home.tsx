import { RefresherEventDetail } from '@ionic/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonText,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
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
  const { loading, error, data, refetch } = useQuery<Stories, StoriesVariables>(
    STORIES,
    {
      variables: {
        limit: 10,
      },
    },
  );

  const onRefresh = (ev: CustomEvent<RefresherEventDetail>) => {
    refetch().then(() => {
      ev.detail.complete();
    });
  };

  if (loading)
    return (
      <>
        <IonHeader>
          <IonToolbar color="hack">
            <IonTitle>Hacker News</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonProgressBar type="indeterminate"></IonProgressBar>
      </>
    );
  if (error || !data)
    return (
      <>
        <IonHeader>
          <IonToolbar color="hack">
            <IonTitle>Hacker News</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="danger">
            <h1>Something went wrong</h1>
          </IonText>
          {JSON.stringify(error, null, 2)}
        </IonContent>
      </>
    );

  return (
    <>
      <IonHeader>
        <IonToolbar color="hack">
          <IonTitle>Hacker News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {data.stories.map(story => (
          <Story story={story} key={story.id} />
        ))}
      </IonContent>
    </>
  );
};

export default Home;
