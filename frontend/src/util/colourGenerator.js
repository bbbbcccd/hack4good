const getRandomColor = () => {
  const randomColor = () => {
    // 16777215 = 255 * 255 * 255
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  };

  let color = randomColor();

  return color;
};

const getRandomDirection = () => {
  const directions = [
    'to right',
    'to left',
    'to top',
    'to bottom',
    'to top right',
    'to top left',
    'to bottom right',
    'to bottom left',
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

export { getRandomColor, getRandomDirection };
