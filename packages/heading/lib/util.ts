export interface IHeadingData {
  value: string;
  align: string;
  level: number;
}

export const getDefaultData: () => IHeadingData = () => ({
  value: '',
  align: 'left',
  level: 1,
});
