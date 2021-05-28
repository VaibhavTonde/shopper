import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

Message.deaultProps = {
    variant: 'blue',
}
export default Message
