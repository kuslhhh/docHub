"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle 
} from "@/components/ui/dialog";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";

import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
    const params = useParams();
    const { edgestore } = useEdgeStore();
    const coverImage = useCoverImage();
    const update = useMutation(api.documents.update);

    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            try {
                const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: coverImage.url
                    }
                }); 

                await update({
                    id: params.documentId as Id<"documents">,
                    coverImage: res.url
                });

                onClose();
            } catch (error) {
                console.error("Error uploading file:", error);
                setIsSubmitting(false);
            }
        }
    }

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent aria-describedby="cover-image-modal-description">
                <DialogHeader>
                    <DialogTitle>Cover Image</DialogTitle> {}
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    )
}
