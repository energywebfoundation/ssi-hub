Our approach to prevent or at least maximum decrease chances for any CSRF attacks

Provide a Protection using Origin in headers and combining double check with JWT: 

1. Origin is a request header supported in most modern browsers, indicating from where the request originated, **which cannot be modified** <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin>
1. We will store the request Origin header in JWT token after login
1. And with every request our middleware will check if Origin in request headers is matching with origin stored in JTW token(**hacker cannot modify JWT as we are signing it with our secret in backend**)
1. For node requests we will check if origin in request headers is undefined. 
1. IF ORIGIN IS SAME OR UNDEFINED: everything is fine
1. IF NO: throw an exception as the origin could be from a hacker's website.
1. More info(check approach 2, **origin headers**): <https://security.stackexchange.com/questions/203890/how-to-implement-csrf-protection-with-a-cross-origin-request-cors/203910#203910>

* Middleware is realized in auth.module.ts
* The method checking the origin is realized in token.service.ts
* Tests can be found in token.service.spec.ts