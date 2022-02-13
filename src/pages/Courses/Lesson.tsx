import { FC, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import Loading from "components/Loading";
import NoAccessible from "./components/NoAccessible";
import { getLessonById, selectLessonDetail, resetLessonDetail } from "redux/courseSlice";
import { updateLesson } from "redux/authSlice";
import { submitLessonAnswer } from "services/course.service";
import useMultilanguage from "hooks/useMultilanguage";
import useAlert from "hooks/useAlert";
import { paths } from "configs/routes";

const Lesson: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { detail, detailInitialized } = useSelector(selectLessonDetail);
  const { language, translator } = useMultilanguage();
  const { alert } = useAlert();

  const validationSchema = yup.object({
    examUrl: yup.string().trim().required(translator("Course.ExamURLEmpty")),
  });

  const initialValues = {
    examUrl: detail?.examUrl || "",
  };

  const onSubmit = useCallback(
    async ({ examUrl }: { examUrl: string }) => {
      setSubmitting(true);

      try {
        await submitLessonAnswer(courseId as string, lessonId as string, { examUrl });
        dispatch(updateLesson({ courseId: courseId as string, lessonOrder: detail?.order as number }));
        const nextUrl = detail?.nextLessonId
          ? paths.lesson.replace(":courseId", courseId as string).replace(":lessonId", detail.nextLessonId)
          : paths.courseDetail.replace(":id", courseId as string);

        navigate(nextUrl);
      } catch (err: any) {
        alert(err.response?.data || err.message, "error");
      }

      setSubmitting(false);
    },
    [dispatch, alert, navigate, detail, lessonId, courseId]
  );

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setSubmitting } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  const backToCourse = useCallback(() => {
    navigate(paths.courseDetail.replace(":id", courseId as string));
  }, [navigate, courseId]);

  useEffect(() => {
    dispatch(getLessonById({ courseId, lessonId }));
    return () => {
      dispatch(resetLessonDetail());
    };
  }, [dispatch, courseId, lessonId]);

  if (!detailInitialized) return <Loading />;

  if (!detail)
    return (
      <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <NoAccessible
          text={translator("Course.NoAccessLesson")}
          suggestion={translator("Course.PleaseStartCourseAndLearnLesson")}
        />
        <Button onClick={backToCourse}>{translator("Course.BackToCourse")}</Button>
      </Box>
    );

  return (
    <Box p={4}>
      {isSubmitting && <Loading />}
      <Box mb={2}>
        <Typography variant="h5">{detail.courseName}</Typography>
        <Typography>{language === "vi" ? detail.nameVi : detail.nameEn}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Box borderRadius={2} overflow="hidden">
            <iframe
              width="100%"
              height={450}
              src={`https://www.youtube.com/embed/${detail.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Box mb={2}>
                <Typography>{translator("Course.Exam")}</Typography>
                <Typography fontStyle="italic">
                  <a href={detail.examSrc} target="_blank" rel="noreferrer">
                    {detail.examSrc}
                  </a>
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box mb={2}>
                  <TextField
                    fullWidth
                    placeholder={translator("Course.YourExamURL")}
                    variant="outlined"
                    name="examUrl"
                    label={translator("Course.YourExamURL")}
                    value={values.examUrl}
                    onChange={handleChange}
                    onBlur={handleBlur("examUrl")}
                    error={touched.examUrl && !!errors.examUrl}
                    helperText={touched.examUrl && errors.examUrl}
                    disabled={!!detail?.examUrl}
                  />
                </Box>
                <Button variant="contained" onClick={() => handleSubmit()}>
                  {translator("Course.NextLesson")}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lesson;
