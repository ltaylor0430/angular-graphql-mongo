// facet.js
const Facet = `
type Facet {
  _id:String!
  totalCount: Int!
  distinctCount: Int!

}`;
export default () => [Facet];
