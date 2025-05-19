import { neon } from '@neondatabase/serverless';

export function setupRealtimeListener(callback: (msg: any) => void) {
    const conn = neon(process.env.DATABASE_URL!);
    conn.connect().then((socket) => {
        socket.on('notification', callback);
        socket.query('LISTEN scrim_updates');
    });
    
    return () => conn.end();
}