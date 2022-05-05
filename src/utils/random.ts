export interface GeneratePasswordArgs {
  minLength: number;
  maxLength: number;
  wishlist?: string;
}

// https://stackoverflow.com/a/51540480
export const generatePassword = ({
  minLength,
  maxLength,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
}: GeneratePasswordArgs) => {
  const crypto = self.crypto;
  const length =
    minLength +
    (crypto.getRandomValues(new Uint8Array(1))[0] % (maxLength - minLength));
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');
};
