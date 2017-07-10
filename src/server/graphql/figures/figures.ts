// parts.js
import Techorder from './../techorder/techorder';
import TechData from './../techdata/techdata';
import Facet from './../facet/facet';
const Figure = `

type Figure implements TechData {
  _id: String!
  uid: String
  name: String
  figureNumber: String
  description: String
  whereused: Techorder
  facets: [Facet]

}`;
export default () => [Figure, Techorder, TechData];
