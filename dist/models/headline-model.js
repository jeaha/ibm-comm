"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var languageType;
(function (languageType) {
    languageType["english"] = "English";
    languageType["spanish"] = "Spanish";
    languageType["chinese"] = "Chinese";
    languageType["french"] = "French";
})(languageType = exports.languageType || (exports.languageType = {}));
var categoryType;
(function (categoryType) {
    categoryType["politics"] = "politics";
    categoryType["sports"] = "sports";
    categoryType["finance"] = "finance";
})(categoryType = exports.categoryType || (exports.categoryType = {}));
class Headline {
    constructor(inAttributes) {
        this.headline = inAttributes;
    }
}
exports.Headline = Headline;
