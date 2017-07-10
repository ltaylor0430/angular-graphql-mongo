// techorder.js
import Part from './../parts/parts';
import Facet from './../facet/facet';
import TechData from './../techdata/techdata';
import Figure from './../figures/figures';
export const Techorder = `
type Query {
 techorders: [Techorder],
 techorder(id: ID!): Techorder,
 partList: [Part],
 part(uid:String!): Part,
 facets(q: String!):[Facet]
}

type Techorder implements TechData {
  _id: String
  uid: String
  name: String
  description: String
  publicationDate: String
  changeDate: String
  parts: [Part],
  facets: [Facet]

}`;
export default () => [Techorder, Part, Figure, Facet, TechData];
