import querystring from 'query-string'
import type { ApiResultCallback, SwaHttpClient, SwaRequestConfig } from './api-gen/request';

export abstract class SwaHttpClientBase implements SwaHttpClient {

    doRequest<T>(request: SwaRequestConfig, resultCallback: ApiResultCallback<T>): void {
        //check content type by form and multipart-form
        if (request.request.form) {
            //overide content type to form style
            const result = this.crateFormBody(request);
            request.request.contentType = result.contentType;
            request.request.form = result.form;
            request.request.body = null;
        }
        request.request.headers = this.getMergedHeaders(request);
        return this.request(request, resultCallback);
    }

    getRequestUrl(req: SwaRequestConfig, host?: string): string {
        let path = this.getMergedPath(req);
        if (host) {
            if (path.startsWith("/")) {
                path = path.slice(1)
            }
            if (host.endsWith("/")) {
                return host + path;
            }
            return host + "/" + path;
        }
        return path;
    }

    abstract request<T>(request: SwaRequestConfig, resultCallback: ApiResultCallback<T>): void;

    formatCollection(collection?: any[] | undefined, format?: string | undefined): string | undefined {
        if (collection) {
            return collection.join(",")
        }
        return;
    }

    private crateFormBody(request: SwaRequestConfig): { form: any, contentType: string } {
        const form = request.request.form ?? {};
        let result;
        let contentType = request.request.contentType;
        if (contentType == "multipart/form-data") {
            result = new FormData();
        } else {
            result = new URLSearchParams();
            contentType = "application/x-www-form-urlencoded";
        }
        if (form) {
            for (const k in form) {
                const value = form[k];
                if (value !== null && value !== undefined) {
                    result.append(k, value as any);
                }
            }
        }
        return {
            form: result,
            contentType: contentType
        };
    }


    private getMergedHeaders(config: SwaRequestConfig): Record<string, string | number> | undefined {
        const req = config.request;
        const reqOptions = config.options;
        let headers: Record<string, any> | undefined = req.headers ?? {};
        if (config.request.contentType) {
            headers["content-type"] = config.request.contentType;
        } else {
            if (config.request.form) {
                headers["content-type"] = "application/x-www-form-urlencoded"
            } else {
                headers["content-type"] = "application/json"
            }
        }
        if (reqOptions?.headers) {
            headers = Object.assign({}, headers, reqOptions.headers);
        }
        const out: Record<string, any> = {};
        for (const k in headers) {
            if (headers[k] !== null || headers[k] !== undefined) {
                out[k] = headers[k];
            }
        }
        return out;
    }

    private getMergedPath(config: SwaRequestConfig): string {
        const req = config.request;
        // let path = this.safeLinkPath(config.serverOptions?.basePath || "", config.url);
        let path = config.url;
        if (req.queries || config.options?.queries) {
            const urlInfo = this.parseUrlInfo(path);
            urlInfo.queryMap = Object.assign(
                {},
                urlInfo.queryMap || {},
                req.queries || {},
                config.options?.queries || {}
            );
            path = this.formatUrlQuery(urlInfo);
        }
        return path;
    }

    private parseUrlInfo(url: string): {
        pathWithoutQuery: string;
        queryMap?: querystring.ParsedQuery
    } {
        url = url || '';
        let path = url;
        if (url.indexOf("?") > -1) {
            path = url.split('?')[0];
            return {
                pathWithoutQuery: path,
                queryMap: querystring.parse(url)
            };
        } else {
            return {
                pathWithoutQuery: path,
            };
        }
    }

    private formatUrlQuery(urlInfo: {
        pathWithoutQuery: string;
        queryMap?: Record<string, any>;
    }): string {
        return urlInfo.pathWithoutQuery + "?" + querystring.stringify(urlInfo.queryMap || {}, { skipNull: true, skipEmptyString: true })
    }
}
