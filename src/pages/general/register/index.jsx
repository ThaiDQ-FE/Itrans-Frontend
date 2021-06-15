import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
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
  const themeOrganization = createMuiTheme({
    overrides: {
      MuiStep: {
        horizontal: {
          marginTop: 25,
        },
      },
      MuiStepper: {
        root: {
          padding: "25px 250px",
        },
      },
      MuiStepIcon: {
        completed: {
          color: "#FF8412 !important",
        },
        active: {
          color: "#FF8412 !important",
        },
      },
      MuiSvgIcon: {
        root: {
          width: "35px !important",
          height: "35px !important",
        },
      },
      MuiStepLabel: {
        active: {
          fontWeight: "600 !important",
        },
      },
    },
  });
  const themeInvestor = createMuiTheme({
    overrides: {
      MuiStep: {
        horizontal: {
          marginTop: 25,
        },
      },
      MuiStepper: {
        root: {
          padding: "25px 350px",
        },
      },
      MuiStepIcon: {
        completed: {
          color: "#FF8412 !important",
        },
        active: {
          color: "#FF8412 !important",
        },
      },
      MuiSvgIcon: {
        root: {
          width: "35px !important",
          height: "35px !important",
        },
      },
      MuiStepLabel: {
        active: {
          fontWeight: "600 !important",
        },
      },
    },
  });
  const [role, setRole] = useState("");
  const [subRole, setSubRole] = useState("");
  const [finalRole, setFinalRole] = useState(null);
  const setStateRole = (newRole) => {
    setRole(newRole);
    setFinalRole("organization");
  };
  const setStateSubRole = (newSubRole) => {
    setSubRole(newSubRole);
    setFinalRole("investor");
  };
  console.log(finalRole);
  const getSteps = () => {
    if (role === "organization" || subRole === "INSTITUTIONAL_INVESTOR") {
      return [
        Messages.GENERAL_STEP_1,
        Messages.ORGANIZATION_STEP_2,
        Messages.ORGANIZATION_STEP_3,
      ];
    } else {
      return [Messages.GENERAL_STEP_1, Messages.INVESTOR_STEP_2];
    }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormBasicInformation
            handleNext={handleNext}
            handleBack={handleBack}
            step={step}
          />
        );
      case 1:
        switch (role) {
          case "organization":
            return (
              <FormInformationAboutTheOrganization
                handleNext={handleNext}
                handleBack={handleBack}
              />
            );
          case "":
            switch (subRole) {
              case "INSTITUTIONAL_INVESTOR":
                return (
                  <FormInformationAboutTheOrganization
                    handleNext={handleNext}
                    handleBack={handleBack}
                  />
                );

              default:
                return <FormDetailsInformation handleBack={handleBack} />;
            }
        }
      case 2:
        switch (role) {
          case "organization":
            return (
              <FormMember handleNext={handleNext} handleBack={handleBack} />
            );
        }
      default:
        return <FormMember handleNext={handleNext} handleBack={handleBack} />;
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
      {subRole === "" && role === "" ? (
        <FormRole
          setStateRole={setStateRole}
          setStateSubRole={setStateSubRole}
        />
      ) : (
        <MuiThemeProvider
          theme={role === "organization" ? themeOrganization : themeInvestor}
        >
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
