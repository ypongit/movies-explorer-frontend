import {LAPTOP_WIDTH, LARGE_TABLET_WIDTH, MEDIUM_TABLET_WIDTH, INITIAL_CARDS_LAPTOP_COUNT, INITIAL_CARDS_TABLET_COUNT, INITIAL_CARDS_PHONES_COUNT,
  MORE_LARGE_COUNT, MORE_TABLET_COUNT, MORE_PHONES_COUNT} from '../utils/constants';
// Возвращает количество карточек в зависимости от ширины экрана
export const getByWidth = (width) => {
  if (width >= LAPTOP_WIDTH) {
    return MORE_LARGE_COUNT;
  }
  if (width >= LARGE_TABLET_WIDTH) {
  return MORE_TABLET_COUNT;
}
  return MORE_PHONES_COUNT;
};

export const getInitialCount = (width) => {
  if (width >= LAPTOP_WIDTH) {
    return INITIAL_CARDS_LAPTOP_COUNT;
  }

  if (width >= LARGE_TABLET_WIDTH) {
    return 6;
  }
  if (width >= MEDIUM_TABLET_WIDTH) {
    return INITIAL_CARDS_TABLET_COUNT;
  }

  return INITIAL_CARDS_PHONES_COUNT;
}