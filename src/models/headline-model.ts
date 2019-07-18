/**
 * API definition of Headline
 * @swagger
 * definitions:
 *   Headline:
 *     type: object
 *     required:
 *       - title
 *       - abstract
 *       - language
 *       - date
 *       - author
 *       - category
 *     properties:
 *       title:
 *         type: string
 *       abstract:
 *         type: string
 *       language:
 *         type: string
 *       date:
 *         type: string
 *       author:
 *         type: string
 *       category:
 *         type: string
 *   Headlines:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Headline'
 */


export enum languageType {
  english = "English",
  spanish = "Spanish",
  chinese = "Chinese",
  french = "French"
}

export enum categoryType {
  politics = "politics",
  sports = "sports",
  finance = "finance"
}

export interface Attributes {
	title: string,
	abstract: string,
	language: string,
	date: string,  // MM/DD/YYYY
	author: string,
	category: string
}

export class Headline {
	public headline: Attributes;

  constructor (inAttributes: Attributes) {
    this.headline = inAttributes
  }
}
