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

export default {
  isUndef,
  isEmpty,
  isEmail,
};
