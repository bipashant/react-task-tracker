import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation} from 'react-router-dom'

import React from 'react'

const Header = ({ title, onToggleAddForm, showAddTask }) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
            { location.pathname === '/' && (
                    < Button color={showAddTask ? 'red' : 'green'}text={showAddTask ? 'Close' : 'Add'} onClick={ onToggleAddForm}/>
                )
            }
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}
Header.propTypes = {
    title: PropTypes.string.isRequired
}
// CSS in JSX
// const headingStyle = {
//     color: 'white',
//     backgroundColor: 'black'
// }
export default Header
