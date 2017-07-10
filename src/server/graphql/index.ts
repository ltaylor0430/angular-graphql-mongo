import techorder from './techorder/techorder';
import * as _ from 'lodash';
import hello from './hello/hello';
import facet from './facet/facet';
import part from './parts/parts';
import { Resolvers } from './resolvers';
/*If you’re exporting array of schema strings and there are circular dependencies,
 the array can be wrapped in a function.
 The makeExecutableSchema function will only include each type definition once,
 even if it is imported multiple times by different types,
 so you don’t have to worry about deduplicating the strings.
*/
const typeDefs = [hello, techorder];
const resolverObject = new Resolvers();
const resolver =  resolverObject.getResolverMap() ;
export default { typeDefs, resolver};
