import App from '@/Layouts/App';
import { Head } from '@inertiajs/react';

export default function DashboardAdmin(props) {
    const {auth} = props

    return (
        <>
            <Head title="Dashboard" />
            <div className="overflow-x-hidden bg-white">
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    Dashboard Admin
                </div>
            </div>
        </>
    );
}

DashboardAdmin.layout = page => <App children={page} />