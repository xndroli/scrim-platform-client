//import { Session } from 'next-auth';
import React from 'react'

// const Header = ({ session }: { session: Session}) => {
const Header = () => {
    return (
        <header className="admin-header">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {/* {session?.user?.name} */}
                    Welcome, {"Raijin"}
                </h1>
                <p className=" text-general text-muted-foreground mt-1 text-lg">
                    Monitor all of your platform activity here
                </p>
            </div>

            {/* <p>Search</p> */}
        </header>
    );
};

export default Header;