import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label, Radio } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {}

const RadioInput: React.FC<IProps> = ({
    input,
    placeholder,
}) => {
    return (
        <Form.Field>
            <Radio 
                label={placeholder}
                name={input.name}
                value={input.value}
                checked={input.value === 'this'}
            />
        </Form.Field>
    )
}

export default RadioInput;