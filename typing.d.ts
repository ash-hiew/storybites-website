declare module "gtag.js";

export interface Chef {
  _id: string;
  name: string;
  image: string;
  slug: {
    current: string;
  };
  bio: string;
  relatedStories: [Story];
  relatedRecipes: [Recipe];
  currentChef: Chef;
}

export interface Story {
  _id: string;
  title: string;
  chefs: Chef[];
  mainImage: string;
  slug: {
    current: string;
  };
  video: url;
  shortDescription: string;
  description: typedObject[];
  category: Category;
  tags: object[];
  date: Date;
  stories: [Story];
  currentStory: Story;
}

export interface Recipe {
  instructions: typedObject[];
  ingredients: typedObject[];
  shortDescription: string;
  description: typedObject[];
  _id: string;
  title: string;
  chef: Chef;
  mainImage: string;
  finalImage: string;
  slug: {
    current: string;
  };
  video: url;
  recipes: [Recipe];
  currentRecipe: Recipe;
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  stories: Story[];
  currentCategory: Category;
  categories: [Category];
  description: string;
}
