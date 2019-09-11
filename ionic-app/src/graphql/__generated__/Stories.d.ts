/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Stories
// ====================================================

export interface Stories_stories {
  __typename: "Story";
  id: number;
  title: string;
  url: string;
}

export interface Stories {
  stories: Stories_stories[];
}

export interface StoriesVariables {
  limit?: number | null;
}
