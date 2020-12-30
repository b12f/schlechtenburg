export interface ParagraphData {
  value: string;
  align: string;
}

export const getDefaultData: () => ParagraphData = () => ({
  value: '',
  align: 'left',
});
