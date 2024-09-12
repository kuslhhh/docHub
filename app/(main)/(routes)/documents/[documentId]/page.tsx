"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer2 } from "@/app/(marketing)/_components/footer2";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
    // Dynamically import the Editor component
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);

    // Query the document data by ID
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId,
    });

    // Mutation for updating the document content
    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content,
        });
    };

    // Skeleton loading state
    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w[50%]" />
                        <Skeleton className="h-4 w[80%]" />
                        <Skeleton className="h-4 w[40%]" />
                        <Skeleton className="h-4 w[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    // If document not found
    if (document === null) {
        return <div>Not found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main content */}
            <div className="flex-grow pb-40">
                <Cover url={document.coverImage} />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                    <Toolbar initialData={document} />
                    <Editor onChange={onChange} initialContent={document.content} />
                </div>
            </div>

            {/* Footer stays at the bottom */}
            <Footer2 />
        </div>
    );
};

export default DocumentIdPage;
