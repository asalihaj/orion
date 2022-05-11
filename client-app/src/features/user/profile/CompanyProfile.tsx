import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Card, Image, Button, Grid, GridColumn, Header } from "semantic-ui-react";
import { IUserProfile } from "../../../app/models/user";

const CompanyProfile:React.FC<{user: IUserProfile}> = ({user}) => {

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        setName(user.profile?.name);
        setLocation(user.profile?.location);
        setDescription(user.profile?.description);
    }, [
        user.profile?.name,
        user.profile?.location,
        user.profile?.description
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
                        {name}
                    </Card.Header>
                    <Card.Meta>{location}</Card.Meta>
                    <Card.Description>{}</Card.Description>
                    </Card.Content>
                    <Card.Content style={paddingLeft}>
                    <Card.Content>
                        <Button 
                        circular
                        primary
                        onClick={() => console.log("SS")}
                        >
                        See jobs
                        </Button>
                    </Card.Content>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column>
                <ReactQuill 
                    theme="bubble"
                    readOnly={true}
                    value={description || ''}
                />
            </Grid.Column>
        </Grid>
    );
}

export default CompanyProfile;