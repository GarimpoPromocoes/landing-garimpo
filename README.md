# Garimpo Promoções

Landing page oficial pensada para o fluxo **link da bio → escolher grupo → WhatsApp**.

React + TypeScript + Vite, CSS próprio, fonte local e HTML pré-renderizado. Sem backend, roteador, biblioteca de ícones ou plataforma de analytics obrigatória.

## Executar

Requisito: Node.js **22.18+** (a versão 22 está em `.nvmrc`).

```sh
npm ci
npm run dev
```

Abra o endereço exibido no terminal, normalmente http://localhost:5173.

```sh
npm run build
npm run preview
```

O build cria `dist/`, incluindo o conteúdo pré-renderizado, os metadados e os arquivos públicos. O servidor de preview é apenas para validação local.

## Configuração necessária antes de publicar

Os três convites oficiais já estão configurados. **Falta definir o domínio de produção.**

1. Confira os convites configurados em [src/data/groups.ts](src/data/groups.ts).
2. Copie `.env.example` para `.env.local` e defina `VITE_SITE_URL` com a origem HTTPS oficial, sem caminho.
3. Execute `npm run check:production`.
4. Abra cada convite no WhatsApp e confirme nome do grupo e validade. A checagem automatizada verifica o formato, não se o convite está ativo.

Enquanto o convite estiver vazio ou inválido, o card exibe “Em breve no WhatsApp” e não cria um link. Ao cadastrar um convite válido, o CTA “Entrar no grupo” é ativado automaticamente.

Sem domínio configurado, o build local funciona, mas fica com `noindex`, `robots.txt` bloqueado e sem canonical. Com o domínio, canonical, Open Graph, sitemap e robots são gerados automaticamente. Para previews de branches, mantenha `VITE_SITE_URL` vazio; configure-o somente no ambiente de produção.

## Alterar links e adicionar grupos

Todos os grupos ficam em [src/data/groups.ts](src/data/groups.ts). Para trocar um convite, altere apenas `href`.

Para adicionar um grupo, acrescente um objeto à lista:

```ts
{
  id: 'games',
  name: 'Garimpo Games',
  description: 'Jogos, consoles e acessórios para jogar mais.',
  icon: 'tech',
  tone: 'blue',
  href: '', // Cole aqui o convite oficial completo.
},
```

- `id`: único e estável; identifica o grupo nos eventos.
- `name`: nome exibido em todos os tamanhos de tela.
- `description`: descrição curta, exibida no card em todos os tamanhos de tela.
- `icon`: `bag`, `tech` ou `sparkles`.
- `tone`: `orange`, `blue` ou `rose`.
- `href`: convite HTTPS de `chat.whatsapp.com`.

A ordem da lista define a ordem na página. Remova um objeto para remover um grupo. Lista e layout se adaptam sem alterações nos componentes. Mais grupos aumentam naturalmente a rolagem. Os convites abrem na mesma aba, preservando o fluxo dos navegadores internos das redes sociais.

Execute novamente o build após alterações. Se mudar os grupos ou a identidade, regenere também a imagem social.

### Vagas restantes (opcional)

Grupos do WhatsApp têm limite de participantes. Para mostrar a barra de vagas de um grupo, informe o número **real** de participantes (visível nas informações do grupo no WhatsApp):

```ts
{ id: 'general', /* … */ members: 812 }
```

O card passa a exibir “212 vagas restantes” e uma barra de preenchimento, calculados com `groupCapacity` em [src/data/site.ts](src/data/site.ts). Confira esse limite no WhatsApp antes de usar. Sem `members`, nenhuma contagem aparece. Lembre-se de atualizar o número a cada build; um valor desatualizado vira urgência falsa.

## Promoções de exemplo

A seção “O que te espera lá dentro” vem de [src/data/promos.ts](src/data/promos.ts). Cada oferta informa `name`, `image`, `from` (preço anterior), `price`, `groupId` e, se houver, `coupon`. O percentual de desconto é calculado a partir dos dois preços.

- A **primeira** oferta da lista aparece na mensagem do celular, com nome, preço, preço anterior, desconto e cupom. As demais ficam guardadas para quando você trocar a ordem.
- Imagens ficam em `public/promos/` (cerca de 240 px de largura bastam).
- Use nomes curtos; o nome aparece na mensagem do celular.
- A mensagem não é um link: é um exemplo do que chega no grupo, e o aviso abaixo lembra que preços e cupons mudam. Troque o exemplo de tempos em tempos e use só ofertas que realmente passaram pelos grupos.
- Para ocultar a seção, deixe a lista vazia.

## Organização

```text
src/
  components/       Brand, Icon, Hero, JoinButton, Showcase, GroupCard, Reasons e ClosingCta
  data/             grupos, promoções de exemplo e metadados da marca
  lib/              analytics, validação de convites e formatação de preços
  App.tsx           composição da página
  main.tsx          renderização/hidratação e visita
  styles.css        identidade visual e responsividade
public/
  art/              logo, mascote (topo, rodapé e avatar) e foto do depoimento, em WebP
  fonts/            DM Sans local e licença OFL
  promos/           imagens das promoções de exemplo
  favicon.svg
  apple-touch-icon.png
  og-image.png      imagem social de 1200 × 630
scripts/            metadados, pré-renderização, assets e verificação de publicação
tests/              testes de navegador e fixtures isoladas
```

## Design e experiência

Fundo escuro com brilho dourado, títulos com destaque em dourado e botões verdes de WhatsApp. A mascote mineradora aparece no topo e no convite final. As cores dos grupos (laranja, azul e rosa) ajudam a distinguir categorias, sem serem a única forma de identificação.

Ordem da página, igual no celular e no desktop:

1. **Topo**: logo, mascote, “Achados reais. Preços baixos.”, botão verde para o primeiro grupo ativo e “Ver grupos”, que rola até a lista.
2. **O que te espera lá dentro**: celular com uma oferta real no formato das mensagens do grupo e o balão “Achados como esse todos os dias no grupo!”.
3. **Escolha seu grupo**: um card por grupo. No celular, cards em linha com ícone, nome, descrição e seta; no desktop, três colunas com o botão “Entrar agora”.
4. **Por que entrar?**: descontos reais, sem enrolação e grupos ativos.
5. **Entre agora e aproveite**: mascote apontando e o botão verde.

O celular, os ícones, os cards e os botões são feitos em código. Apenas logo, mascote e foto são imagens, em `public/art/`. Para trocar uma arte, substitua o arquivo mantendo o nome. Se as proporções mudarem, ajuste `width` e `height` nos componentes. As artes atuais são recortes pequenos (a mascote do topo tem 339 px de largura) e ficam um pouco suaves em telas de alta densidade. Versões maiores melhoram a nitidez sem mexer no código.

O conteúdo principal chega no HTML inicial. Mesmo sem JavaScript, os convites configurados continuam navegáveis. A hidratação acrescenta os eventos; os estilos atendem `prefers-reduced-motion`. Não há animações automáticas nem requisições externas de fontes.

## Analytics

### Vercel Web Analytics

O pacote `@vercel/analytics` mede visitas, visitantes, páginas, origem do tráfego, país, navegador e dispositivo, sem cookies. O script é injetado apenas em builds feitos na Vercel (`VERCEL=1`). Localmente e nos testes, nada é carregado.

Para ativar: no painel da Vercel, abra o projeto, entre em **Analytics** e clique em **Enable**. Depois, faça um novo deploy. Os dados aparecem na mesma aba após as primeiras visitas. Bloqueadores de anúncio podem impedir parte da contagem.

No plano Hobby, o painel mostra apenas visitas. Eventos personalizados, como `group_click`, exigem o plano Pro e por isso não são enviados à Vercel.

### Eventos internos

[src/lib/analytics.ts](src/lib/analytics.ts) é o ponto único de integração. São emitidos eventos DOM `garimpo:analytics`:

| Evento        | Propriedades                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------- |
| `page_view`   | `page: '/'`                                                                                  |
| `group_click` | `group_id`, `group_name`, `destination: 'whatsapp'`, `source: 'hero' \| 'list' \| 'closing'` |

`source` indica se o clique veio do botão do topo, da lista de grupos ou do convite final.

É possível integrar GA, Plausible, PostHog ou Meta diretamente em `trackEvent`, ou instalar um listener **antes de a aplicação iniciar**. Exemplo de listener em um módulo importado antes de `main.tsx`:

```ts
import type { AnalyticsEvent } from './lib/analytics'

window.addEventListener('garimpo:analytics', (event) => {
  const { name, properties } = (event as CustomEvent<AnalyticsEvent>).detail
  // Envie name e properties ao provedor escolhido.
})
```

Para links externos, use o mecanismo de transporte apropriado do provedor, como beacon, para preservar o evento durante a navegação. Não aguarde uma requisição nem bloqueie a entrada no WhatsApp.

A conversão por grupo pode ser calculada como cliques/visitas. O clique mede a intenção de entrada; esta página não confirma a participação dentro do WhatsApp. Os eventos `garimpo:analytics` não usam cookies, armazenamento nem rede. Ajuste os avisos de privacidade quando integrar outro provedor.

## SEO e compartilhamento

Textos em [src/data/site.ts](src/data/site.ts). Metadados são inseridos no HTML durante o build, para leitura por crawlers sem JavaScript:

- title, description, idioma, viewport e theme-color;
- canonical e og:url com domínio configurado;
- Open Graph e Twitter/X Cards, imagem PNG e texto alternativo;
- favicon SVG, ícone Apple, robots.txt e sitemap.xml.

A imagem social e o ícone Apple já estão no repositório. Para regenerar:

```sh
npx playwright install chromium
npm run assets
npm run build
```

A composição fica em `scripts/generate-assets.mjs`; os nomes dos grupos vêm da mesma configuração da página. O PNG social é carregado por plataformas de compartilhamento e não pesa na renderização da landing page.

## Validação

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npx playwright install chromium
npm run test:e2e
npm run check:production
```

Os testes verificam acessibilidade com axe, navegação por teclado, movimento reduzido, ausência de erros no console, assets, HTML sem JavaScript, larguras de 320 a 1920 px, a seção de promoções (desconto, preços, cupom e imagens), a barra de vagas e a origem dos cliques. CTAs e eventos são testados com convites sintéticos em `tests/fixtures/`, fora do build. A navegação desses convites é interceptada; nenhum convite fictício é publicado.

`check:production` falha de propósito enquanto faltar domínio ou convite. Não confunda o sucesso do build de desenvolvimento com a liberação para publicação.

## Deploy

A saída é inteiramente estática. Não precisa de um servidor Node em produção.

Na Vercel, Netlify ou outra hospedagem estática, conecte o repositório e configure:

| Campo                | Valor                                       |
| -------------------- | ------------------------------------------- |
| Versão de Node       | 22.18+                                      |
| Instalação           | `npm ci`                                    |
| Build de produção    | `npm run check:production && npm run build` |
| Diretório publicado  | `dist`                                      |
| Variável de produção | `VITE_SITE_URL=https://DOMINIO-OFICIAL`     |

Para um preview sem domínio de produção, use somente `npm run build` e deixe a variável do domínio vazia. Publique na raiz de um domínio ou subdomínio; esta configuração não é destinada a subpastas.

Depois de vincular o domínio e ativar HTTPS, confira `/robots.txt`, `/sitemap.xml`, `/og-image.png` e os três convites no celular. Use cache longo para `/assets/` (nomes com hash) e revalidação para HTML e assets sem hash. Não é necessário configurar redirecionamentos de SPA, pois existe apenas a rota principal.

## Segurança

O site é estático. Não tem servidor, banco de dados, formulários, login nem segredos no build. `VITE_SITE_URL` é pública. Nunca coloque chaves em variáveis `VITE_*`: o Vite as inclui no JavaScript enviado ao navegador. Só o conteúdo de `dist/` é publicado. Arquivos como `.env`, `.git` e `src/` nunca chegam ao servidor, e qualquer caminho inexistente responde 404.

[vercel.json](vercel.json) aplica a todas as respostas:

| Cabeçalho                    | Efeito                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `Content-Security-Policy`    | Só scripts, estilos, imagens, fontes e conexões do próprio domínio; sem iframes. |
| `Strict-Transport-Security`  | O navegador passa a usar apenas HTTPS.                                           |
| `X-Frame-Options`            | Impede exibir a página dentro de outro site (clickjacking).                      |
| `X-Content-Type-Options`     | Impede o navegador de adivinhar o tipo de arquivo.                               |
| `Referrer-Policy`            | Outros sites recebem só o domínio de origem, sem o caminho.                      |
| `Cross-Origin-Opener-Policy` | Isola a janela de páginas abertas por outros domínios.                           |
| `Permissions-Policy`         | Bloqueia câmera, microfone, localização, pagamentos e portas USB/serial.         |

O `vite preview` repete esses cabeçalhos, então os testes E2E falham se a CSP bloquear algo da página. Ao adicionar um script, imagem ou serviço externo, inclua o domínio na diretiva correspondente da CSP. A barra de ferramentas da Vercel nos deploys de preview fica bloqueada pela CSP; isso não afeta a produção.

No painel da Vercel, em **Firewall**, ative a proteção contra bots (**Bot Protection**). Robôs verificados, como Google e o preview de links do WhatsApp, continuam liberados. Em caso de ataque, ative **Attack Challenge Mode** na mesma tela.

`npm run dev` e `npm run preview` escutam em `0.0.0.0`, ou seja, ficam acessíveis a outros aparelhos da mesma rede. Use apenas em redes confiáveis e nunca publique o site com `npm start`. Rode `npm audit` periodicamente.

Referências oficiais: [deploy estático do Vite](https://vite.dev/guide/static-deploy.html), [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite) e [Vite na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/).
