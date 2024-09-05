import path from 'path';

const getBasePath = () => {
  if (
    typeof window !== 'undefined' &&
    window.location.href.startsWith('file://')
  ) {
    return `file://${path.join(__dirname, 'out')}`;
  }
  return '';
};

const BASE_PATH = getBasePath();

export default BASE_PATH;
