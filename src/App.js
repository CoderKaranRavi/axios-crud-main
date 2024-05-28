import React from 'react';
import { UserProvider } from './UserContext';
import UserList from './components/UserList';
import './App.css';

function App() {
    return (
        <UserProvider>
            <div className="App">
                <UserList />
            </div>
        </UserProvider>
    );
}

export default App;

