import React, { Suspense } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from '@ionic/react';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Story } from '../components/Story';
import { HomeByRelayQuery } from './__generated__/HomeByRelayQuery.graphql';
import { HackerHeader } from './Home';

const query = graphql`
  query HomeByRelayQuery {
    stories(limit: 20, offset: 0) {
      id
      title
      url
      ogpImage
      score
      by
      time
      kids {
        id
      }
    }
  }
`;

const HomeContent = () => {
  const data = useLazyLoadQuery<HomeByRelayQuery>(query, {});

  return (
    <IonContent className="ion-padding">
      <IonGrid style={{ paddingBottom: '24px' }}>
        <IonRow>
          <IonCol sizeMd="8" sizeSm="12" offsetMd="2" offsetSm="0">
            {data.stories.map((story, index) => (
              <Story story={story as any} key={`${index}-${story.id}`} />
            ))}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

const Home = () => {
  return (
    <>
      <HackerHeader />
      <Suspense
        fallback={<IonProgressBar type="indeterminate"></IonProgressBar>}
      >
        <HomeContent />
      </Suspense>
    </>
  );
};

export default Home;
