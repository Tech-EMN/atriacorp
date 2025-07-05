interface CardProps {
    icon: React.ReactNode
    intro: string
    title: string
    description: string
    border: string
}

export function SolutionCard({ icon, intro, title, description, border }: CardProps) {
    return (
        <div className={`flex flex-col gap-6 p-6 ${border} border-white/10`}>
            <h1 className="flex items-center gap-2 text-headerButton font-semibold text-sm">
                {icon}
                {intro}
            </h1>

            <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold text-white">
                    {title}
                </span>

                <span className="text-sm font-normal text-gray-400">
                    {description}
                </span>
            </div>
        </div>
    )
}