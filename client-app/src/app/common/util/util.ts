export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}

export const offerCategoryOptions = () => {
    const options =  [
        {key: 'it', value: 'IT', text: 'Information Technology'},
        {key: 'retail', value: 'Retail', text: 'Retail'},
        {key: 'construction', value: 'Construction', text: 'Construction'},
        {key: 'realEstate', value: 'Real Estate', text: 'Real Estate'},
        {key: 'architecture ', value: 'Architecture ', text: 'Architecture '},
        {key: 'accounting', value: 'Accounting', text: 'Accounting'}
    ]
    return options;
}

export const offerScheduleOptions = () => {
    const options = [
        {key: 'ft', value: 'Full-time', text: 'Full-time'},
        {key: 'pt', value: 'Part-time', text: 'Part-time'},
        {key: 'seasonal', value: 'Seasonal', text: 'Seasonal'},
        {key: 'freelance', value: 'Freelance', text: 'Freelance'}
    ]
    return options;
}