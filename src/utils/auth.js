const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "60s",
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    return tokenPayload;
  } catch (err) {
    console.log("verify Access token Error =>", err);
    return false;
  }
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "15d",
  });
  return token;
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
};
