import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Box, Stack, Paper, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import Loading from "components/Loading";
import LanguageSelector from "components/LanguageSelector";
import { reset } from "redux/authSlice";
import useMultilanguage from "hooks/useMultilanguage";
import useAlert from "hooks/useAlert";
import { changePassword } from "services/account.service";
import { ACCESS_TOKEN } from "utils/constants";

const Settings: FC = () => {
  const dispatch = useDispatch();
  const { translator } = useMultilanguage();
  const { alert } = useAlert();

  const logOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(reset());
  }, [dispatch]);

  const validationSchema = yup.object({
    password: yup
      .string()
      .trim()
      .required(translator("Settings.PasswordEmpty"))
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, translator("Settings.PasswordFormat")),
    newPassword: yup
      .string()
      .trim()
      .required(translator("Settings.NewPasswordEmpty"))
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, translator("Settings.PasswordFormat")),
  });

  const initialValues = {
    password: "",
    newPassword: "",
  };

  const onSubmit = useCallback(
    async ({ password, newPassword }: { password: string; newPassword: string }) => {
      setSubmitting(true);

      try {
        await changePassword({ password, newPassword });
        alert(translator("Settings.ChangePasswordSuccessfully"), "success");
        resetForm();
      } catch (err: any) {
        alert(err.response?.data || err.message, "error");
      }

      setSubmitting(false);
    },
    [alert]
  );

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setSubmitting, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <Box py={2}>
      {isSubmitting && <Loading />}
      <Stack spacing={3}>
        <LanguageSelector />
        <Paper elevation={3}>
          <Box p={2}>
            <Stack spacing={3}>
              <Typography fontWeight={600}>{translator("Settings.Security")}</Typography>
              <TextField
                fullWidth
                type="password"
                placeholder={translator("Settings.Password")}
                variant="outlined"
                name="password"
                label={translator("Settings.Password")}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur("password")}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                type="password"
                placeholder={translator("Settings.NewPassword")}
                variant="outlined"
                name="newPassword"
                label={translator("Settings.NewPassword")}
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur("newPassword")}
                error={touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
              />
              <Button variant="contained" onClick={() => handleSubmit()}>
                {translator("Settings.ChangePassword")}
              </Button>
            </Stack>
          </Box>
        </Paper>
        <Box mt={2} display="flex" flexDirection="column">
          <Button variant="contained" color="error" onClick={() => logOut()}>
            {translator("Settings.LogOut")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Settings;
