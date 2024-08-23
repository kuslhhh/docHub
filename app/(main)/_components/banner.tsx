"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "convex/react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
    documentId: Id<"documents">;
}

export const Banner = ({
    documentId
} : BannerProps) =>{

    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id:documentId})

        toast.promise(promise, {
            loading: "Deleting doc...",
            success: "doc deleted!",
            error: "failed to delete doc."
        });

        router.push("/documents");
        
    };

    const onRestore = () => {
        const promise = restore({ id:documentId})

        toast.promise(promise, {
            loading: "Restoring doc...",
            success: "doc Restored!",
            error: "failed to Restore doc."
        });
    };


    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center justify-center">
            <p>
                This page is in the Trash.
            </p>
            <Button
                size="sm"
                onClick={onRestore}
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal rounded-sm mx-2"
            >
                Restore Page
            </Button>

            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal rounded-sm mx-2"
                >
                    Delete Forever
                </Button>
            </ConfirmModal>
        </div>

    )
}