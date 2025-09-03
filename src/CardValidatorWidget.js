import { isValidLuhn } from './luhn';
import { getCardInfo, cardsInfo } from './cardType';

export class CardValidatorWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  bindToDOM() {
    this.parentEl.innerHTML = `
      <div class="card-widget">
        <div class="cards">
          ${cardsInfo
            .map((card) => `<div class="card ${card.name}" style="background-image: url('${card.img}')"></div>`)
            .join('')}
        </div>
        <form class="validator-form">
          <input type="text" class="card-input" placeholder="Введите номер карты" />
          <button class="validate-button">Проверить</button>
        </form>
        <div class="message hidden"></div>
      </div>
    `;

    this.form = this.parentEl.querySelector('.validator-form');
    this.input = this.form.querySelector('.card-input');
    this.message = this.parentEl.querySelector('.message');
    this.cards = this.parentEl.querySelectorAll('.card');

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate();
    });

    this.input.addEventListener('input', () => {
      this.clearClasses();
    });
  }

validate() {
  const raw = this.input.value;
  const hasInvalidChars = /[^\d\s]/.test(raw);

  this.clearClasses();

  if (hasInvalidChars) {
    this.input.classList.add('invalid');
    this.message.textContent = 'Недопустимые символы';
    this.message.classList.remove('hidden');
    return;
  }

  const clean = raw.replace(/\s/g, '');
  const info = getCardInfo(clean);

  // проверка: существует ли карта с таким префиксом
  if (!info) {
    this.input.classList.add('invalid');
    this.message.textContent = 'Неизвестная платёжная система';
    this.message.classList.remove('hidden');
    return;
  }

  // проверка длины номера
  if (!info.lengths.includes(clean.length)) {
    this.input.classList.add('invalid');
    this.message.textContent = `Неверная длина для ${info.name.toUpperCase()}`;
    this.message.classList.remove('hidden');
    this.highlightCard(info.name);
    return;
  }

  // валидация по алгоритму Луна
  const isValid = isValidLuhn(clean);

  if (isValid) {
    this.input.classList.add('valid');
    this.message.textContent = 'Карта валидна';
  } else {
    this.input.classList.add('invalid');
    this.message.textContent = 'Карта невалидна';
  }

  this.message.classList.remove('hidden');
  this.highlightCard(info.name);
}

  clearClasses() {
    this.input.classList.remove('valid', 'invalid');
    this.message.classList.add('hidden');
    this.cards.forEach((el) => el.classList.remove('active'));
  }

  highlightCard(name) {
    if (!name) return;
    const el = this.parentEl.querySelector(`.card.${name}`);
    if (el) el.classList.add('active');
  }
}