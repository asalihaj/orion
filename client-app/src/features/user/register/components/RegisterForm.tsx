import { useState } from "react";
import { Button, Container, Icon, Label, Step } from "semantic-ui-react";
import FormContainer from "../../../../app/common/form/FormContainer";
import { ICompanyFormValues } from "../../../../app/models/company";
import { IJobSeekerFormValues } from "../../../../app/models/jobseeker";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";
import { history } from "../../../..";

import UserForm from "./UserForm";

const RegisterForm = ({formType}) => {

  let companyProfile: ICompanyFormValues;
  let jobseekerProfile: IJobSeekerFormValues;

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    errorCode: 0,
    errorMessage: '',
    ...(formType === 'company') ? {...companyProfile} : {...jobseekerProfile},
  });
  const [step, setStep] = useState(0);

  const handleNextStep = (newData) => {
    setData(prev => ({...prev, ...newData}));

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
  
  return (
      <FormContainer form={steps[step]} header={<RegisterSteps currentStep={step} type={formType} />} footer={<Back />} />
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

const Back = () => {
  return (
    <Button 
      labelPosition='left'
      icon='arrow left'
      content='Back'
      basic
      floated='left'
      onClick={() => history.push('/register')}
      />
  )
}

export default RegisterForm;