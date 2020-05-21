const LocalStorageService = (() => {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  /* set access token */
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.access_token);
    localStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
  /* get access token */
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  /* get refresh token */
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  /* clear token */
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  /* set api url */
  function setApiUrl(url) {
    localStorage.setItem("api_url", url);
  }

  /* get api url */
  function getApiUrl() {
    return localStorage.getItem("api_url");
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    setApiUrl,
    getApiUrl,
  };
})();
export default LocalStorageService;
