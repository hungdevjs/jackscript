import { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, TextField, Button, createStyles, Theme, useTheme, useMediaQuery, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import Loading from "components/Loading";

import Icons from "assets/Icons";
import useMultilanguage from "hooks/useMultilanguage";
import colors from "utils/colors";
import { selectTip } from "redux/tipSlice";
import { logIn } from "services/account.service";
import { setUser } from "redux/authSlice";
import { ACCESS_TOKEN } from "utils/constants";

const Login: FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const { translator, language } = useMultilanguage();
  const tip = useSelector(selectTip);
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup.object({
    email: yup.string().email(translator.Login.EmailInvalid).trim().required(translator.Login.EmailEmpty),
    password: yup
      .string()
      .required(translator.Login.PasswordEmpty)
      .trim()
      .min(8, translator.Login.PasswordLengthInvalid),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setSubmitting(true);

      try {
        const res: any = await logIn({ email, password });
        const { data, accessToken } = res.data;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        dispatch(setUser(data));
      } catch (err: any) {
        enqueueSnackbar(err.response?.data || err.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }

      setSubmitting(false);
    },
    [dispatch]
  );

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setSubmitting } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box p={2} flexGrow={1} display="flex" alignItems="center" justifyContent="center">
      {isSubmitting && <Loading />}
      <Grid container className={styles.container}>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={8}>
          <Grid container className={styles.content}>
            {!isLg && (
              <Grid item xs={0} sm={0} md={0} lg={6} xl={6} className={styles.tipContent}>
                {tip && (
                  <Box px={4} py={8}>
                    <Box mb={2}>
                      <Typography variant="h5" color={colors.white} align="center">
                        {translator.Login.GetBetter}
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="h6" color={colors.white} align="center">
                        {tip.title}
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      <img src={tip.image} className={styles.tipImage} />
                    </Box>
                    <Typography color={colors.white} align="center">
                      {language === "vi" ? tip.bodyVi : tip.bodyEn}
                    </Typography>
                  </Box>
                )}
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Box px={4} py={8}>
                <Box display="flex" justifyContent="center" mb={2}>
                  <img src={Icons.jackscript} width={120} />
                </Box>
                <Box mb={3}>
                  <Typography variant="h6" align="center">
                    {translator.Login.WelcomeBack}
                  </Typography>
                </Box>
                <Box marginBottom={2}>
                  <TextField
                    fullWidth
                    placeholder={translator.Login.Email}
                    variant="outlined"
                    name="email"
                    label={translator.Login.Email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur("email")}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box marginBottom={2}>
                  <TextField
                    fullWidth
                    type="password"
                    placeholder={translator.Login.Password}
                    variant="outlined"
                    name="password"
                    label={translator.Login.Password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur("password")}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Button variant="contained" onClick={() => handleSubmit()}>
                    Login
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      height: "100%",
      borderRadius: 4,
      overflow: "hidden",
      boxShadow:
        "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    },
    tipContent: {
      borderRight: `1px solid ${colors.secondary}`,
      backgroundColor: colors.primary,
    },
    tipImage: {
      maxWidth: "100%",
      borderRadius: 4,
    },
  })
);
