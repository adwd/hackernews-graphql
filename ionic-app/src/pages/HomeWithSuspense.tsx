import React, { Suspense } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
} from '@ionic/react';
import useSWR from 'swr';
import { request } from 'graphql-request';

import { uri } from '../graphql/apollo';
import { Story } from '../components/Story';
import { Stories } from '../graphql/__generated__/Stories';
import { HackerHeader } from './Home';

const QUERY = `
query Stories {
  stories(limit: 20, offset: 0) {
    ...StoryFragment
  }
}
fragment StoryFragment on Story {
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
`;

class HomeWithSuspense extends React.Component<{}, { error: any }> {
  state = { error: null };
  static getDerivedStateFromError(error: any) {
    return { error };
  }

  render() {
    return (
      <>
        <HackerHeader />
        <Suspense
          fallback={<IonProgressBar type="indeterminate"></IonProgressBar>}
        >
          <HomeContent />
        </Suspense>
        {this.state.error ? (
          <pre>
            <code>{JSON.stringify(this.state.error, null, 2)}</code>
          </pre>
        ) : null}
      </>
    );
  }
}

const HomeContent = () => {
  const { data, error } = useSWR<Stories>(
    QUERY,
    (query: any) => request(uri, query),
    {
      suspense: true,
    },
  );

  if (error) {
    throw error;
  }

  return (
    <IonContent className="ion-padding">
      <IonGrid style={{ paddingBottom: '24px' }}>
        <IonRow>
          <IonCol sizeMd="8" sizeSm="12" offsetMd="2" offsetSm="0">
            {data!.stories.map((story, index) => (
              // Hacker News APIまわりの実装の都合でfetchMoreのときに
              // 同じStoryが含まれる事があることを考慮したkeyにする
              <Story story={story} key={`${index}-${story.id}`} />
            ))}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default HomeWithSuspense;
