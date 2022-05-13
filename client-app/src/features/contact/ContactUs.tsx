import { Button, Checkbox, Form, TextArea } from "semantic-ui-react";

const ContactUs = () => {
  return (
    
    <Form
      style={{
        width: "25%",
        marginLeft: "35%",
        marginTop: "10%",
      }}
    >
      <Form.Field>
        <label>Email Address</label>
        <input placeholder="Email Address" />
      </Form.Field>
      <Form.Field>
        <label>Subject</label>
        <input placeholder="Subject" />
      </Form.Field>
      <Form.Field>
        <TextArea placeholder="Message..." style={{ minHeight: 100 }} />
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ContactUs;
