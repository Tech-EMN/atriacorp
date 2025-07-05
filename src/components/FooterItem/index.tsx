import { Button } from "@heroui/button";

interface FooterItemProps {
    item: string;
    onClick?: () => void;
}

export function FooterItem({ item, onClick }: FooterItemProps) {
    return (
        <Button
            disableAnimation
            disableRipple
            className="bg-transparent text-white text-xs md:text-sm font-medium"
            size="sm"
            onPress={onClick}
        >
            {item}
        </Button>
    )
}