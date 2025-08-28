import { ratelimit } from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    // We put the "my-limit-key" because we want to limit the requests for all the users and we don't have an authentication system.
    const { success } = await ratelimit.limit('my-limit-key'); // this need an identifier to limit the requests, like if we want to limit the requests based on ip address then we can use req.ip as identifier like authentication or something else.
    if (!success) {
      return res
        .status(429)
        .json({ message: 'Too many requests, Please Try Again Later' });
    }
    next();
  } catch (error) {
    console.log('Rate Limiter Error', error);
    res.status(500).json({ message: 'Internal Server Error!' });
    next(error);
  }
};

export default rateLimiter;
