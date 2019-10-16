import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonIcon,
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
          <img {...cardURL(story)} src={story.ogpImage} alt={story.title}></img>
        ) : null}
        <IonCardHeader {...cardURL(story)}>
          <IonCardTitle>{story.title}</IonCardTitle>
          {getHost(story.url)}
        </IonCardHeader>
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

function cardURL(story: StoryFragment) {
  // href attribute doesn't work correctly due to bug
  // https://github.com/ionic-team/ionic/issues/19241
  return story.url ? { onClick: () => openUrl(story.url!, false) } : {};
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

const isIOS = (function() {
  try {
    console.log(SafariViewController);
    return true;
  } catch (e) {
    return false;
  }
})();

// https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller#4-usage
function openUrl(url: string, readerMode: any) {
  if (isIOS) {
    SafariViewController.isAvailable(function(available: boolean) {
      if (available) {
        SafariViewController.show(
          {
            url: url,
            hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
            animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
            transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
            enterReaderModeIfAvailable: readerMode, // default false
            tintColor: '#ff6600', // default is ios blue
            barColor: '#ff6600', // on iOS 10+ you can change the background color as well
            controlTintColor: '#ffffff', // on iOS 10+ you can override the default tintColor
          },
          // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
          function(result: any) {
            if (result.event === 'opened') {
              console.log('opened');
            } else if (result.event === 'loaded') {
              console.log('loaded');
            } else if (result.event === 'closed') {
              console.log('closed');
            }
          },
          function(msg: string) {
            console.log('KO: ' + msg);
          },
        );
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        window.open(url, '_blank', 'location=yes');
      }
    });
  } else {
    window.open(url, '_blank');
  }
}

// function dismissSafari() {
//   SafariViewController.hide();
// }
