# Convite de Casamento (A | E)

Página web interativa e elegante para convite de casamento.

## ✨ Recursos

- 💌 **Envelope Interativo**: Animação suave de abertura de envelope com lacre de cera.
- ⏳ **Contagem Regressiva**: Cronômetro em tempo real até o início da cerimônia.
- 📍 **Como Chegar**: Integração direta com Google Maps para localização do local do evento.
- 📝 **Confirmação de Presença (RSVP)**: Formulário compartilhado por API do Vercel e PostgreSQL Neon.
- 📖 **Manual dos Convidados**: Informações sobre trajes, horários e orientações gerais.
- 🎁 **Lista de Presentes & PIX**: Lista com cotas/presentes e botão de cópia de chave PIX.
- 📱 **Mobile-First & Responsivo**: Experiência otimizada para smartphones com suporte a modo claro/escuro.

## 🚀 Como Visualizar

Abra diretamente o arquivo `index.html` em qualquer navegador web, ou publique via **GitHub Pages**, **Vercel** ou **Netlify**.

## Publicação e confirmações compartilhadas

O projeto publica no Vercel por meio de `vercel.json` e `scripts/build-site.mjs`. Os endpoints em `api/` guardam confirmações e escolhas de presentes em PostgreSQL Neon; o banco é conectado ao projeto pela integração gratuita do Vercel Marketplace. Não é necessário configurar Supabase.

Para que confirmações de todos os convidados apareçam no painel dos noivos:

1. Conecte uma instância Neon gratuita ao projeto Vercel e confirme que `DATABASE_URL` está disponível no ambiente Production. As tabelas são criadas automaticamente na primeira requisição.
2. Defina `ADMIN_PASSWORD` (senha privada do casal) e `SESSION_SECRET` (segredo aleatório) como variáveis de ambiente Production e faça redeploy.
3. Confirmações de presença são compartilhadas e só aparecem no painel privado `/#/painel-dos-noivos`, protegido pela senha do casal. A lista pública mostra presentes disponíveis ou já escolhidos e atualiza automaticamente.

O link do painel, sem botão de acesso no convite, é `https://caas-nine-phi.vercel.app/#/painel-dos-noivos`. Com o banco configurado, ele mostra as respostas de qualquer aparelho e atualiza automaticamente a cada 15 segundos. Dados antigos de teste guardados no `localStorage` são removidos ao abrir a nova versão.
