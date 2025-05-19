import AccountRequests from '@/components/admin/AccountRequests';
import EventRequests from '@/components/admin/EventRequests';
import Statistics from '@/components/admin/Statistics';
import React from 'react'

const AdminDashboardPage = () => {
    return (
        <div className="absolute top-0 bg-[#F8F8FF] rounded">
            Admin Dashboard
            <div>
                <Statistics />
            </div>

            <div>
                <EventRequests />
                <AccountRequests />
            </div>
        </div>
    )
};

export default AdminDashboardPage;