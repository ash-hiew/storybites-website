import { Url } from "url";

export interface Chef {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  bio: string;
}

export interface Story {
  _id: string;
  name: string;
  chefs: Chef[];
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  video: url;
  description: object[];
  category: Category;
};

export interface Recipe {
  instructions: object[];
  ingredients: object[];
  _id: string;
  name: string;
  chef: {
    name: string;
    image: string;
    bio: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  video: url;
};

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  stories: Story[];
};