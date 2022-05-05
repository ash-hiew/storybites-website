export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Recipe Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "chef",
      title: "Chef",
      type: "reference",
      to: { type: "chef" },
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "cloudinary.asset"
    },
    {
      name: "video",
      title: "Recipe Video Url",
      type: "url"
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "blockContent",
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "blockContent",
    },
  ],
};