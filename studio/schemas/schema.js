// Document types
import recipe from './documents/recipe'
import story from './documents/story'
import chef from './documents/chef'
import category from './documents/category'

// Object types
import blockContent from './objects/blockContent'

// Then we give our schema to the builder and provide the result to Sanity
export default [

    recipe,
    story,
    chef,
    category,
    blockContent
]
