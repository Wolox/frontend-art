import { create, NETWORK_ERROR } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';
import Config from 'react-native-config';
import { Dispatch } from 'react';

const snakeCaseSerializer = new SnakecaseSerializer();
const camelCaseSerializer = new CamelcaseSerializer();

const baseURL = Config.API_BASE_URL || 'http://wolox.com';

const api = create({
  baseURL,
  timeout: 5000
});

export const apiSetup = (_: Dispatch<any>) => {
  if (baseURL === 'http://wolox.com') {
    console.warn('API baseURL has not been properly initialized');
  }
  api.addResponseTransform(response => {
    if (response.data) response.data = camelCaseSerializer.serialize(response.data);
  });
  api.addRequestTransform(request => {
    if (request.data) request.data = snakeCaseSerializer.serialize(request.data);
    if (request.params) request.params = snakeCaseSerializer.serialize(request.params);
  });
  api.addMonitor(response => {
    if (response.status === 401) {
      console.warn('Unhandled session expiration');
    }
  });
  api.addMonitor(response => {
    if (response.problem === NETWORK_ERROR) {
      console.warn('Unhandled request without connection');
    }
  });
};

export default api;
