/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Comments
// ====================================================

export interface Comments_comments_kids_kids_kids_kids {
  __typename: "Comment";
  id: number;
  by: string;
  parent: number;
  time: number;
  text: string;
  type: string;
}

export interface Comments_comments_kids_kids_kids {
  __typename: "Comment";
  id: number;
  by: string;
  parent: number;
  time: number;
  text: string;
  type: string;
  kids: Comments_comments_kids_kids_kids_kids[];
}

export interface Comments_comments_kids_kids {
  __typename: "Comment";
  id: number;
  by: string;
  parent: number;
  time: number;
  text: string;
  type: string;
  kids: Comments_comments_kids_kids_kids[];
}

export interface Comments_comments_kids {
  __typename: "Comment";
  id: number;
  by: string;
  parent: number;
  time: number;
  text: string;
  type: string;
  kids: Comments_comments_kids_kids[];
}

export interface Comments_comments {
  __typename: "Comment";
  id: number;
  by: string;
  parent: number;
  time: number;
  text: string;
  type: string;
  kids: Comments_comments_kids[];
}

export interface Comments {
  comments: Comments_comments[] | null;
}

export interface CommentsVariables {
  parentId: string;
}
