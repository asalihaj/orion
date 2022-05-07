import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Input, Label } from 'semantic-ui-react'
import './styles.css'

interface IProps extends FieldRenderProps<Number, HTMLInputElement>, FormFieldProps {}

const NumberInput: React.FC<IProps> = ({
    input,
    width,
    placeholder, 
    value,
    meta: {touched, error}
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Input placeholder={placeholder} {...input} 
            onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
                }
            }}
            />
            {touched && error && (
                <Label basic prompt  pointing='above' color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default NumberInput;