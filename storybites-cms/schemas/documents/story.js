export default {
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Story Title",
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
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "category" },
    },
    {
      name: 'chefs',
      title: 'Chefs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{
            type: 'chef'
          }],
        }
      ]
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "video",
      title: "Story Video Url",
      type: "url"
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
  ],
};