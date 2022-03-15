export const getShortPackageName = (name: string) => {
  const parts = name.split('/');
  console.log(parts);
  return parts[1] || parts[0] || name;
}
