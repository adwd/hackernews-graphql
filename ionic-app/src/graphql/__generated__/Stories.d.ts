/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Stories
// ====================================================

export interface Stories_stories_kids {
  __typename: "Comment";
  id: string;
}

export interface Stories_stories {
  __typename: "Story";
  id: string;
  title: string;
  url: string | null;
  ogpImage: string | null;
  score: number;
  by: string;
  time: number;
  kids: Stories_stories_kids[];
}

export interface Stories {
  stories: Stories_stories[];
}

export interface StoriesVariables {
  limit?: number | null;
  offset?: number | null;
}
