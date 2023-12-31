/**
 * 美丽中国行网站统计 Api接口文档
 * 接口文档
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* eslint-disable */
import {
    request as __$,
    SwaRequestOptions as RequestOptions,
    fnFormatCollection,
} from "../http";

// @ts-ignore
const STRINGS_METHODS_POST = "POST";

// @ts-ignore
const STRINGS_MEDIA_TYPE_application_json = "application/json";

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {SwaApi}
 */
export namespace DefaultApi {
    const __$ssop = {
        basePath: "/",
    };

    /**
     *
     * @summary 点击提交
     * @param {CommitDTO} commitDTO commitDTO
     * @param {*} [options] Override http request option.
     */
    export function commit(commitDTO: CommitDTO, options?: RequestOptions) {
        return __$<Resultobject>(
            `/commit`,
            STRINGS_METHODS_POST,
            {
                body: commitDTO,
                contentType: STRINGS_MEDIA_TYPE_application_json,
            },
            options,
            __$ssop,
        );
    }
    /**
     *
     * @summary 点击预约
     * @param {ClickDTO} clickDTO clickDTO
     * @param {*} [options] Override http request option.
     */
    export function regist(clickDTO: ClickDTO, options?: RequestOptions) {
        return __$<Resultobject>(
            `/regist`,
            STRINGS_METHODS_POST,
            {
                body: clickDTO,
                contentType: STRINGS_MEDIA_TYPE_application_json,
            },
            options,
            __$ssop,
        );
    }
}

/** 用户点击信息 */
export interface ClickDTO {
    /** 渠道 */
    channel: string;
}

/** 用户提交信息 */
export interface CommitDTO {
    /** 渠道 */
    channel: string;
    /** 电子邮箱 */
    email?: string;
    /** 姓名 */
    name: string;
    /** 护照号码 */
    passportNo: string;
}

export interface Resultobject {
    code?: string;

    data?: any;

    message?: string;

    subCode?: string;

    subMsg?: string;

    success?: boolean;
}
