
import React from 'react';
import { Footer } from '@/components/Footer';


export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#030A0D]">
      <main className="flex-1 flex justify-center items-start pt-40 pb-20 px-4">
        <section className="w-full max-w-3xl text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidade</h1>
          <p className="mb-4">
            Esta é uma política de privacidade padrão. Em breve, o conteúdo completo será disponibilizado aqui.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">1. Introdução</h2>
          <p className="mb-4">
            Sua privacidade é importante para nós. Esta página descreve como coletamos, usamos e protegemos suas informações.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">2. Coleta de Informações</h2>
          <p className="mb-4">
            Podemos coletar informações pessoais e não pessoais para melhorar sua experiência em nosso site.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">3. Uso das Informações</h2>
          <p className="mb-4">
            As informações coletadas são utilizadas para fornecer e aprimorar nossos serviços.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">4. Compartilhamento de Informações</h2>
          <p className="mb-4">
            Não compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">5. Segurança</h2>
          <p className="mb-4">
            Adotamos medidas de segurança para proteger suas informações.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">6. Alterações nesta Política</h2>
          <p className="mb-4">
            Podemos atualizar esta política periodicamente. Recomendamos que você revise esta página regularmente.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-2">7. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta política, entre em contato conosco.
          </p>
        </section>
      </main>
      <Footer isMobile={false} scrollToSection={() => {}} />
    </div>
  );
}
