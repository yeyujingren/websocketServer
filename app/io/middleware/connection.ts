module.exports = () => {
  return async (ctx, next) => {
    ctx.socket.emit('res', 'connected!');
    await next();
  };
};
