interface CardProps {
    icon: React.ReactNode
    title: string
    description: string
    border?: string
}

export function TipCard({ icon, title, description, border }: CardProps) {
    return (
        <div className={`flex flex-col gap-6 p-6 ${border} border-white/10`}>
            {icon}

            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#8B949E]">
                    {title}
                </span>

                <span className="text-md font-semibold text-white">
                    {description}
                </span>
            </div>
        </div>
    )
}