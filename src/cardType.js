import visa from './styles/assets/visa.png';
import mastercard from './styles/assets/mastercard.png';
import amex from './styles/assets/amex.png';
import discover from './styles/assets/discover.png';
import diners from './styles/assets/diners.png';
import jcb from './styles/assets/jcb.png';
import mir from './styles/assets/mir.png';

export const cardsInfo = [
  { name: 'visa', prefix: /^4/, lengths: [13, 16, 19], img: visa },
  { name: 'mastercard', prefix: /^5[1-5]/, lengths: [16], img: mastercard },
  { name: 'amex', prefix: /^3[47]/, lengths: [15], img: amex },
  { name: 'discover', prefix: /^6(?:011|5)/, lengths: [16, 19], img: discover },
  { name: 'diners', prefix: /^3(?:0[0-5]|[68])/, lengths: [14], img: diners },
  { name: 'jcb', prefix: /^(?:2131|1800|35)/, lengths: [16, 17, 18, 19], img: jcb },
  { name: 'mir', prefix: /^220[0-4]/, lengths: [16, 17, 18, 19], img: mir },
];

export function getCardInfo(cardNumber) {
  if (!cardNumber) return undefined;
  return cardsInfo.find((card) => card.prefix.test(cardNumber));
}