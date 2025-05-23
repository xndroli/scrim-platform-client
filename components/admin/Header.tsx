//import { Session } from 'next-auth';
import React from 'react'

// const Header = ({ session }: { session: Session}) => {
const Header = () => {
    return (
        <header className="admin-header">
            <div>
                <h2 className="text-2xl font-semibold text-dark-400">
                    {/* {session?.user?.name} */}
                    {"Raijin"}
                </h2>
                <p className="text-general text-slate-500">
                    Monitor all of your users and scrims here
                </p>
            </div>

            <p>Search</p>
        </header>
    );
};

export default Header;