import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (request, response, next) => {
  const bearerToken = request.headers['x-access-token'] || request.headers.authorization || request.body.token;
  const token = bearerToken && bearerToken.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json({
      status: 401,
      error: 'token is not provided!',
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    request.user = decoded.user;
    if (decoded) return next();
  } catch (error) {
    return response.status(401).json({
      status: 401,
      error: 'invalid token provided',
    });
  }
};

export default verifyToken;
