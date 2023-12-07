import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import Toast from '../../components/Toast';
import { SwaHttpClientBase } from './SwaHttpClientImpl';
import type { ApiResultCallback, SwaRequestConfig } from './api-gen/request';

export interface SwaRequestOptions {
    headers?: Record<string, string | string[] | undefined>;
    queries?: Record<string, string | string[] | undefined>;
    showLoading?: boolean;
    businessCheck?: boolean;
}

export interface SwaError {
    apiCode?: string | number
    apiErrorTips?: string
    message?: string
}

export interface SwaResponse<T> {
    data: T
    isOk: boolean;
    message?: string;
    code?: string;
    response?: AxiosResponse<T>
    request: SwaRequestConfig;
}
export interface ServerConfig {
    baseUrl?: string
}

const NO_ACCESS = 403
export class HttpClient extends SwaHttpClientBase {
    axiosInstance: AxiosInstance;
    httpClientConfig?: ServerConfig;
    constructor(httpClientConfig?: ServerConfig) {
        super();
        this.httpClientConfig = httpClientConfig;
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_APP_BASE_API,
            timeout: 10000,
        });
    }

    request<T>(req: SwaRequestConfig, resultCallback: ApiResultCallback<T>): void {
        const { resolve, reject } = resultCallback;
        const path = this.getRequestUrl(req, this.httpClientConfig?.baseUrl);
        this.dispatchStart(req);
        const requestData = req.request.body ?? req.request.form ?? {};
        this.axiosInstance.request(
            {
                url: path,
                method: req.method as any,
                data: requestData,
                headers: req.request.headers as any,
                responseType: 'json'
            }
        ).then((resp: AxiosResponse) => {

            if (this.invalidResponseInject(reject, resp)) {
                return;
            }
            const { code } = resp.data;
            if (code !== '0000000000') {
                Toast(resp.data?.message || '请求出错')
            }

            const result = {
                data: resp.data,
                headers: resp.headers,
                request: req,
                isOk: this.isBusinessOK(resp.data),
                message: resp.statusText,
                code: resp.status,
            };
            this.dispatchResolve(resolve, result);
        }).catch((error) => {
            this.dispatchInject(reject, error);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private dispatchStart(req: SwaRequestConfig) {
        // show common loading ui if need
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private dispatchInject(inject: any, error: any, resp?: any, result?: SwaResponse<any>) {
        inject(error);
        this.dispatchFinally();
        if (error && error.response && error.response.status) {
            onBadHttpCode(error.response.status);
        }
        // show common error message ui if need
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private dispatchResolve(resolver: any, result: any, resp?: any) {
        resolver(result);
        this.dispatchFinally();
    }

    private dispatchFinally() {
        // dimiss common loading ui if have
    }

    private isBusinessOK(jsonBody: any): boolean {
        return jsonBody && (jsonBody.code === 0 || jsonBody.code === '0000000000');
    }

    private invalidResponseInject(inject: any, resp: AxiosResponse): boolean {
        if (resp.status !== 200) {
            inject(resp);
            return true;
        }
        return false;
    }

}

function onBadHttpCode(httpCode?: number) {
    if (!httpCode) {
        return;
    }
}
