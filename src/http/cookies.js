const setCookie = (c_name, value, days) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  let expires = 'expires=' + exdate.toGMTString();
  document.cookie = `${c_name} = ${JSON.stringify(value)}; expires=${expires}`;
};

const getCookie = (c_name) => {
  let i,
    x,
    y,
    ARRcookies = document.cookie.split(';');
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');
    if (x === c_name) {
      return y;
    }
  }
};

const checkCookie = (c_name) => {
  let w = getCookie(c_name);
  if (w) {
    return w;
  } else {
    return 0;
  }
};

module.exports = { checkCookie, setCookie };
