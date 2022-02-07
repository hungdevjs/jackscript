import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import en from "assets/languages/en.json";

import Languages from "assets/Languages";
import { selectLanguage, setLanguage } from "redux/languageSlice";

const useMultilanguage = () => {
  const [translator, setTranslator] = useState<any>(en);
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const getFile = useCallback(async () => {
    // @ts-ignore
    setTranslator(Languages[language]);
  }, [language]);

  const changeLanguage = useCallback(
    (lang: "en" | "vi") => {
      if (lang === language) return;

      dispatch(setLanguage(lang));
    },
    [language]
  );

  useEffect(() => {
    getFile();
  }, [language]);

  return { language, translator, changeLanguage };
};

export default useMultilanguage;
