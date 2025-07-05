import { Button } from "@heroui/button";

interface FooterSocialsProps {
    icon: React.ReactNode;
}

export function FooterSocials({ icon }: FooterSocialsProps) {
    return (
        <Button
            size="sm"
            className="bg-transparent rounded-full"
        >
            {icon}
        </Button>
    )
}