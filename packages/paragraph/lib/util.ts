export interface IParagraphData {
  value: string;
  align: string;
}

export const getDefaultData: () => IParagraphData = () => ({
  value: '',
  align: 'left',
});
