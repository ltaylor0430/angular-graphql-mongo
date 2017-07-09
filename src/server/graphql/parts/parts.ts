// parts.js
import Techorder from './../techorder/techorder';
import TechData from './../techdata/techdata';
const Part = `
type Part implements TechData {
  id:ID!
  name: String
  description: String
  partindicies: String
  whereused: [Techorder]
  facets: [Facet]

}`;
export default () => [Part, Techorder, TechData];
