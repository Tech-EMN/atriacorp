import { Button } from "@heroui/button"

interface HeaderItemProps {
    item: string
    onClick?: () => void
}

export function HeaderItem({ item, onClick }: HeaderItemProps) {
    return (
        <Button
            disableAnimation
            disableRipple
            className="text-white font-semibold text-sm"
            size="sm"
            onPress={onClick}
        >
            {item}
        </Button>
    )
}