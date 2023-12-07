import { HttpClient } from './request';
export { DefaultApi as api } from './api-gen/default/api';
import { SwaClientManage } from './api-gen/request';

const httpClient = new HttpClient();
SwaClientManage.setHttpClient(httpClient);

