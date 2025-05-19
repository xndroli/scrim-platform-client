import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import React from 'react';
import { sampleEvents } from '@/constants';
import EventList from '@/components/EventList';

const Page = () => {
    return (
        <>
            <form action={async () => {
                'use server';

                await signOut();
                }}
                className="mb-10"
            >
                <Button>Logout</Button>
            </form>

            <EventList title="Enrolled Events" events={sampleEvents as any[]} />
        </>
    )
};

export default Page;