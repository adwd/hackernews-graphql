import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IonContent } from '@ionic/react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AppHeader } from '../components/AppHeader';
import { Comments, CommentsVariables } from '../graphql/__generated__/Comments';

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
  return (
    <>
      <AppHeader />
      <IonContent className="ion-padding">
        <span>{props.match.params.id}</span>
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      </IonContent>
    </>
  );
};
