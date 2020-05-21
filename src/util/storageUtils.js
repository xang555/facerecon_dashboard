import AES from "crypto-js/aes";

import { secretKey } from "./../config";

const KEY = "_bike";

// export const loadState = () => {
//   const serializedState = localStorage.getItem(KEY);
//   if (serializedState === null) {
//     return undefined;
//   }
//   const bytes = AES.decrypt(serializedState.toString(), secretKey);
//   return JSON.parse(bytes.toString(Utf8));
// };

export const saveState = (state) => {
  const serializedState = AES.encrypt(JSON.stringify(state), secretKey);
  localStorage.setItem(KEY, serializedState);
};
