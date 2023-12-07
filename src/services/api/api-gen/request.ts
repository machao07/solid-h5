export type { SwaError, SwaRequestOptions, SwaResponse } from "../request";
import type { SwaError, SwaRequestOptions, SwaResponse } from "../request";

import type { SwaRequest, SwaServerOptions } from "./http";
export type SWA_COLLECTION_FORMAT_TYPE =
    | "csv"
    | "ssv"
    | "tsv"
    | "pipes"
    | string;

export const SWA_COLLECTION_FORMATS: { [key: string]: string } = {
    csv: ",",
    ssv: " ",
    tsv: "	",
    pipes: "|",
};

export interface SwaPromise<D> {
    asPromise: () => Promise<SwaResponse<D>>;
    then: (
        onfulfilled?: (data: D, resp: SwaResponse<D>) => void,
    ) => SwaPromise<D>;
    catch: (onrejected?: (reason: SwaError) => void) => SwaPromise<D>;
    finally: (onfinally?: () => void) => SwaPromise<D>;
}

type TaskRunner<D> = (
    resolve: (resp: SwaResponse<D>) => void,
    reject: (reason: SwaError) => void,
) => void;
export class SwaPromiseTask<D> implements SwaPromise<D> {
    private onfulfilled?: (data: D, resp: SwaResponse<D>) => void;
    private onrejected?: (reason: any) => void;
    private onfinally?: () => void;
    private outPromise?: {
        resolve: (resp: SwaResponse<D>) => void;
        reject: (reason: any) => void;
    };
    private resp?: SwaResponse<D>;
    private reason?: any;
    private isDone: boolean = false;
    private hasError?: boolean;

    constructor(executor: TaskRunner<D>) {
        executor(
            (resp) => {
                this.resp = resp;
                this.isDone = true;
                this.checkResult();
            },
            (reason) => {
                this.reason = reason;
                this.hasError = true;
                this.isDone = true;
                this.checkResult();
            },
        );
    }

    asPromise(): Promise<SwaResponse<D>> {
        const result = new Promise(
            (
                resolve: (resp: SwaResponse<D>) => void,
                reject: (reason: any) => void,
            ) => {
                this.outPromise = {
                    resolve: resolve,
                    reject: reject,
                };
            },
        );
        this.checkResult();
        return result;
    }

    then(onfulfilled?: (data: D, resp: SwaResponse<D>) => void): SwaPromise<D> {
        this.onfulfilled = onfulfilled;
        this.checkResult();
        return this;
    }

    catch(onrejected?: (reason: SwaError) => void): SwaPromise<D> {
        this.onrejected = onrejected;
        this.checkResult();
        return this;
    }

    finally(onfinally?: () => void): SwaPromise<D> {
        this.onfinally = onfinally;
        this.checkResult();
        return this;
    }

    private checkResult() {
        if (!this.isDone) {
            return;
        }
        if (this.hasError) {
            this.dispatchRejected(this.reason);
        } else {
            this.dispatchThen(this.resp!);
        }
        this.dispatchFinally();
    }

    private dispatchRejected(reason: SwaError) {
        if (this.outPromise) {
            this.outPromise.reject(reason);
        }
        if (this.onrejected) {
            this.onrejected(this.reason);
        }
    }

    private dispatchFinally() {
        if (this.onfinally) {
            this.onfinally();
        }
    }

    private dispatchThen(resp: SwaResponse<D>) {
        if (this.onfulfilled) {
            this.onfulfilled(resp.data, resp);
        }
        if (this.outPromise) {
            this.outPromise.resolve(resp);
        }
    }
}

export function request<D>(
    url: string,
    method: string,
    request: SwaRequest,
    options?: SwaRequestOptions,
    serverOptions?: SwaServerOptions,
): SwaPromise<D> {
    return new SwaPromiseTask<D>((resolve, reject) => {
        config.client!.doRequest<D>(
            {
                url: url,
                method: method,
                request: request,
                options: options,
                serverOptions: serverOptions,
            },
            {
                resolve: resolve,
                reject: reject,
            },
        );
    });
}

const config: {
    client?: SwaHttpClient;
} = {};

export namespace SwaClientManage {
    export function setHttpClient(httpClient: SwaHttpClient) {
        config.client = httpClient;
    }
}

export function fnFormatCollection(collection?: any[], format?: string) {
    return config.client!.formatCollection(collection, format);
}

export type ApiResultCallback<T> = {
    resolve: (resp: SwaResponse<T>) => void;
    reject: (reason: SwaError) => void;
};

export interface SwaRequestConfig {
    url: string;
    method: string;
    request: SwaRequest;
    options?: SwaRequestOptions;
    serverOptions?: SwaServerOptions;
}

export abstract class SwaHttpClient {
    abstract doRequest<T>(
        request: SwaRequestConfig,
        resultCallback: ApiResultCallback<T>,
    ): void;

    formatCollection(collection?: any[], format?: SWA_COLLECTION_FORMAT_TYPE) {
        if (collection) {
            const linker = SWA_COLLECTION_FORMATS[format ?? ""] ?? ",";
            return collection.join(linker);
        }
        return undefined;
    }
}
