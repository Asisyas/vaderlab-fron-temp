// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  base_backend_url: 'http://localhost:8000/api',
  production: false,
  debug_router: false,

  vaderlab_oauth_login_url: 'https://www.vaderlab.com/en/oauth/v2/auth',
  vaderlab_oauth_redirect_uri: 'http://localhost:4200/',
  vaderlab_oauth_client_id: '1_1x5ldfvs6jgg00c0kwcg4sks0ss0ck0okoc0c04s0scww4o4w4',
  vaderlab_oauth_client_issuer: 'https://www.vaderlab.com/api/user/current.json',
  vaderlab_oauth_scope: '',
  vaderlab_oauth_logout_url: '', //https://www.vaderlab.com/en/logout

  maps_google_api_key: 'AIzaSyBDPbGjIEEblXPDVpOObMBjwJsp5AG7r64',
  maps_yandex_api_key: '',
  maps_mapquest_api_key: '',
  maps_bing_api_key: '',
};
