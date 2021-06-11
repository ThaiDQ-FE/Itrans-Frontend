import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HeaderGeneral from "../../../components/header-general";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FormRole from "../../../components/form-role";
import Messages from "../../../assets/message/text";
import "./styles.scss";
import FormBasicInformation from "../../../components/form-basicInfomation";
import FormInformationAboutTheOrganization from "../../../components/form-iatorganization";
import FormDetailsInformation from "../../../components/form-detailsinfo";
import FormMember from "../../../components/form-member";
function Register() {
  const themeMenu = createMuiTheme({
    overrides: {
      MuiStep: {
        horizontal: {
          marginTop: 25,
        },
      },
    },
  });
  const [role, setRole] = useState("");
  const setStateRole = (newRole) => {
    setRole(newRole);
  };
  const getSteps = () => {
    if (role === "organization") {
      return [
        Messages.GENERAL_STEP_1,
        Messages.ORGANIZATION_STEP_2,
        Messages.ORGANIZATION_STEP_3,
        Messages.GENERAL_STEP_FINAL,
      ];
    } else {
      return [
        Messages.GENERAL_STEP_1,
        Messages.INVESTOR_STEP_2,
        Messages.GENERAL_STEP_FINAL,
      ];
    }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <FormBasicInformation handleNext={handleNext} />;
      case 1:
        switch (role) {
          case "organization":
            return (
              <FormInformationAboutTheOrganization handleNext={handleNext} />
            );
          default:
            return <FormDetailsInformation />;
        }
      case 2:
        switch (role) {
          case "organization":
            return <FormMember />;
        }
      default:
        return "Unknown step";
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      {role === "" ? (
        <FormRole setStateRole={setStateRole} role={role} />
      ) : (
        <MuiThemeProvider theme={themeMenu}>
          <div className="register__wrapper">
            <div className="register__container">
              <HeaderGeneral />
              <div className="register__form">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <div>{getStepContent(activeStep)}</div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      )}
    </>
  );
}
export default Register;
