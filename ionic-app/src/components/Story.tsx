import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import React from 'react';
import gql from 'graphql-tag';
import { fromUnixTime, differenceInHours } from 'date-fns';
import { StoryFragment } from '../graphql/__generated__/StoryFragment';

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
      <IonCard {...getCardAttribute(story)}>
        {story.ogpImage ? (
          <img src={story.ogpImage} alt={story.title}></img>
        ) : null}
        <IonCardHeader>
          <IonCardTitle>{story.title}</IonCardTitle>
          {getHost(story.url)}
        </IonCardHeader>

        <IonCardContent>
          <IonCardSubtitle>{storyDetail(story)}</IonCardSubtitle>
        </IonCardContent>
      </IonCard>
    </>
  );
};

function getCardAttribute(story: StoryFragment) {
  // href attribute doesn't work correctly due to bug
  // https://github.com/ionic-team/ionic/issues/19241
  return story.url ? { onClick: () => window.open(story.url!, '_blank') } : {};
}

function getHost(url: string | null) {
  if (!url) {
    return null;
  }
  const u = new URL(url);
  return <IonCardSubtitle>{u.host}</IonCardSubtitle>;
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
