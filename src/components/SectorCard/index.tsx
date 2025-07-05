interface CardProps {
    icon: React.ReactNode
    title: string
    description: string
}

export function SectorCard({ icon, title, description }: CardProps) {
    return (
        <div className="flex flex-col gap-6 p-6 bg-teste">
            <span className="rounded-full border border-white/30 bg-white/10 p-2 w-fit">
                {icon}
            </span>

            <span className="text-2xl font-semibold text-white">
                {title}
            </span>

            <span className="text-lg font-normal text-[#8B949E]">
                {description}
            </span>
        </div>
    )
}