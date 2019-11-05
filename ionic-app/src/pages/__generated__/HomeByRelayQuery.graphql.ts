/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type HomeByRelayQueryVariables = {};
export type HomeByRelayQueryResponse = {
    readonly stories: ReadonlyArray<{
        readonly id: string;
        readonly title: string;
        readonly url: string | null;
        readonly ogpImage: string | null;
        readonly score: number;
        readonly by: string;
        readonly time: number;
        readonly kids: ReadonlyArray<{
            readonly id: string;
        }>;
    }>;
};
export type HomeByRelayQuery = {
    readonly response: HomeByRelayQueryResponse;
    readonly variables: HomeByRelayQueryVariables;
};



/*
query HomeByRelayQuery {
  stories(limit: 20, offset: 0) {
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "stories",
    "storageKey": "stories(limit:20,offset:0)",
    "args": [
      {
        "kind": "Literal",
        "name": "limit",
        "value": 20
      },
      {
        "kind": "Literal",
        "name": "offset",
        "value": 0
      }
    ],
    "concreteType": "Story",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "url",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "ogpImage",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "score",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "by",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "time",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "kids",
        "storageKey": null,
        "args": null,
        "concreteType": "Comment",
        "plural": true,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "HomeByRelayQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeByRelayQuery",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "HomeByRelayQuery",
    "id": null,
    "text": "query HomeByRelayQuery {\n  stories(limit: 20, offset: 0) {\n    id\n    title\n    url\n    ogpImage\n    score\n    by\n    time\n    kids {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c4352ba770213a27ab7658e18a4ea811';
export default node;
