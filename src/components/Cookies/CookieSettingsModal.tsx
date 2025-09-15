import { useEffect, useState } from "react";
import { useCookieContext, ConsentState } from "./CookieProvider";

export default function CookieSettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ctx = useCookieContext();
  const [draft, setDraft] = useState<ConsentState>({
    necessary: true,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    if (ctx.consent) setDraft(ctx.consent);
    else setDraft({ necessary: true, statistics: false, marketing: false });
  }, [ctx.consent, open]);

  if (!open) return null;

  const toggle = (key: keyof ConsentState) => {
    if (key === "necessary") return; // não permite desativar
    setDraft((d) => ({ ...d, [key]: !d[key] }));
  };

  const save = () => {
    ctx.setConsent(draft);
    onClose();
  };

  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div
        className="
          rounded-xl shadow-2xl border border-gray-700
          w-full max-w-[600px] p-5
        "
        style={{
          background: "radial-gradient(70% 70% at 100% 100%, rgba(34,103,133,0.35) 0%, rgba(34,103,133,0.00) 60%)",
          backgroundColor: "#030A0D" // cor de base por trás do gradiente
        }}
      >
        <h2 className="text-lg font-bold text-white mb-2 text-center">
          Configurações de Cookies
        </h2>
        <p className="text-xs text-gray-300 mb-4 text-center">
          Escolha quais categorias de cookies você permite.
        </p>

        <div className="space-y-3">
          {/* Necessários */}
          <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-gray-700">
            <div className="text-gray-200">
              <strong className="text-white block">Necessários</strong>
              <span className="text-xs text-gray-400">
                Essenciais para o funcionamento do site. Sempre ativos.
              </span>
            </div>
            <span className="text-green-400 text-xs font-semibold">Ativo</span>
          </div>

          {/* Estatísticas */}
          <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-gray-700">
            <div className="text-gray-200">
              <strong className="text-white block">Estatísticas</strong>
              <span className="text-xs text-gray-400">
                Usados para entender como os visitantes usam o site (ex.: Google
                Analytics).
              </span>
            </div>
            <button
              onClick={() => toggle("statistics")}
              className={`relative w-10 h-5 flex items-center rounded-full transition-colors ${
                draft.statistics ? "bg-headerButton" : "bg-cinza"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  draft.statistics ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Marketing */}
          <div className="flex items-center justify-between p-3 bg-black/20 rounded border border-gray-700">
            <div className="text-gray-200">
              <strong className="text-white block">Marketing</strong>
              <span className="text-xs text-gray-400">
                Usados para anúncios e remarketing.
              </span>
            </div>
            <button
              onClick={() => toggle("marketing")}
              className={`relative w-10 h-5 flex items-center rounded-full transition-colors ${
                draft.marketing ? "bg-headerButton" : "bg-cinza"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                  draft.marketing ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs border border-cinza rounded text-gray-300 hover:bg-[#1c1e21]"
          >
            Cancelar
          </button>
          <button
            onClick={save}
            className="px-3 py-1 text-xs rounded bg-[#10B981] text-white hover:bg-[#0a8f63]"
          >
            Salvar preferências
          </button>
        </div>
      </div>
    </div>
  );
}
