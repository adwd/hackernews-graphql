import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonText,
} from '@ionic/react';
import React from 'react';
import gql from 'graphql-tag';
import { fromUnixTime, differenceInHours } from 'date-fns';
import { StoryFragment } from '../graphql/__generated__/StoryFragment';
import { open } from 'ionicons/icons';

export const STORY_FRAGMENT = gql`
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

export const Story = ({ story }: { story: StoryFragment }) => {
  return (
    <>
      <IonCard>
        {story.ogpImage ? (
          <a href={`/${story.id}`}>
            <img src={story.ogpImage} alt={story.title}></img>
          </a>
        ) : null}
        <a href={`/${story.id}`} style={{ textDecoration: 'none' }}>
          <IonCardHeader style={{ padding: '0 16px' }}>
            <IonCardTitle>
              <IonText>
                <h3>{story.title}</h3>
              </IonText>
            </IonCardTitle>
            <IonCardSubtitle>{getHost(story.url)}</IonCardSubtitle>
          </IonCardHeader>
        </a>
        <IonItem
          href="#"
          onClick={() =>
            window.open(
              `https://news.ycombinator.com/item?id=${story.id}`,
              '_blank',
            )
          }
        >
          <IonCardSubtitle>{storyDetail(story)}</IonCardSubtitle>
          <IonIcon icon={open} slot="end" />
        </IonItem>
      </IonCard>
    </>
  );
};

function getHost(url: string | null) {
  if (!url) {
    return null;
  }
  const u = new URL(url);
  return u.host;
}

function storyDetail(story: StoryFragment): string {
  return `${story.score} points by ${story.by} ${ago(story.time)} | ${
    story.kids.length
  } comments`;
}

function ago(time: number): string {
  const d = fromUnixTime(time);
  const diff = differenceInHours(Date.now(), d);
  return `${diff} hours ago`;
}
