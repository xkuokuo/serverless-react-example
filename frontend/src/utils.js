/**
 * Cookie utils
 */
function setCookie(key, val, expiresAt) {
  var cookieStr = '';
  if (!expiresAt) {
    var expireTime = (new Date())
    expireTime.setYear(2099)
    expiresAt = expireTime.toUTCString();
  }
  cookieStr = key + '=' + val + ';' + ' expires=' + expiresAt + ';'
  document.cookie = cookieStr;
}

function getCookies() {
  var cookies = {};
  document.cookie.split(';')
    .map((e) => e.trim())
    .forEach((e) => {
      var keyValPair = e.split('=')
      cookies[keyValPair[0]] = keyValPair[1]
    });
  return cookies;
}

function getUID() {
  var cookies = getCookies();
  if (!cookies['uid']) {
    var uid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    setCookie('uid', uid);
    return uid;
  }
  return cookies['uid'];
}

export { getUID }
