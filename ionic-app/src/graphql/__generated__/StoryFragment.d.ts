/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StoryFragment
// ====================================================

export interface StoryFragment_kids {
  __typename: "Comment";
  id: string;
}

export interface StoryFragment {
  __typename: "Story";
  id: string;
  title: string;
  url: string | null;
  ogpImage: string | null;
  score: number;
  by: string;
  time: number;
  kids: StoryFragment_kids[];
}
