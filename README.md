# Convite de Casamento (A | E)

Página web interativa e elegante para convite de casamento.

## ✨ Recursos

- 💌 **Envelope Interativo**: Animação suave de abertura de envelope com lacre de cera.
- ⏳ **Contagem Regressiva**: Cronômetro em tempo real até o início da cerimônia.
- 📍 **Como Chegar**: Integração direta com Google Maps para localização do local do evento.
- 📝 **Confirmação de Presença (RSVP)**: Formulário compartilhado via Supabase.
- 📖 **Manual dos Convidados**: Informações sobre trajes, horários e orientações gerais.
- 🎁 **Lista de Presentes & PIX**: Lista com cotas/presentes e botão de cópia de chave PIX.
- 📱 **Mobile-First & Responsivo**: Experiência otimizada para smartphones com suporte a modo claro/escuro.

## 🚀 Como Visualizar

Abra diretamente o arquivo `index.html` em qualquer navegador web, ou publique via **GitHub Pages**, **Vercel** ou **Netlify**.

## Publicação e confirmações compartilhadas

O projeto publica no Vercel por meio de `vercel.json` e `scripts/build-site.mjs`. Defina `SUPABASE_URL` e `SUPABASE_ANON_KEY` como variáveis de ambiente Production no projeto Vercel; o build grava esses valores em `config.js` dentro da pasta de saída. O workflow opcional `.github/workflows/pages.yml` pode publicar pelo GitHub Pages se for iniciado manualmente e o secret `PAGES_TOKEN` estiver configurado.

Para que confirmações de todos os convidados apareçam no painel dos noivos:

1. Crie um projeto Supabase e execute [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor. Para limpar os dados de teste já existentes no projeto, execute [`supabase/reset-test-data.sql`](supabase/reset-test-data.sql) uma única vez.
2. Em **Authentication → Providers → Email**, desative novos cadastros públicos; crie apenas as contas do casal em **Authentication → Users**. O painel usa login por e-mail e senha; não compartilhe credenciais.
3. Em **Vercel → Project → Settings → Environment Variables**, crie `SUPABASE_URL` e `SUPABASE_ANON_KEY` para Production e faça um redeploy. Para GitHub Pages, adicione esses nomes como Actions secrets no repositório. Use a publishable/anon key, nunca a `service_role`.
4. Sem as duas variáveis, o site não salva confirmações nem escolhas localmente; ele informa que o banco ainda não está disponível. Assim os dispositivos não mostram listas diferentes nem indicam falsamente que a resposta foi registrada.

O link do painel, sem botão de acesso no convite, é `https://caas-nine-phi.vercel.app/#/painel-dos-noivos`. Com o banco configurado, ele mostra as respostas de qualquer aparelho e atualiza automaticamente a cada 15 segundos. Os dados antigos de teste guardados no `localStorage` são removidos quando cada aparelho abre a nova versão.
