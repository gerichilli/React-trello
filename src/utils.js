import shortid from 'shortid';

/**
 * Get the next card number.
 * @param {object} cards - all the existing cards
 * @return {number} the next card number
 */
export const _getNextNumber = (cards = null) => {
  let nextNumber = -1;
  for (const id in cards) {
    if (cards[id].number > nextNumber) {
      nextNumber = cards[id].number;
    }
  }
  return nextNumber + 1;
};

/**
 * Generate a unique identifier.
 * @return {string} unique ID
 */
export const _generateId = () => shortid.generate();