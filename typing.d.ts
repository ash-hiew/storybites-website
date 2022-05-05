import { Target } from "framer-motion";
import { Url } from "url";

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
  description: object[];
  category: Category;
  tags: object[]; 
  date: Date;
  stories: [Story];
  currentStory: Story;
};

export interface Recipe {
  instructions: object[];
  ingredients: object[];
  shortDescription: string;
  description: object[];
  _id: string;
  title: string;
  chef: Chef;
  mainImage: string;
  slug: {
    current: string;
  };
  video: url;
  recipes: [Recipe];
  currentRecipe: Recipe;
};

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
};