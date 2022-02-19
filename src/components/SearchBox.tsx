import { FC, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, CircularProgress, createStyles, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Search } from "@mui/icons-material";

import colors from "utils/colors";
import { paths } from "configs/routes";
import { search } from "services/account.service";
import useMultilanguage from "hooks/useMultilanguage";
import useAlert from "hooks/useAlert";

interface CourseSearch {
  id: string;
  name: string;
}

interface LessonSearch {
  id: string;
  nameEn: string;
  nameVi: string;
  courseId: string;
  courseName: string;
}

interface Data {
  courses: CourseSearch[];
  lessons: LessonSearch[];
}

const SearchBox: FC = () => {
  const navigate = useNavigate();
  const timeout = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Data>({ courses: [], lessons: [] });
  const [searchString, setSearchString] = useState("");
  const { alert } = useAlert();
  const { language, translator } = useMultilanguage();
  const styles = useStyles();

  const submitSearch = useCallback(async () => {
    if (!searchString || !searchString.trim()) return;
    setData({ courses: [], lessons: [] });
    setIsLoading(true);

    try {
      const res = await search(searchString);
      setData(res.data);
    } catch (err: any) {
      alert(err.response?.data || err.message, "error");
    }

    setIsLoading(false);
  }, [searchString, alert]);

  const goToDetail = useCallback(
    (type: "course" | "lesson", item: any) => {
      const { id, courseId } = item;
      const url =
        type === "course"
          ? paths.courseDetail.replace(":id", id)
          : paths.lesson.replace(":courseId", courseId).replace(":lessonId", id);

      setIsOpen(false);
      navigate(url);
    },
    [navigate]
  );

  useEffect(() => {
    if (searchString && searchString.trim()) {
      setIsOpen(true);
    }
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(submitSearch, 500);
  }, [searchString]);

  const { courses, lessons } = data;

  return (
    <Box minWidth={400} display="flex" alignItems="center" position="relative">
      <Search color="primary" />
      <input
        className={styles.input}
        placeholder={translator("Header.TypeToSearch")}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      {isOpen && (
        <Box width="100%" position="absolute" top="100%" left={0}>
          <Paper elevation={3} style={{ overflow: "hidden" }}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="50px"
              maxHeight="50vh"
              overflow="auto"
            >
              {isLoading && <CircularProgress color="primary" size={20} />}
              {courses.map((item) => (
                <Box
                  key={item.id}
                  alignSelf="stretch"
                  p={2}
                  className={styles.searchItem}
                  onClick={() => goToDetail("course", item)}
                >
                  <Typography fontSize="0.9rem">{item.name}</Typography>
                </Box>
              ))}
              {lessons.map((item) => (
                <Box
                  key={item.id}
                  alignSelf="stretch"
                  px={2}
                  py={1}
                  className={styles.searchItem}
                  onClick={() => goToDetail("lesson", item)}
                >
                  <Typography fontSize="0.9rem">{item.courseName}</Typography>
                  <Typography fontSize="0.8rem" color={colors.dark}>
                    {language === "vi" ? item.nameVi : item.nameEn}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SearchBox;

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      border: 0,
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      marginLeft: theme.spacing(2),
      fontSize: "1rem",
      color: colors.dark,
      "&:focus": {
        outline: "none",
      },
    },
    searchItem: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: colors.secondary,
      },
    },
  })
);
