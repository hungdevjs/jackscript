import { FC } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Typography, Paper, Stack, createStyles, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Check } from "@mui/icons-material";

import Images from "assets/Images";
import { selectUser } from "redux/authSlice";
import useMultilanguage from "hooks/useMultilanguage";
import colors from "utils/colors";

const Plan: FC = () => {
  const user = useSelector(selectUser);
  const { translator } = useMultilanguage();
  const styles = useStyles();

  const plans = [
    {
      name: "FREE",
      image: Images.free,
      price: "0",
      features: ["Learn all basic courses on JackScript", "JackScript chat mentoring (19h-22h)"],
    },
    {
      name: "SILVER",
      isPopular: true,
      image: Images.silver,
      price: "200,000",
      features: [
        "Learn all basic courses on JackScript",
        "JackScript chat mentoring (19h-22h)",
        "JackScript call mentoring 1h/day (19h-22h)",
        "Learn all advanced courses on JackScript",
        "Promote to JackScript's partners",
      ],
    },
    {
      name: "GOLD",
      image: Images.gold,
      price: "500,000",
      features: [
        "Learn all basic courses on JackScript",
        "JackScript chat mentoring 24/24",
        "JackScript call mentoring 1h/day (19h-22h)",
        "Learn all advanced courses on JackScript",
        "Promote to JackScript's partners",
        "1-1 mentor supporting by JackScript mentoring or private message app (Telegram, Zalo, Messenger,...)",
      ],
    },
  ];

  return (
    <Box py={2} width="100%">
      <Box mb={2} display="flex" flexDirection="column" alignItems="center">
        <Typography align="center" variant="h5">
          {translator("Plan.FlexiblePlans")}
        </Typography>
        <Typography fontSize="0.9rem" color={colors.dark} align="center">
          {translator("Plan.ChooseYourPlan")}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid key={plan.name} item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper elevation={3} style={{ borderRadius: "16px" }}>
              <Box p={3} position="relative">
                {plan.isPopular && (
                  <Box
                    position="absolute"
                    top={10}
                    right={10}
                    borderRadius={16}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor={colors.primary}
                    px={1}
                  >
                    <Typography fontSize="0.75rem" fontWeight={600} color={colors.white}>
                      Popular
                    </Typography>
                  </Box>
                )}
                {plan.name === user?.plan && (
                  <Box
                    position="absolute"
                    top={10}
                    left={10}
                    borderRadius={16}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor={colors.primary}
                    px={1}
                  >
                    <Typography fontSize="0.75rem" fontWeight={600} color={colors.white}>
                      Your plan
                    </Typography>
                  </Box>
                )}
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <img src={plan.image} alt="pricing-plan" width={100} />
                  <Box>
                    <Typography fontWeight={700} fontSize="1.1rem">
                      {plan.name}
                    </Typography>
                    <Typography fontWeight={600} fontSize="0.9rem" color={colors.dark}>
                      ₫ {plan.price} /month
                    </Typography>
                  </Box>
                </Box>
                <Box height={2} bgcolor={colors.secondary} />
                <Box mt={3}>
                  <Stack spacing={1}>
                    {plan.features.map((feat) => (
                      <Box key={feat} display="flex" gap={2}>
                        <Check color="success" />
                        <Typography key={feat} fontWeight={600} fontSize="0.9rem" color={colors.dark}>
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box mt={3} display="flex" flexDirection="column">
                  <Button variant="contained" color="success" disabled={plan.name === user?.plan || true}>
                    <Typography fontWeight={600} color={colors.white} textTransform="none">
                      Choose Plan
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Plan;

const useStyles: any = makeStyles(() => createStyles({}));
