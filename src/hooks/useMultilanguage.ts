import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";

import en from "assets/languages/en.json";

import Languages from "assets/Languages";
import { selectLanguage, setLanguage } from "redux/languageSlice";

const useMultilanguage = () => {
  const [file, setFile] = useState<any>(en);
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const getFile = useCallback(async () => {
    // @ts-ignore
    setFile(Languages[language]);
  }, [language]);

  const changeLanguage = useCallback(
    (lang: "en" | "vi") => {
      if (lang === language) return;

      dispatch(setLanguage(lang));
    },
    [language]
  );

  const translator = useCallback((key: string) => get(file, key, key), [file]);

  useEffect(() => {
    getFile();
  }, [language]);

  return { language, translator, changeLanguage };
};

export default useMultilanguage;
