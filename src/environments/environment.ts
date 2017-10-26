// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  base_backend_url: 'http://localhost:8000/api',
  production: false,
  debug_router: false,

  vaderlab_oauth_login_url: 'https://www.vaderlab.com/en/oauth/v2/auth',
  vaderlab_oauth_redirect_uri: 'http://127.0.0.1:4200/',
  vaderlab_oauth_client_id: '1_42wvpowlyd4w0oookcw800kc4oo8gscsgw0wokk4oocssk4o40',
  vaderlab_oauth_client_issuer: 'https://www.vaderlab.com/ru/api/user',
  vaderlab_oauth_scope: '',
  vaderlab_oauth_logout_url: 'https://www.vaderlab.com/en/logout',

  vaderlab_cargo_jwt_auth_url: 'http://127.0.0.1:8000/api/jwt/create_jwt_token',

  maps_google_api_key: 'AIzaSyBDPbGjIEEblXPDVpOObMBjwJsp5AG7r64',
  maps_yandex_api_key: '',
  maps_mapquest_api_key: '',
  maps_bing_api_key: '',

};
