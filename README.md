# Convite de Casamento (A | E)

Página web interativa e elegante para convite de casamento.

## ✨ Recursos

- 💌 **Envelope Interativo**: Animação suave de abertura de envelope com lacre de cera.
- ⏳ **Contagem Regressiva**: Cronômetro em tempo real até o início da cerimônia.
- 📍 **Como Chegar**: Integração direta com Google Maps para localização do local do evento.
- 📝 **Confirmação de Presença (RSVP)**: Formulário interativo integrado via Supabase com fallback local.
- 📖 **Manual dos Convidados**: Informações sobre trajes, horários e orientações gerais.
- 🎁 **Lista de Presentes & PIX**: Lista com cotas/presentes e botão de cópia de chave PIX.
- 📱 **Mobile-First & Responsivo**: Experiência otimizada para smartphones com suporte a modo claro/escuro.

## 🚀 Como Visualizar

Abra diretamente o arquivo `index.html` em qualquer navegador web, ou publique via **GitHub Pages**, **Vercel** ou **Netlify**.

## Publicação no GitHub Pages e confirmações compartilhadas

O workflow `.github/workflows/pages.yml` publica o convite em `https://joaopedrorodrigues06.github.io/caas/` quando há um push na branch `main`. Para ativar o Pages automaticamente, crie um fine-grained token limitado a este repositório, com permissões **Pages: Read and write** e **Administration: Read and write**, e salve-o como secret `PAGES_TOKEN` em **Settings → Secrets and variables → Actions**. O token só é usado para habilitar o Pages; o deploy usa o token do workflow.

Para que confirmações de todos os convidados apareçam no painel dos noivos:

1. Crie um projeto Supabase e execute [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor.
2. Em **Authentication → Providers → Email**, desative novos cadastros públicos; crie apenas as contas do casal em **Authentication → Users**. O painel usa login por e-mail e senha; não compartilhe credenciais.
3. Em **Settings → Secrets and variables → Actions**, crie `SUPABASE_URL` e `SUPABASE_ANON_KEY` com os valores do projeto Supabase. A chave `service_role` não deve ser usada no site nem armazenada nesses secrets.
4. Execute novamente o workflow **Publish wedding site** ou faça push para `main`.

O link do painel, sem botão de acesso no convite, será `https://joaopedrorodrigues06.github.io/caas/#/painel-dos-noivos`. O endereço só funcionará depois que o Pages estiver habilitado e o workflow publicar o site. Sem os secrets do Supabase, a página entra em modo local e as respostas não são compartilhadas entre aparelhos.
