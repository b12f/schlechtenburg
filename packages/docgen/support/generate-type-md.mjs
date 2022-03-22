const generateTypeMd = (docs) => {
  if (docs.type === 'union') {
    return docs.types.map(type => generateTypeMd(type)).join('|');
  }
  
  return docs.name;
};

export default generateTypeMd;
