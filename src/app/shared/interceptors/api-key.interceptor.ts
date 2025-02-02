import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // const apiKey = environment.apiKey;
  // const modifiedReq = req.clone({
  //   setHeaders: {
  //     "X-API-KEY": apiKey
  //   }
  // });
  // return next(modifiedReq);
  console.log(req.url);
  console.log(req.headers);
  console.log(environment.apiKey);
  return next(req);
};
