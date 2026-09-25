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
- `description`: descrição curta exibida no desktop; no mobile, ficam apenas nome e ação.
- `icon`: `bag`, `tech` ou `sparkles`.
- `tone`: `orange`, `blue` ou `rose`.
- `href`: convite HTTPS de `chat.whatsapp.com`.

A ordem da lista define a ordem na página. Remova um objeto para remover um grupo. Lista e layout se adaptam sem alterações nos componentes. Mais grupos aumentam naturalmente a rolagem. Os convites abrem na mesma aba, preservando o fluxo dos navegadores internos das redes sociais.

Execute novamente o build após alterações. Se mudar os grupos ou a identidade, regenere também a imagem social.

## Organização

```text
src/
  components/       Brand, Icon e GroupCard
  data/             grupos e metadados da marca
  lib/              eventos de analytics e validação de convites
  App.tsx           composição da página
  main.tsx          renderização/hidratação e visita
  styles.css        identidade visual e responsividade
public/
  fonts/            DM Sans local e licença OFL
  favicon.svg
  apple-touch-icon.png
  og-image.png      imagem social de 1200 × 630
scripts/            metadados, pré-renderização, assets e verificação de publicação
tests/              testes de navegador e fixtures isoladas
```

## Design e experiência

Fundo marfim, texto escuro e laranja queimado como assinatura. A marca em SVG remete a um achado. As cores dos grupos ajudam a distinguir categorias, sem serem a única forma de identificação.

No celular, a ordem é marca, frase principal, uma linha sobre ofertas no WhatsApp e três botões de grupo. Cada opção tem fundo preenchido, nome legível, “Entrar no grupo” e seta. Descrições, selos e frases de apoio foram retirados do mobile para antecipar a escolha. No desktop, a introdução e a lista dividem a largura disponível, e os grupos também exibem uma descrição curta. Cada botão é um único link, com área de toque ampla, nome acessível, foco visível e feedback de interação. Não há navegação intermediária, contagem fictícia de participantes ou urgência artificial.

O conteúdo principal chega no HTML inicial. Mesmo sem JavaScript, os convites configurados continuam navegáveis. A hidratação acrescenta os eventos; os estilos atendem `prefers-reduced-motion`. Não há animações automáticas nem requisições externas de fontes.

## Analytics

[src/lib/analytics.ts](src/lib/analytics.ts) é o ponto único de integração. São emitidos eventos DOM `garimpo:analytics`:

| Evento        | Propriedades                                        |
| ------------- | --------------------------------------------------- |
| `page_view`   | `page: '/'`                                         |
| `group_click` | `group_id`, `group_name`, `destination: 'whatsapp'` |

É possível integrar GA, Plausible, PostHog ou Meta diretamente em `trackEvent`, ou instalar um listener **antes de a aplicação iniciar**. Exemplo de listener em um módulo importado antes de `main.tsx`:

```ts
import type { AnalyticsEvent } from './lib/analytics'

window.addEventListener('garimpo:analytics', (event) => {
  const { name, properties } = (event as CustomEvent<AnalyticsEvent>).detail
  // Envie name e properties ao provedor escolhido.
})
```

Para links externos, use o mecanismo de transporte apropriado do provedor, como beacon, para preservar o evento durante a navegação. Não aguarde uma requisição nem bloqueie a entrada no WhatsApp.

A conversão por grupo pode ser calculada como cliques/visitas. O clique mede a intenção de entrada; esta página não confirma a participação dentro do WhatsApp. Não há cookies, armazenamento ou envio de analytics por padrão. Ajuste os avisos de privacidade quando integrar um provedor.

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

Os testes verificam acessibilidade com axe, navegação por teclado, movimento reduzido, ausência de erros no console, assets, HTML sem JavaScript e larguras de 320 a 1920 px. CTAs e eventos são testados com convites sintéticos em `tests/fixtures/`, fora do build. A navegação desses convites é interceptada; nenhum convite fictício é publicado.

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

Referências oficiais: [deploy estático do Vite](https://vite.dev/guide/static-deploy.html), [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite) e [Vite na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/).
