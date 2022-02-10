import { FC, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import Loading from "components/Loading";
import { getLessonById, selectLessonDetail, resetLessonDetail } from "redux/courseSlice";
import useMultilanguage from "hooks/useMultilanguage";
import useAlert from "hooks/useAlert";

const Lesson: FC = () => {
  const dispatch = useDispatch();
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { detail, detailInitialized } = useSelector(selectLessonDetail);
  const { language, translator } = useMultilanguage();
  const { alert } = useAlert();

  const validationSchema = yup.object({
    examUrl: yup.string().trim().required(translator("Course.ExamURLEmpty")),
  });

  const initialValues = {
    examUrl: "",
  };

  const onSubmit = useCallback(
    async ({ examUrl }: { examUrl: string }) => {
      setSubmitting(true);

      try {
        console.log({ examUrl });
      } catch (err: any) {
        alert(err.response?.data || err.message, "error");
      }

      setSubmitting(false);
    },
    [dispatch, alert]
  );

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    dispatch(getLessonById({ courseId, lessonId }));
    return () => {
      dispatch(resetLessonDetail());
    };
  }, [dispatch, courseId, lessonId]);

  if (!detailInitialized) return <Loading />;

  if (!detail) return <Typography>Youre not able to view this lesson</Typography>;

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
