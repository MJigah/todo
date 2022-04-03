import React from 'react';
import ResetButton from './ResetButton';

const Header = () => {
    return (
        <>
            <ul className="header-ul">
                <li>Todo List</li>
                <li>
                    <ResetButton />
                </li>
            </ul>
        </>
    )
}

export default Header
