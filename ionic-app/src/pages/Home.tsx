import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/react';
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Stories, StoriesVariables } from '../graphql/__generated__/Stories';

const STORIES = gql`
  query Stories($limit: Int) {
    stories(limit: $limit) {
      id
      title
      url
    }
  }
`;

const Home = () => {
  const [count, setCount] = React.useState(0);
  const { loading, error, data } = useQuery<Stories, StoriesVariables>(
    STORIES,
    {
      variables: {
        limit: 2,
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
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonItem>
            <IonLabel>{JSON.stringify(data.stories, null, 2)}</IonLabel>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
            <IonIcon name="pin" slot="start" />
            <IonLabel>{count}</IonLabel>
            <IonButton
              fill="outline"
              slot="end"
              onClick={() => setCount(count + 1)}
            >
              Increment
            </IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags, within an
            ion-cardContent element.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonItem href="#" class="activated">
            <IonIcon name="wifi" slot="start" />
            <IonLabel>Card Link Item 1 .activated</IonLabel>
          </IonItem>

          <IonItem href="#">
            <IonIcon name="wine" slot="start" />
            <IonLabel>Card Link Item 2</IonLabel>
          </IonItem>

          <IonItem class="activated">
            <IonIcon name="warning" slot="start" />
            <IonLabel>Card Button Item 1 .activated</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon name="walk" slot="start" />
            <IonLabel>Card Button Item 2</IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </>
  );
};

export default Home;
