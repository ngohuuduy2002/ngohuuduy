import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound(props) {
    return (
        <>
            404<p>Sorry, the page you are looking for does not exist.</p>
            <Button type="primary">
                <Link to={"/"}>Return to home page</Link>
            </Button>
        </>
    )
}

export default NotFound
