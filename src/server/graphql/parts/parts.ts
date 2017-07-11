// parts.js
import Techorder from './../techorder/techorder';
import TechData from './../techdata/techdata';
const Part = `

type Part implements TechData {
  _id: String!
  uid: String
  name: String
  cage: String
  nsn: String
  ancestorIds: [String]
  referenceId: String
  description: String
  partindicies: String
  whereused: [PartsUnion]
  facets: [Facet]
}

union PartsUnion =  Techorder | Figure
`;
export default () => [Part, Techorder, TechData];
