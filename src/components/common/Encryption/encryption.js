
import CryptoJS from 'crypto-js';
import environment from '../../../environment';
const SECRET_KEY = environment?.secretKey

export const encryptId = (id) => {
  const processedId = id;
  return CryptoJS.AES.encrypt(processedId, SECRET_KEY).toString().replace(/\//g, '_SLASH');
};

export const decryptId = (encryptedId) => {
  if (encryptedId) {
    const processedEncryptedId = encryptedId.replace(/_SLASH/g, '/');
    const bytes = CryptoJS.AES.decrypt(processedEncryptedId, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8).replace(/_/g, '/');
  }
};
