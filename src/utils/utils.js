const formatDate = uploadDate => {
  const dateArray = uploadDate.split(' ');
  const date = dateArray[2];
  const month = dateArray[1];
  const year = dateArray[3];
  return `${date} ${month}, ${year}`;
};

export { formatDate };
