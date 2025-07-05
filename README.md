# ATRIA Frontend

Website institucional da ATRIA com sistema de diagnóstico de I.A. e formulário de ideias inovadoras.

## Tecnologias Utilizadas

- [Vite](https://vitejs.dev/guide/) - Build tool e servidor de desenvolvimento
- [React](https://react.dev/) - Biblioteca para interfaces de usuário
- [TypeScript](https://www.typescriptlang.org) - Linguagem tipada baseada em JavaScript
- [HeroUI](https://heroui.com) - Biblioteca de componentes React
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS utility-first
- [Framer Motion](https://www.framer.com/motion) - Biblioteca de animações
- [OpenAI Whisper API](https://openai.com/blog/whisper/) - Transcrição de áudio para texto

## Características Principais

### 🎨 Design System
- **Padrão "White Mode"** com efeito glassmorphism
- **Gradientes sutis** e animações fluidas
- **Responsividade completa** para mobile, tablet e desktop
- **Efeitos especiais** inspirados em cartas lendárias (Clash Royale)

### 🧠 Diagnóstico de I.A.
- **9 etapas** de avaliação de maturidade tecnológica
- **Gravação de áudio** com transcrição automática via OpenAI
- **Validação inteligente** de campos (ex: auto-completar URLs)
- **Personalização dinâmica** de perguntas baseada em respostas anteriores
- **Matriz responsiva** para avaliação de investimentos

### 💡 Sistema de Ideias
- **Formulário interativo** para submissão de ideias
- **Transcrição de áudio** integrada
- **Validação em tempo real**
- **Feedback visual** durante todo o processo

### 🚀 Performance
- **Animações otimizadas** para scroll rápido
- **Lazy loading** de componentes
- **Viewport otimizado** para dispositivos móveis

## Como Instalar e Executar

### Pré-requisitos
- [Bun](https://bun.sh/) instalado na máquina

### Clonar o projeto
```bash
git clone https://github.com/codelabs-usa/atria-frontend.git
cd atria-frontend
```

### Instalar dependências
```bash
bun install
```

### Executar em modo de desenvolvimento
```bash
bun run dev
```

### Build para produção
```bash
bun run build
```

### Preview da build de produção
```bash
bun run preview
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (GlassCard, AudioRecorder, etc.)
│   ├── Diagnostico/    # Sistema completo de diagnóstico
│   ├── TelaIdeia/      # Formulário de submissão de ideias
│   └── ...             # Outros componentes da landing page
├── layouts/            # Layouts da aplicação
├── pages/              # Páginas principais
├── styles/             # Estilos globais
└── utils/              # Utilitários e helpers
```

## Payloads das APIs

### Payload do Diagnóstico
```json
{
  "tipo": "diagnostico",
  "timestamp": "2025-01-24T10:30:00.000Z",
  "dados": {
    "informacoesPessoais": {
      "nome": "Eduardo Nunes",
      "empresa": "Atria",
      "areaAtuacao": "Tecnologia",
      "email": "eduardo@atria.com",
      "telefone": "(11) 99999-9999",
      "website": "https://www.atria.com"
    },
    "respostas": {
      "objetivos": ["reduzir-custos", "melhorar-experiencia"],
      "investimentos": {
        "crm": "alto",
        "atendimento": "medio",
        "vendas": "baixo"
      },
      "ferramentas": "Microsoft Office 365, Slack, Trello",
      "desafios": "Processos manuais demorados e falta de integração",
      "gargalos": "Aprovação manual de orçamentos",
      "metas": "Automatizar 80% dos processos em 12 meses",
      "formasAtualizacao": ["eventos-tech", "parcerias"],
      "definicaoSucesso": "ROI positivo em 12 meses"
    },
    "analise": {
      "pontuacaoMaturidade": 85,
      "areasAvaliadas": 6,
      "objetivosDefinidos": 2,
      "potencialIA": "Alto",
      "statusCompleto": true
    }
  },
  "metadata": {
    "origem": "website_atria",
    "versao": "1.0",
    "userAgent": "Mozilla/5.0...",
    "tempoPreenchimento": "calculado_dinamicamente",
    "etapasCompletadas": 9
  }
}
```

### Payload da Ideia
```json
{
  "tipo": "ideia",
  "timestamp": "2025-01-24T10:30:00.000Z",
  "dados": {
    "contato": {
      "nome": "João Silva",
      "empresa": "TechCorp",
      "email": "joao@techcorp.com",
      "telefone": "(11) 88888-8888"
    },
    "conteudo": {
      "ideia": "Desenvolver um sistema de IA que automatiza...",
      "caracteresTotal": 256
    }
  },
  "metadata": {
    "origem": "website_atria",
    "versao": "1.0",
    "userAgent": "Mozilla/5.0..."
  }
}
```

## Configurações da API de Transcrição

O projeto utiliza a API Whisper da OpenAI para transcrição de áudio:

- **Modelo**: `gpt-4o-mini-transcribe`
- **Formato de áudio**: `audio/webm`
- **Tamanho máximo**: 25MB por arquivo
- **Formatos suportados**: mp3, mp4, mpeg, mpga, m4a, wav, webm

## Scripts Disponíveis

- `bun run dev` - Inicia o servidor de desenvolvimento
- `bun run build` - Gera build de produção
- `bun run preview` - Visualiza a build de produção
- `bun run lint` - Executa o linter
- `bun run type-check` - Verifica tipos TypeScript

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Copyright © 2025 [Codelabs USA LLC](https://codelabsusa.com). Todos os direitos reservados.
