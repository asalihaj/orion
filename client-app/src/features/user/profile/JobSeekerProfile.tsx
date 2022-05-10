import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { IUserProfile } from "../../../app/models/user";

const JobSeekerProfile:React.FC<{user: IUserProfile}> = ({user}) => {

    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [gender, setGender] = useState();
    const [birthday, setBirthday] = useState();

    useEffect(() => {
        setFirstname(user.profile?.firstName);
        setLastname(user.profile?.lastName);
        setGender(user.profile?.gender);
        setBirthday(user.profile?.birthday);
    }, [
        user.profile?.firstName,
        user.profile?.lastName,
        user.profile?.gender,
        user.profile?.birthday
    ]);

    const paddingLeft = {
        paddingLeft: '2.4rem'
    }

    return(
        <Grid columns={1}>
            <Grid.Column style ={{ marginTop: '1rem' }}>
                <Card fluid>
                    <div className="profile-cover"> 
                    </div>
                    <Card.Content style={{ paddingTop: '50px'}}>
                    <Image src={user.photo || '/assets/user.png'} size="small" bordered circular />
                    </Card.Content>
                    <Card.Content style={paddingLeft}>
                    <Card.Header>
                        {firstName + ' ' + lastName}
                    </Card.Header>
                    <Card.Meta>{gender === 'm' ? 'Male' : 'Female'}</Card.Meta>
                    <Card.Description>{format(birthday, 'dd/MM/yyyy')}</Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid>
    );
}

export default JobSeekerProfile;