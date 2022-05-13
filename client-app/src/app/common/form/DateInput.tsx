import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { DateTimePicker } from 'react-widgets'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<Date, HTMLInputElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
    input, 
    width,
    date = false,
    time = false,
    min,
    defaultValue,
    max,
    placeholder, 
    meta: {touched, error},
    ...rest
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                min={min}
                max={max}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={input.value || null}
                date={date}
                time={time}
                onChange={input.onChange}
            />
            {touched && error && (
                <Label basic prompt  pointing='above' color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}
