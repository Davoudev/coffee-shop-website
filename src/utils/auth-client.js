// src/utils/auth-client.js
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const hashPassword = async (password) => await hash(password, 12);
const verifyPassword = async (password, hashed) =>
  await compare(password, hashed);

const generateAccessToken = (data) =>
  sign({ ...data }, process.env.AccessTokenSecretKey, { expiresIn: "60d" });

const generateRefreshToken = (data) =>
  sign({ ...data }, process.env.RefreshTokenSecretKey, { expiresIn: "15d" });

const validateEmail = (email) =>
  /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(email);
const validatePhone = (phone) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(phone);
const validatePassword = (password) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
    password
  );

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
