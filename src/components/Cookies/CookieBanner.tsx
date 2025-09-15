import { useCookieContext } from "./CookieProvider";

export default function CookieBanner() {
  const ctx = useCookieContext();
  if (ctx.consent !== null) return null;

  const acceptAll = () => ctx.setConsent({ necessary: true, statistics: true, marketing: true });
  const rejectAll = () => ctx.setConsent({ necessary: true, statistics: false, marketing: false });

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="
    fixed bottom-4 left-4 z-50
    w-[calc(100%-2rem)] max-w-[450px] max-h-[300px]
    rounded-xl shadow-2xl overflow-hidden
    border border-cinza
  "
  style={{
    background: "radial-gradient(100% 100% at 30% 70%, rgba(34,103,133,0.35) 0%, rgba(34,103,133,0.00) 60%)",
    backgroundColor: "#030A0D" // cor de base por trás do gradiente
  }}
    >
      {/* Cabeçalho com título centralizado e X à direita */}
      <div className="relative px-3 py-2 border-b border-gray-100">
        <h2 className="text-center text-sm font-bold text-white leading-none">
          Você controla a sua privacidade
        </h2>
        <button
          aria-label="Fechar"
          onClick={rejectAll}
          className="absolute right-2 top-1 text-gray-400 hover:text-gray-200 text-lg leading-none"
        >
          &times;
        </button>
      </div>

      {/* Conteúdo com rolagem se necessário */}
      <div className="p-3 overflow-y-auto">
        {/* 1 coluna no mobile, 2 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          {/* Coluna esquerda - texto/links */}
          <div>
            <p className="text-[11px] text-cinza leading-snug">
              Nós utilizamos cookies para lhe oferecer uma jornada personalizada em nosso site.
              Utilize as opções abaixo para configurar suas preferências sobre esse assunto.
            </p>

            <div className="mt-2 space-y-1">
              <a
                href="#"
                className="block text-[12px] text-headerButton hover:underline"
              >
                Política de privacidade
              </a>
              <a
                href="mailto:dpo@atriacorp.com.br"
                className="block text-[12px] text-headerButton hover:underline break-all"
              >
                dpo@atriacorp.com.br
              </a>
            </div>

            <p className="mt-2 text-[10px] text-cinza">
              Desenvolvido por <span className="font-semibold">Atria</span>
            </p>
          </div>

          {/* Coluna direita - botões */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => ctx.openSettings()}
              className="w-full h-8 rounded-md bg-headerButton text-Button text-[12px] font-medium hover:bg-[#aaa979]"
            >
              Customizar
            </button>
            <button
              onClick={rejectAll}
              className="w-full h-8 rounded-md bg-headerButton text-Button text-[12px] font-medium hover:bg-[#aaa979]"
            >
              Rejeitar
            </button>
            <button
              onClick={acceptAll}
              className="w-full h-8 rounded-md bg-[#10B981] text-white text-[12px] font-medium hover:bg-[#0a8f63] transition"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
