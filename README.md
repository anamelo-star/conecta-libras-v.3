# Conecta Libras

App React + TypeScript + Vite. Libras → Português (câmera), Português → Libras (vídeos cadastrados), Voz → Libras, Atendimento médico, Emergência, Dicionário, Favoritos, Acessibilidade.

## Publicar sem instalar nada (GitHub + Vercel)
**Importante:** o arquivo `package.json` precisa ficar na RAIZ do repositório (primeira tela do GitHub), não dentro de uma subpasta. Este ZIP já tem os arquivos soltos na raiz.

1. **Extraia o ZIP** (botão direito → Extrair tudo). Abra a pasta criada: você deve ver `package.json`, `index.html`, `src`, etc.
2. Entre em github.com → **+** → **New repository** → nome `conecta-libras` → **Create repository**.
3. Na página do repositório clique em **uploading an existing file**.
4. Abra a pasta extraída, **selecione TODO o conteúdo de dentro dela** (Ctrl+A) e arraste para o GitHub. Não arraste a pasta externa. Aguarde terminar e clique **Commit changes**.
5. Confira: na tela inicial do repositório devem aparecer `package.json`, `src`, `index.html` (e não uma pasta única `conecta-libras`).
6. Em vercel.com → **Sign up with GitHub** → **Add New… → Project** → **Import** em `conecta-libras`.
7. Deixe **Framework Preset: Vite**, **Root Directory: ./** e clique **Deploy**. Leva 1 a 3 minutos.
8. A Vercel mostra o link `https://….vercel.app`. Abra no computador e no celular (HTTPS é obrigatório para câmera e microfone).

Se o deploy falhar: abra o deployment → **Build Logs** e leia a primeira linha vermelha. Se o erro for “package.json not found”, o repositório tem uma pasta a mais: em Vercel → Settings → General → **Root Directory**, escolha essa pasta e faça Redeploy.

## O que acontece no build
`npm install` roda `scripts/setup-mediapipe.mjs`, que copia o WASM do MediaPipe e baixa os modelos para `public/mediapipe`. Se o download falhar, o build continua, e ao ligar a câmera o app tenta as URLs públicas oficiais do MediaPipe (precisa de internet no aparelho).

## Usar
- **Cadastrar sinais:** Libras → Português → Cadastrar sinais → escolha um sinal → Ligar câmera → Gravar exemplo (contagem de 3 s; faça o sinal em 2 s). Grave 8 ou mais exemplos mostrando ombros e mãos → Treinar → aba Reconhecer.
- **Testar reconhecimento:** treine 2 ou 3 sinais bem diferentes, faça cada um 10 vezes e anote acertos e erros. Gestos aleatórios devem resultar em “Sinal não reconhecido”.
- **Cadastrar vídeos:** Português → Libras → Cadastrar vídeo (termo exato, fonte/licença). Ficam no IndexedDB do aparelho. Use só vídeos próprios ou autorizados.

## Limitações
- Reconhece apenas sinais isolados cadastrados por você; não traduz Libras. Sinais cadastrados não são validados por especialistas. Precisão nunca medida com sinais reais.
- Não há sinais nem vídeos de Libras incluídos: nada em Português → Libras ou no Dicionário toca até você cadastrar vídeos.
- Sem avatar/VLibras (licença e API não verificadas); só a interface `src/lib/signRenderer.ts`.
- Sem expressões faciais, sem rede neural, sem frases em Libras.
- Voz → texto só em navegadores com Web Speech API (Chrome/Edge); o áudio vai ao serviço do navegador.

## Estado dos testes (ao gerar este ZIP)
Executados: lógica de reconhecimento (6 testes); empacotamento do app com esbuild a partir deste ZIP extraído (todas as importações resolvem); teste em Chromium (Playwright) de rotas, resumo médico, emergência, favoritos, alto contraste e vídeos no IndexedDB, com o MediaPipe substituído por um stub. Não executados: `npm install`, `npm run build` com o Vite, MediaPipe real (câmera com modelos), gravação e reconhecimento de sinais, microfone, e o deploy na Vercel. Comandos locais opcionais: `npm install`, `npm run dev`, `npm run build`, `npm run build:strict`, `npm test`.
