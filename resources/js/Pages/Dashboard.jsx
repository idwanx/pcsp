import App from '@/Layouts/App';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user_role, partai }) {

    return (
        <>
            <Head title="Dashboard" />
            <div className="overflow-x-hidden bg-white">
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    Dashboard Partai
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <App children={page} />