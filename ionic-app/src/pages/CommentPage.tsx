import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IonContent, IonList, IonItem, IonText } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AppHeader } from '../components/AppHeader';
import {
  Comments,
  CommentsVariables,
  Comments_comments,
} from '../graphql/__generated__/Comments';
import { STORY_FRAGMENT } from '../components/Story';

const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    by
    parent
    time
    text
    type
  }
`;

// Since GraphQL cannot create recursive query,
// define a query with 5 depth
const COMMENTS = gql`
  query Comments($parentId: ID!) {
    story(id: $parentId) {
      ...StoryFragment
    }
    comments(parentId: $parentId) {
      ...CommentFragment
      kids {
        ...CommentFragment
        kids {
          ...CommentFragment
          kids {
            ...CommentFragment
            kids {
              ...CommentFragment
            }
          }
        }
      }
    }
  }
  ${STORY_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

type CommentPageProps = RouteComponentProps<{
  id: string;
}>;

export const CommentPage = (props: CommentPageProps) => {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery<Comments, CommentsVariables>(
    COMMENTS,
    {
      variables: {
        parentId: id,
      },
    },
  );

  if (error) {
    return (
      <>
        <AppHeader />
        <IonContent className="ion-padding">
          <code>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </code>
        </IonContent>
      </>
    );
  }

  if (loading || !data) {
    return null;
  }

  return (
    <>
      <AppHeader />
      <IonContent className="ion-padding" forceOverscroll>
        <IonText>
          <h1>{data.story!.title}</h1>
        </IonText>
        <IonList>
          {data.comments!.map(c => (
            <Comment comment={c} key={c.id} />
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

const Comment = ({ comment }: { comment: Comments_comments }) => {
  return (
    <>
      <IonItem>
        <div
          dangerouslySetInnerHTML={{
            __html: comment.text,
          }}
        />
      </IonItem>
      {comment.kids && comment.kids.length > 0 ? (
        <IonItem>
          <IonList>
            {comment.kids.map(k => (
              <Comment comment={k as any} key={k.id} />
            ))}
          </IonList>
        </IonItem>
      ) : null}
    </>
  );
};
