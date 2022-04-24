// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import recipe from './documents/recipe'
import story from './documents/story'
import chef from './documents/chef'
import category from './documents/category'

// Object types
import blockContent from './objects/blockContent'
//import breaks from './objects/breaks'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    recipe,
    story,
    chef,
    category,
    blockContent,
    //breaks
  ]),
})
