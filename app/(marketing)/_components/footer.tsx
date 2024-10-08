import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background
        z-50 dark:bg-[#1F1F1F]">
            <Logo/>
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 test-muted-foreground">
            <Button variant="ghost" size="sm">
                    developed by                                                    
                    <a
                        href="https://kuslh.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold ml-1"
                    >
                        Kushal
                    </a>
                </Button>
            </div>
        </div>
    );
}