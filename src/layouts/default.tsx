import { Header } from "@/components/Header";

export default function DefaultLayout({
  children,
  scrollToSection,
  onOpenDiagnostico,
}: {
  children: React.ReactNode;
  scrollToSection?: (sectionId: string) => void;
  onOpenDiagnostico?: () => void;
}) {
  return (
    <>
      <Header scrollToSection={scrollToSection} onOpenDiagnostico={onOpenDiagnostico} />
      <div className="relative flex flex-col h-screen bg-[#030A0D]">
        {children}
      </div>
    </>
  );
}
