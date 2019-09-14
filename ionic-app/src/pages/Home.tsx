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
import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Stories, StoriesVariables } from '../graphql/__generated__/Stories';
import { STORY_FRAGMENT, Story } from '../components/Story';
import { LazyLoader } from '../components/LazyLoader';

const limit = 20;

const STORIES = gql`
  query Stories($limit: Int, $offset: Int) {
    stories(limit: $limit, offset: $offset) @connection(key: "stories") {
      ...StoryFragment
    }
  }
  ${STORY_FRAGMENT}
`;

let offset = 0;

const Home = () => {
  const { loading, error, data, refetch, fetchMore } = useQuery<
    Stories,
    StoriesVariables
  >(STORIES, {
    variables: {
      limit,
      offset,
    },
  });

  const onRefresh = (ev: CustomEvent<RefresherEventDetail>) => {
    refetch().then(() => {
      ev.detail.complete();
    });
  };

  const loadNextPage = useCallback(() => {
    offset = offset + limit;
    fetchMore({
      variables: {
        offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          stories: [...prev.stories, ...fetchMoreResult.stories],
        };
      },
    });
  }, [fetchMore]);

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
        <IonGrid style={{ paddingBottom: '24px' }}>
          <IonRow>
            <IonCol sizeMd="8" sizeSm="12" offsetMd="2" offsetSm="0">
              {data.stories.map(story => (
                <Story story={story} key={story.id} />
              ))}
              <LazyLoader load={loadNextPage} />
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
