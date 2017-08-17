export const parseAuthorizationHeader = (req) => {
  const header = req.get('Authorization');

  if (typeof header === 'undefined' || header === 'null') {
    return {};
  }

  const [, scheme, token] = (/(\w+) ([\w.-]+)/g).exec(header);

  return {
    scheme,
    token,
  };
};

// Not production-ready: this is a simple example for the tutorial
export const verifyToken = token => new Promise((resolve, reject) => {
  if (token !== 'authorized') {
    const error = new Error('UNAUTHORIZED');
    error.code = 401;
    reject(error);
  }
  resolve();
});
