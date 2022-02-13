import { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import Loading from "components/Loading";

import { selectUser, updateProfile } from "redux/authSlice";
import { updateInfo } from "services/account.service";
import useMultilanguage from "hooks/useMultilanguage";
import useAlert from "hooks/useAlert";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { translator } = useMultilanguage();
  const { alert } = useAlert();

  const validationSchema = yup.object({
    name: yup.string().trim().required(translator("Profile.NameIsEmpty")),
  });

  const initialValues = {
    name: user?.name || "",
  };

  const onSubmit = useCallback(
    async ({ name }: { name: string }) => {
      setSubmitting(true);

      try {
        await updateInfo({ name });
        dispatch(updateProfile({ name }));
        alert(translator("Profile.UpdateSuccessfully"), "success");
      } catch (err: any) {
        alert(err.response?.data || err.message, "error");
      }

      setSubmitting(false);
    },
    [alert]
  );

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setSubmitting } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });

  return (
    <Box py={2}>
      {isSubmitting && <Loading />}
      <Stack spacing={3}>
        <TextField
          fullWidth
          placeholder={translator("Profile.Name")}
          variant="outlined"
          name="email"
          label={translator("Profile.Email")}
          value={user?.email}
          disabled
        />
        <TextField
          fullWidth
          placeholder={translator("Profile.Name")}
          variant="outlined"
          name="name"
          label={translator("Profile.Name")}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur("name")}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />
        <Button variant="contained" onClick={() => handleSubmit()}>
          {translator("Profile.Save")}
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;
