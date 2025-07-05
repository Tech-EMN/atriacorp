# Guia de Estilo Visual - Padrão "White Mode"

Este documento descreve os principais padrões visuais, gradientes e animações utilizados neste projeto. O objetivo é servir como uma referência técnica para a replicação deste estilo em outros projetos.

A identidade visual é construída sobre três pilares: **gradientes suaves**, **micro-animações fluidas** e um efeito **"glassmorphism"** (aparência de vidro).

## Tecnologias Principais

- **TailwindCSS**: Utilizado para a estilização geral e criação do sistema de design.
- **Framer Motion**: Biblioteca de animação que confere fluidez e interatividade aos componentes.
- **HeroUI**: Biblioteca de componentes base para inputs e elementos de interface.

## Paleta de Cores e Gradientes

O estilo "White Mode" é alcançado com um fundo claro, sobre o qual são aplicados gradientes sutis para criar profundidade e pontos de interesse visual.

### Cores Base

- `headerButton`: `#D4D298` (Tom dourado/amarelado, usado em textos e detalhes).
- `textButton`: `#08181F` (Tom de azul quase preto, para textos principais).
- `cinza`: `#8B949E` (Cinza neutro para textos secundários).
- **Cor de Destaque (para gradientes)**: `rgba(34, 103, 133, ...)` (Tom de azul/verde usado com transparência).

### Padrões de Gradiente

1. **Gradiente de Fundo (Background):**
   - **Descrição:** Gradientes radiais suaves que emanam dos cantos ou do topo da página. Eles usam a cor de destaque com alta transparência para não sobrecarregar o fundo branco.
   - **Exemplo (`tailwind.config.js`):**
     ```css
     'teste': 'radial-gradient(120% 120% at 50% 15%, rgba(34,103,133,0.65) 5%, rgba(34,103,133, 0.1) 70%)',
     "card1": "radial-gradient(40% 40% at 100% 100%, rgba(34,103,133,0.35) 0%, rgba(34,103,133,0.00) 60%)",
     ```

2. **Gradiente em Textos:**
   - **Descrição:** Aplicado em títulos e textos de destaque. Utiliza um gradiente linear horizontal que vai do dourado (`headerButton`) ao branco e retorna ao dourado.
   - **Implementação:** O efeito é obtido com as classes `bg-clip-text` e `text-transparent` do Tailwind.
   - **Exemplo (Componente `GradientText`):**
     ```css
     bg-gradient-to-r from-headerButton via-white to-headerButton
     ```

## Animações e Interatividade

As animações são sutis e têm o propósito de melhorar a experiência do usuário, guiando o olhar e fornecendo feedback visual.

### Configurações de Performance

Para melhorar a experiência em dispositivos móveis e usuários que fazem scroll rápido:

- **Duração reduzida:** Animações de revelação passaram de `0.6s` para `0.3s`
- **Movimento reduzido:** Deslocamento inicial reduzido de `y: 20` para `y: 10`
- **Viewport otimizado:** Margem de ativação aumentada para `-100px` em elementos críticos

1. **Animação de "Reveal" (Revelação ao Rolar):**
   - **Descrição:** A maioria dos elementos (cards, textos) não aparece estaticamente na página. Eles são revelados suavemente à medida que o usuário rola a tela.
   - **Implementação:** Utiliza o hook `whileInView` do Framer Motion.
   - **Efeito:** O elemento transiciona de `opacity: 0`, `y: 10` para `opacity: 1`, `y: 0`.
   - **Curva de Animação:** `ease: [0.16, 1, 0.3, 1]` (uma curva de "ease-out" suave e elegante).
   - **Configuração otimizada:**
     ```typescript
     initial={{ opacity: 0, y: 10, scale: 0.98 }}
     whileInView={{ opacity: 1, y: 0, scale: 1 }}
     viewport={{ once: true, margin: "-100px" }}
     transition={{ 
       duration: 0.3, 
       delay: delay * 0.5,
       ease: [0.16, 1, 0.3, 1] 
     }}
     ```

2. **Animação de "Hover" (Interação com o Mouse):**
   - **Descrição:** Aplicada em elementos interativos como os cards. Fornece feedback imediato quando o usuário passa o mouse sobre eles.
   - **Implementação:** Utiliza a propriedade `whileHover` do Framer Motion.
   - **Efeito:** O card levanta sutilmente (`y: -4`) e sua sombra (`boxShadow`) se torna mais intensa, criando uma sensação de profundidade.

## Componente Chave: `GlassCard` (Efeito Vidro)

O componente `GlassCard` é a materialização do estilo "glassmorphism" e combina todos os elementos acima.

- **Fundo:** Um gradiente de branco quase transparente (`from-white/10 via-white/5 to-white/0`).
- **Desfoque:** A classe `backdrop-blur-xl` desfoca o conteúdo que está atrás do card, criando o efeito de vidro fosco.
- **Bordas:** Bordas brancas semi-transparentes (`border-white/20`) para definir os limites do card.
- **Sombra:** Uma sombra escura e difusa (`shadow-2xl shadow-[#0B1F28]/30`) para dar a impressão de que o card está "flutuando" sobre o fundo.
- **Animações:** Inclui as animações de "reveal" e "hover" descritas anteriormente.

## Efeitos Especiais

### 1. Efeito de Brilho (Legendary Card Effect)

Inspirado nas cartas lendárias do Clash Royale, usado em botões de call-to-action importantes:

```typescript
{/* Efeito de brilho animado */}
<motion.div
  className="absolute -inset-1 bg-gradient-to-r from-headerButton via-white to-headerButton rounded-full blur-sm opacity-75"
  animate={{
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>

{/* Brilho pulsante */}
<motion.div
  className="absolute -inset-2 bg-gradient-to-r from-headerButton/50 via-white/50 to-headerButton/50 rounded-full blur-lg"
  animate={{
    scale: [0.8, 1.2, 0.8],
    opacity: [0.3, 0.6, 0.3],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 0.5
  }}
/>
```

### 2. Componente de Gravação de Áudio

Integração com a API Whisper da OpenAI para transcrição automática:

- **Modelo:** `gpt-4o-mini-transcribe`
- **Formato:** `audio/webm`
- **Estados visuais:** Gravando (pulsante vermelho), Processando (spinner azul), Inativo (dourado)
- **Feedback visual:** Animações de escala e cores contextuais

## Responsividade

### Breakpoints Principais

- **Mobile:** `< 768px` - Layout em coluna única, componentes empilhados
- **Tablet:** `768px - 1024px` - Layout híbrido, alguns elementos em grid
- **Desktop:** `> 1024px` - Layout completo com todos os elementos

### Adaptações Específicas

1. **Matriz de Investimento:**
   - Desktop: Tabela tradicional 5x6
   - Mobile: Cards individuais com botões grandes e touch-friendly

2. **Formulários:**
   - Campos com altura mínima de 44px para touch
   - Espaçamento aumentado entre elementos
   - Botões de áudio posicionados de forma acessível

## Estrutura de Cores por Contexto

### Estados de Feedback

- **Sucesso:** Verde (`text-green-500`, `border-green-500/20`)
- **Atenção:** Amarelo (`text-yellow-500`, `border-yellow-500/20`)
- **Erro:** Vermelho (`text-red-500`, `border-red-500/20`)
- **Informação:** Azul (`text-blue-500`, `border-blue-500/20`)
- **Gravação:** Vermelho pulsante para estado ativo

### Hierarquia Visual

1. **Primário:** Dourado (`headerButton`) - CTAs principais
2. **Secundário:** Branco/Transparente - Ações secundárias
3. **Terciário:** Cinza (`cinza`) - Textos de apoio
4. **Destaque:** Azul/Verde (`rgba(34, 103, 133)`) - Elementos de fundo

## Implementação de Formulários

### Validação Inteligente

- **Website:** Auto-completar `https://` e `www.` quando necessário
- **Campos obrigatórios:** Validação em tempo real sem bloquear o usuário
- **Feedback visual:** Bordas coloridas e mensagens contextuais

### Personalização Dinâmica

- Saudações personalizadas usando dados preenchidos anteriormente
- Exemplo: `"Olá, ${nome}. Quais são os principais objetivos da ${empresa} atualmente?"`

## Melhores Práticas

1. **Performance:** Sempre usar `viewport={{ once: true }}` para animações de entrada
2. **Acessibilidade:** Botões com área de toque mínima de 44px
3. **Feedback:** Estados visuais claros para todas as interações
4. **Consistência:** Reutilizar componentes base (`GlassCard`, `MagneticButton`, `GradientText`)
5. **Responsividade:** Testar em dispositivos reais, não apenas no DevTools

## Conclusão

Este padrão visual combina modernidade, funcionalidade e elegância. A chave está na sutileza dos efeitos, na performance das animações e na consistência dos componentes. O resultado é uma interface que se sente premium e profissional, adequada para o público empresarial.

Para replicar este estilo:

1. Configure o TailwindCSS com as cores personalizadas
2. Implemente os componentes base (`GlassCard`, `GradientText`, `MagneticButton`)
3. Use Framer Motion com as configurações de performance otimizadas
4. Teste extensivamente em dispositivos móveis
5. Mantenha a consistência visual em todos os componentes 