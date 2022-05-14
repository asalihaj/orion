import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Container, Form, Grid, Header, Label, Segment } from "semantic-ui-react";
import ErrorMessage from "../../../app/common/form/ErrorMessage";
import { v4 as uuid } from 'uuid';
import TextInput from "../../../app/common/form/TextInput";
import NumberInput from "../../../app/common/form/NumberInput";
import { DateInput } from "../../../app/common/form/DateInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { combineDateAndTime, offerCategoryOptions, offerScheduleOptions } from "../../../app/common/util/util";
import { OfferFormValues } from "../../../app/models/offer";
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from "revalidate";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { modules ,formats } from '../../../app/common/options/quill/quillOptions';
import './styles.css';

const validate = combineValidators({
    title: isRequired({ message: 'The offer title is required' }),
    category: isRequired('Category'),
    salary: isRequired('Salary'),
    location: isRequired('Location'),
    schedule: isRequired('Venue'),
    expDate: isRequired('Exp. date is required'),
    time: isRequired('Exp. time is required')
  });

interface DetailParams {
    id: string;
}


const OfferForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { loadOffer, createOffer, editOffer, clearOffer } = rootStore.offerStore;
    const { user } = rootStore.userStore;
    const url = window.location.pathname;

    const [offer, setOffer] = useState(new OfferFormValues());
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (user && user.role !== 'Company') {
            history.push('/offers')
        }
        if (match.params.id) {
            setLoading(true);
            loadOffer(match.params.id)
                .then(offer => {
                    if (user.id !== offer.publisher.id) {
                        clearOffer();
                        history.push('/offers');
                    }
                    setOffer(new OfferFormValues(offer));
                    setDescription(offer.description);
                })
                .finally(() => setLoading(false));
        }
    }, [loadOffer, match.params.id, user]);

    const handleFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.expDate, values.time);
        const {date, time, ...offer} = values;
        dateAndTime.setTime(dateAndTime.getTime() + 2 * 3600 * 1000);
        offer.expDate = dateAndTime;
        offer.description = description;

        if (!offer.id) {
            let newOffer = {
                ...offer,
                id: uuid(),
                description: description,
                companyId: user.id
            };

            createOffer(newOffer)
            .then(() => {
                toast.success("Offer created successfully", { autoClose: 1350});
                setTimeout(() => {
                    history.push('/offers')
                }, 1500)
            })
            .catch(error => {
                console.log(error.data.errors.Description[0]);
            });
        } else {
            editOffer(offer)
            .then(() => {
                toast.success("Offer updated successfully", { autoClose: 1350});
                setTimeout(() => {
                    history.push('/offers')
                }, 1500)
                
            })
            .catch(error => {
                console.log(error);
            });
        }
    } 

    const categoryOptions = offerCategoryOptions();
    const scheduleOptions = offerScheduleOptions();

    const minDate = () => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    }

    const handleChange = (e) => {
        setDescription(e);
    }


    return (
        <Container style={{ marginTop: '3rem' }}>
            <Grid centered>
                <Grid.Column width={8}>
                    <Segment>
                        <FinalForm
                        initialValues={offer}
                        onSubmit={handleFormSubmit}
                        validate={validate}
                        render={({
                            handleSubmit,
                            submitting,
                            submitError,
                            dirtySinceLastSubmit
                        }) => (
                            <Form size='big' onSubmit={handleSubmit} error>
                                <Header
                                    as='h2'
                                    content='Create post'
                                    color='blue'
                                    textAlign='left'
                                />
                                <Form.Group>
                                    <Field
                                        name='title' 
                                        component={TextInput} 
                                        placeholder='Title' />
                                    <Field
                                        name='category'
                                        component={SelectInput}
                                        placeholder='Category'
                                        options={categoryOptions}
                                    />
                                </Form.Group>
                                <Field
                                    name='location'
                                    component={TextInput}
                                    placeholder='Location'
                                />
                                <Form.Group>
                                    <Field
                                        name='schedule'
                                        component={SelectInput}
                                        placeholder='Schedule'
                                        options={scheduleOptions}
                                    />
                                    <Field
                                        name='salary'
                                        component={NumberInput}
                                        placeholder='Salary'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Field
                                        name='expDate'
                                        date={true}
                                        component={DateInput}
                                        min={minDate()}
                                        placeholder='Active until(date)'
                                    />
                                    <Field
                                        name='time'
                                        time={true}
                                        component={DateInput}
                                        placeholder='Active until(time)'
                                    />
                                </Form.Group>
                                <ReactQuill 
                                    className='margin-bottom'
                                    theme="snow" 
                                    value={description} 
                                    placeholder='Write description here... (optional)'
                                    modules={modules}
                                    formats={formats}
                                    onChange={handleChange}
                                />
                                <Button
                                    loading={submitting}
                                    primary
                                    content={url === '/offers/create' ? 'Create' : 'Edit'}
                                    size='big'
                                    fluid
                                    circular
                                />
                                {submitError && !dirtySinceLastSubmit && (
                                    <ErrorMessage
                                    error={submitError}
                                    text={submitError}
                                    />
                                )}
                            </Form>
                            
                        )}
                        />
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default OfferForm;