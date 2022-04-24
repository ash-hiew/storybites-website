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
  bio: object[];
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
  category: {
    _id: string;
    title: string;
  }
};

export interface Recipe {
  instructions: object[];
  ingredients: object[];
  _id: string;
  name: string;
  chef: {
    name: string;
    image: string;
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