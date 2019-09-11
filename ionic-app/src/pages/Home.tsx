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

const query = `{
  stories(limit: 10) {
    id
    title
    url
  }
}`;

const Home = () => {
  const [count, setCount] = React.useState(0);
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    fetch('http://localhost:8080/query', {
      body: JSON.stringify({ query }),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setResult(JSON.stringify(res, null, 2)));
  }, []);

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
            <IonLabel>{result}</IonLabel>
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
