import { Fragment, useState } from "react";
import { Icon, Step } from "semantic-ui-react";
import FormContainer from "../../../../app/common/form/FormContainer";
import { CompanyFormValues } from "../../../../app/models/company";
import { JobSeekerFormValues } from "../../../../app/models/jobseeker";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";

import UserForm from "./UserForm";

const RegisterForm = ({formType}) => {

  let companyProfile: CompanyFormValues;
  let jobseekerProfile: JobSeekerFormValues;

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    ...(formType === 'company') ? {...companyProfile} : {...jobseekerProfile}
  });
  const [step, setStep] = useState(0);

  const makeRequest = (formData) => {
    console.log("Form submitted", formData);
  }

  const handleNextStep = (newData, final = false) => {
    setData(prev => ({...prev, ...newData}));
    
    if (final) {
      makeRequest(newData);
      return
    }

    setStep(prev => prev + 1);
  }

  const handlePrevStep = (newData) => {
    setData(prev => ({...prev, ...newData}));
    setStep(prev => prev - 1);
  }

  const steps = [
    <UserForm next={handleNextStep} data={data} />
    , 
    formType === 'company' ? 
    <CompanyForm 
      next={handleNextStep} 
      prev={handlePrevStep} 
      data={data} /> 
      : 
    <JobSeekerForm 
      next={handleNextStep} 
      prev={handlePrevStep} 
      data={data} />];

  console.log(data);
  
  return (
      <FormContainer form={steps[step]} header={<RegisterSteps currentStep={step} type={formType} />} />
        
  );
}

const RegisterSteps = ({currentStep, type}) => {
  return (
  <Step.Group widths={2}>
    <Step active={currentStep === 0} completed={currentStep > 0} >
      <Icon name='user' />
      <Step.Content>
        <Step.Title>Account</Step.Title>
      </Step.Content>
    </Step>
    <Step active={currentStep === 1}>
      <Icon name={type === 'company' ? 'building' : 'briefcase'} />
      <Step.Content>
        <Step.Title>{type === 'company' ? 'Company Info' : 'Profile'}</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
  )
}

export default RegisterForm;