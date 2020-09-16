function isUndef(v) {
  return v === undefined || v === null;
}

function isEmpty(v) {
  return typeof v === 'string' ? v.trim() === '' : false;
}

export default {
  isUndef,
  isEmpty,
};
