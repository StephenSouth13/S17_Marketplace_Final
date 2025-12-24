//D:\Website\S17\S17_Marketplace_Final_\sanity\schemaTypes\index.ts
import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { brandType } from "./brandType";
import { blogType } from "./blogType";
import { blogCategoryType } from "./blogCategoryType";
import { authorType } from "./authorType";
import { addressType } from "./addressType";
import { serviceType } from "./serviceType";
import { serviceCategoryType } from "./serviceCategory";
import { contactPersonType } from "./contactPersonType";
import { contactSubmissionType } from "./contactSubmissionType";
import sellerPage from "./sellerPage"; // Import Default
import { sellerType } from "./sellerType"; // Import Named

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    blockContentType,
    productType,
    orderType,
    brandType,
    blogType,
    blogCategoryType,
    authorType,
    addressType,
    serviceType,
    serviceCategoryType,
    contactPersonType,
    contactSubmissionType,
    sellerPage,
    sellerType,
  ],
};
