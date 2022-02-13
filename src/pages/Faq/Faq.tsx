import { FC, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography, Paper, Stack, Collapse, createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Add, Remove } from "@mui/icons-material";

import Loading from "components/Loading";
import { selectFaq, getFaq } from "redux/faqSlice";
import useMultilanguage from "hooks/useMultilanguage";
import colors from "utils/colors";

const Faq: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const faqs = useSelector(selectFaq);
  const { language, translator } = useMultilanguage();
  const styles = useStyles();
  const [openingId, setOpeningId] = useState<string | null>(null);

  const toggle = useCallback(
    (id: string) => {
      setOpeningId(openingId === id ? null : id);
    },
    [openingId]
  );

  useEffect(() => {
    dispatch(getFaq());
  }, [dispatch]);

  if (!faqs) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={4}>
      <Grid container className={styles.container}>
        <Grid item xs={11} sm={11} md={8} lg={6} xl={4}>
          <Box mb={4}>
            <Typography variant="h5" align="center">
              {translator("FAQs.FAQ")}
            </Typography>
          </Box>
          <Stack spacing={2}>
            {faqs.map((faq) => (
              <Paper elevation={3} key={faq.id}>
                <Box p={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography
                      fontSize="1.1rem"
                      fontWeight={600}
                      color={openingId === faq.id ? colors.primary : colors.dark}
                    >
                      {language === "vi" ? faq.questionVi : faq.questionEn}
                    </Typography>
                    {openingId === faq.id ? (
                      <Remove className={styles.icon} onClick={() => toggle(faq.id)} />
                    ) : (
                      <Add className={styles.icon} onClick={() => toggle(faq.id)} />
                    )}
                  </Box>
                  <Collapse in={openingId === faq.id}>
                    <Box my={2}>
                      <Typography fontSize="0.9rem" color={colors.dark}>
                        {language === "vi" ? faq.answerVi : faq.answerEn}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              </Paper>
            ))}
          </Stack>
          <Box mt={4}>
            <Box mb={2}>
              <Typography variant="h5" align="center">
                {translator("FAQs.StillHaveAQuestion")}
              </Typography>
            </Box>
            <Typography fontSize="0.9rem" color={colors.dark} align="center">
              {translator("FAQs.ContactUs")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Faq;

const useStyles: any = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      cursor: "pointer",
    },
  })
);
