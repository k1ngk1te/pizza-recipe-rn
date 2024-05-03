function convertUnit(value, from, to) {
  let result = value;

  if (from.si === 'g') {
    switch (to.si) {
      case 'lb':
        result = value / 453.592;
        break;
      case 'oz':
        result = value / 28.3495;
        break;
      default:
        result = value;
        break;
    }
  } else if (from.si === 'lb') {
    switch (to.si) {
      case 'g':
        result = value * 453.592;
        break;
      case 'oz':
        result = value * 16;
        break;
      default:
        result = value;
        break;
    }
  } else if (from.si === 'oz') {
    switch (to.si) {
      case 'g':
        result = value * 28.3495;
        break;
      case 'lb':
        result = value / 16;
        break;
      default:
        result = value;
        break;
    }
  }
  return result;
}

export default convertUnit;
