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
  IonGrid,
  IonRow,
  IonCol,
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
        limit: 20,
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
        <HackerHeader />
        <IonProgressBar type="indeterminate"></IonProgressBar>
      </>
    );
  if (error || !data)
    return (
      <>
        <HackerHeader />
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
      <HackerHeader />
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="8" sizeSm="12" offsetMd="2" offsetSm="0">
              {data.stories.map(story => (
                <Story story={story} key={story.id} />
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
};

const HackerHeader = () => (
  <IonHeader>
    <IonToolbar color="hack">
      <IonTitle>Hacker News Clone</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Home;
