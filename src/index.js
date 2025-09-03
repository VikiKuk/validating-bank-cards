import './styles/styles.css';
import { CardValidatorWidget } from './CardValidatorWidget';

const container = document.getElementById('app');
const widget = new CardValidatorWidget(container);
widget.bindToDOM();