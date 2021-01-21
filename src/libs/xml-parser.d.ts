export interface Declaration {
  attributes: Attributes;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface Attributes {
  [key: string]: string;
}

export interface Tag {
  name: string;
  attributes: Attributes;
  children: Array<Tag>;
  content: string;
}

export interface Document {
  declaration?: Declaration;
  root: Tag;
}

const parse: (str: string) => Document;

export default parse;
