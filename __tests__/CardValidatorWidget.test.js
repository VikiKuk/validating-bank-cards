import { CardValidatorWidget } from '../src/CardValidatorWidget';

describe('CardValidatorWidget', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    const widget = new CardValidatorWidget(container);
    widget.bindToDOM();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders form and icons', () => {
    expect(container.querySelector('.validator-form')).not.toBeNull();
    expect(container.querySelectorAll('.card').length).toBeGreaterThan(0);
  });

  test('highlights detected card type', () => {
    const widget = new CardValidatorWidget(container);
    widget.bindToDOM();
    widget.highlightCard('visa');
    const card = container.querySelector('.card.visa');
    expect(card.classList.contains('active')).toBe(true);
  });

  test('shows error on incorrect length for known card type', () => {
    document.body.innerHTML = '<div id="container"></div>';
    const widget = new CardValidatorWidget(document.getElementById('container'));
    widget.bindToDOM();

    const input = widget.input;
    input.value = '4111111'; // слишком короткий номер для Visa

    widget.form.dispatchEvent(new Event('submit'));

    expect(input.classList.contains('invalid')).toBe(true);
    expect(widget.message.textContent).toMatch(/Неверная длина/i);
  });

  test('clears classes correctly', () => {
    const widget = new CardValidatorWidget(container);
    widget.bindToDOM();
    widget.input.classList.add('valid');
    widget.message.classList.remove('hidden');
    widget.cards[0].classList.add('active');

    widget.clearClasses();

    expect(widget.input.classList.contains('valid')).toBe(false);
    expect(widget.message.classList.contains('hidden')).toBe(true);
    expect(widget.cards[0].classList.contains('active')).toBe(false);
  });
});