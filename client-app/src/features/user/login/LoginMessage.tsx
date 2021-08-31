import { Link } from "react-router-dom"
import { Message } from "semantic-ui-react"

const LoginMessage = () => {
    return (
        <Message attached='bottom' color='blue'>
            Don't have an account? 
            <Message.Header as={Link} to='/register' >
                Join now
            </Message.Header>
        </Message>
    )
}

export default LoginMessage;