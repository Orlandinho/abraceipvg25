import { Button } from '@/components/cat-ui/button';
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/cat-ui/dialog';
import { Link } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

export function DeleteItem({ item, text, path }: { item: object; text: string; path: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button type="button" className="cursor-pointer p-2" onClick={() => setIsOpen(true)}>
                <TrashIcon className="size-4 text-red-600 hover:text-red-400" />
            </button>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>ATENÇÃO</DialogTitle>
                <DialogDescription>{text}</DialogDescription>

                <DialogActions>
                    <Button plain className="cursor-pointer" onClick={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
                    <Link
                        as="button"
                        href={route(path, item.id)}
                        method="delete"
                        preserveScroll={true}
                        className="inline-flex w-full cursor-pointer justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-2 sm:w-auto"
                    >
                        Excluir
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
}
