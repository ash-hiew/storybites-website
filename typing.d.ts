import { Url } from "url";

export interface Story {
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
  description: object[];
};

export interface Recipe {
  instructions: object[];
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