function isUndef(v) {
  return v === undefined || v === null;
}

function isEmpty(v) {
  return typeof v === 'string' ? v.trim() === '' : false;
}

function isEmail(v:string) {
  const emailExp = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
  return emailExp.test(v);
}

function isFormatPwd(v: string) {
  const pwdExp = /^[A-Za-z0-9_\.]{6,16}$/;
  return pwdExp.test(v);
}

function hasUndef(list) {
  let flag = false;
  Object.keys(list).forEach(item => {
    if (isUndef(list[item])) flag = true;
  });
  return flag;
}

function hasEmpty(list) {
  let flag = false;
  Object.keys(list).forEach(item => {
    if (isEmpty(list[item])) flag = true;
  });
  return flag;
}

function formateDate(fmt: string, date?: Date) {
  date = date ? new Date(date) : new Date();
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

export default {
  isUndef,
  isEmpty,
  isEmail,
  isFormatPwd,
  hasUndef,
  hasEmpty,
  formateDate,
};
