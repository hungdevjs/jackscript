import { FC, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Tabs, Tab, Typography, createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

import Loading from "components/Loading";
import Avatar from "./components/Avatar";
import Profile from "./components/Profile";
import Progress from "./components/Progress";
import Plan from "./components/Plan";
import Settings from "./components/Settings";

import { selectUser, updateAvatar as updateAvatarAction } from "redux/authSlice";
import colors from "utils/colors";
import useMultilanguage from "hooks/useMultilanguage";
import useAlert from "hooks/useAlert";
import { getUpdateAvatarSignature, updateAvatar } from "services/account.service";
import Images from "assets/Images";

const eager = "c_pad,h_300,w_400|c_crop,h_200,w_260";

const Home: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const styles = useStyles();
  const [tab, setTab] = useState<number>(0);
  const [file, setFile] = useState<any>(null);
  const [signData, setSignData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { translator } = useMultilanguage();
  const { alert } = useAlert();

  const tabs = [
    { name: translator("Home.Profile"), component: Profile },
    // { name: translator("Home.Progress"), component: Progress },
    { name: translator("Home.Plan"), component: Plan },
    { name: translator("Home.Settings"), component: Settings },
  ];

  const Content = useMemo(() => {
    return tabs[tab]?.component;
  }, [tabs, tab]);

  const openFileInput = useCallback(() => {
    const label = document.getElementById("upload-file-label");
    label?.click();
  }, []);

  const uploadAvatar = useCallback(
    async (file: any, signData) => {
      setIsLoading(true);
      try {
        const { timestamp, signature, cloudName, apiKey, data } = signData;
        const url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

        const formData = new FormData();
        const instance = axios.create();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        for (const key of Object.keys(data)) {
          formData.append(key, data[key]);
        }

        const res = await instance.post(url, formData);
        const { public_id: avatarPublicId, url: avatar } = res.data;
        await updateAvatar({ avatarPublicId });
        dispatch(updateAvatarAction({ avatar }));
        alert("Change avatar successfully", "success");
      } catch (err: any) {
        alert(err.response?.data || err.message, "error");
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  const onImageChange = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!signData) {
          const res = await getUpdateAvatarSignature();
          setSignData(res.data);
          uploadAvatar(file, res.data);
        } else {
          uploadAvatar(file, signData);
        }
      }
    },
    [signData, uploadAvatar]
  );

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);

  return (
    <Box py={4}>
      {isLoading && <Loading />}
      <div style={{ display: "none" }}>
        <input id="upload-file-input" type="file" accept="image/*" onChange={onImageChange} />
        <label id="upload-file-label" htmlFor="upload-file-input" />
      </div>
      <Grid container className={styles.container}>
        <Grid item xs={11} sm={11} md={8} lg={8} xl={8}>
          <Box p={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2}>
                <Avatar url={previewUrl || user?.avatar || Images.defaultAvatar} onClick={openFileInput} />
              </Box>
              <Box>
                <Typography fontSize="1.1rem" fontWeight={600} align="center">
                  {user?.name}
                </Typography>
                <Typography fontSize="0.9rem" color={colors.dark} align="center">
                  {user?.level}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Tabs value={tab} onChange={(_e, newTab) => setTab(newTab)}>
              {tabs.map((item) => (
                <Tab
                  key={item.name}
                  label={
                    <Typography fontWeight={600} textTransform="none">
                      {item.name}
                    </Typography>
                  }
                />
              ))}
            </Tabs>
          </Box>
          <Box pt={2}>
            <Content />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

const useStyles: any = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
