export type { SwaRequestOptions } from "./request";
export { request, fnFormatCollection } from "./request";
import type { SwaRequestOptions } from "./request";

export interface SwaServerOptions {
    basePath?: string;
}

export type SwaApiParamType =
    | number
    | string
    | boolean
    | Blob
    | undefined
    | null;

export type SwaApiParam =
    | SwaApiParamType
    | SwaApiParamType[]
    | { [key: string]: SwaApiParam };

export interface SwaRequest {
    headers?: { [key: string]: SwaApiParam };
    queries?: { [key: string]: SwaApiParam };
    body?: any;
    form?: { [key: string]: SwaApiParam };
    contentType?: string;
    auth?: SwaAuthInfo;
}

export type SwaAuthInfo =
    | {
          type: "ApiKeyInHeader" | "ApiKeyInQuery";
          keyName?: string;
      }
    | {
          type: "AuthBasic";
      }
    | {
          type: "Bearer";
          bearer?: {
              name: string;
              scopes?: string[];
          };
      };
