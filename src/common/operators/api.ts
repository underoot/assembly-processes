import { Observable } from 'rxjs';

export interface IAPIRequest {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  pathname: string;
  body?: object;
  query?: { [key: string]: string };
  merge?: object;
}

export const apiRequest = <T>() => (observable: Observable<IAPIRequest>) =>
  new Observable<T>(observer => {
    const subscription = observable.subscribe({
      async next(request) {
        const { method, query = {}, body } = request;
        const searchParams = query ? `?${new URLSearchParams(query)}` : '';
        const requestBody = body ? JSON.stringify(body) : void 0;

        try {
          const result = await fetch(`${request.pathname}${searchParams}`, {
            method,
            body: requestBody,
            headers: {
              'Content-Type': 'application/json'
            }
          });

          observer.next((await result.json()) as T);
        } catch (err) {
          observer.error(err);
        }
      },

      error(err) {
        observer.error(err);
      },

      complete() {
        observer.complete();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  });
