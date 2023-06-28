import { gql } from 'apollo-server';
import { StateTypeDefs } from '@ferlab/arranger-schema';

export default async () => gql`
  ${StateTypeDefs.AggsStateTypeDefs}

  type Query {
    aggsState(projectId: String!, graphqlField: String!): AggsState
  }

  type Mutation {
    saveAggsState(projectId: String!, graphqlField: String!, state: [AggStateInput]!): AggsState
  }
`;
