import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<Number, HTMLInputElement>, FormFieldProps {}

const NumberInput: React.FC<IProps> = ({
    width,
    placeholder, 
    meta: {touched, error}
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
           <input type='number' placeholder={placeholder} />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default NumberInput;