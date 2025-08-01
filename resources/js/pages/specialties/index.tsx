import { Button } from '@/components/cat-ui/button';
import { DeleteItem } from '@/components/delete-item';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, SquarePen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Especialty {
    id: bigint;
    name: string;
    slug: string;
    can_attend: number;
}

export default function Index({ specialties }: { specialties: Especialty[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Especialidades" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="items-center p-6">
                            <div className="mb-6 sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold">Especialidades</h1>
                                    <p className="mt-2 text-sm">Lista de especialidades cadastradas no sistema.</p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Button outline={true} href={route('specialties.create')}>
                                        <Sparkles className="size-3" />
                                        Nova Especialidade
                                    </Button>
                                </div>
                            </div>
                            {!specialties.length ? (
                                <p className="mt-12 text-center">Nenhuma especialidade cadastrada ainda</p>
                            ) : (
                                <ul role="list" className="mt-8">
                                    <li className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                                        {specialties.map((specialty) => (
                                            <div className="col-span-1 my-2 rounded-md border border-neutral-500" key={specialty.id}>
                                                <div className="flex items-center justify-between px-4 py-3.5">
                                                    <p className="text-md leading-6 font-medium dark:text-neutral-200">
                                                        {specialty.name}:{' '}
                                                        <span className="ml-2 text-neutral-700 dark:text-neutral-300">{specialty.can_attend}</span>
                                                    </p>
                                                    <div className="flex items-center space-x-2.5">
                                                        <Link href={route('specialties.edit', specialty.slug)}>
                                                            <SquarePen className="size-4 text-green-600 hover:text-green-400" />
                                                        </Link>
                                                        <DeleteItem
                                                            item={specialty}
                                                            path="specialties.destroy"
                                                            text={`A especialidade ${specialty.name} será excluída permanentemente. Deseja continuar?`}
                                                            key={specialty.id}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
