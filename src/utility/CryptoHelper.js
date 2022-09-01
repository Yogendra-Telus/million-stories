import CryptoJS from 'crypto-js';
import AppConfig from '../config/AppConfig';

const encryptText = text => {
  const encodedText = CryptoJS.AES.encrypt(text, AppConfig.CryptoKey).toString();
  return encodeURIComponent(encodedText);
};

const decryptText = text => {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(text), AppConfig.CryptoKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export default { encryptText, decryptText };
