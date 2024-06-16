export default {
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    {
      name: "title",
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
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      options: {
        //Closes menu after tag selected (defaults to true)
        closeMenuOnSelect: true,
        includeFromRelated: 'Tags'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Today'
      }
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
      type: "cloudinary.asset",
      description: "This asset is served from Cloudinary",
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
      name: "shortDescription",
      title: "Short Description",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
  ],
};