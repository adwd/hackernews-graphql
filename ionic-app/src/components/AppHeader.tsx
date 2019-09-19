import React from 'react';
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { logoGithub } from 'ionicons/icons';

export const AppHeader = () => (
  <IonHeader>
    <IonToolbar color="hack">
      <IonTitle>Hacker News Clone</IonTitle>
      <IonButtons slot="end">
        <IonButton
          onClick={() => {
            window.open(
              'https://github.com/adwd/hackernews-graphql/',
              '_blank',
            );
          }}
        >
          <IonIcon slot="icon-only" icon={logoGithub} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);
