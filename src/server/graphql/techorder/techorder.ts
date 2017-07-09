// techorder.js
import Part from './../parts/parts';
import Facet from './../facet/facet';
import TechData from './../techdata/techdata';
export const Techorder = `
type Query {
 techorders: [Techorder],
 techorder(id: ID!): Techorder,
 parts: [Part],
 part(id:ID!): Part,
 facets(q: String!):[TechData]
}

type Techorder implements TechData {
  id:ID!
  name: String
  description: String
  publicationDate: String
  changeDate: String
  parts: [Part],
  facets: [Facet]

}`;
export default () => [Techorder, Part, Facet, TechData];
