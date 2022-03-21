export const getShortPackageName = (name: string) => {
  const parts = name.split('/');
  return parts[1] || parts[0] || name;
}
