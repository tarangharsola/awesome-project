{"import { useLanguage } from './useLanguage';

const useFormattingDefaults = () => {
  const { language, formattingDefaults } = useLanguage();

  const handleFormatDefaultsChange = (newDefaults) => {
    setFormattingDefaults(newDefaults);
  };

  return {
    formattingDefaults,
    handleFormatDefaultsChange
  };
};

export default useFormattingDefaults;