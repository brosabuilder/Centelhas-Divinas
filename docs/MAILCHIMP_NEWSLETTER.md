# Newsletter Mailchimp — Centelhas Divinas

## Template

O arquivo `scripts/email-templates/newsletter-mailchimp.html` é o template HTML da newsletter. Use no Mailchimp ao criar campanhas.

## Como usar no Mailchimp

### 1. URL do site (botão "Leia tudo no site")

O template usa o merge tag `*|SITE_URL|*`. Duas opções:

**Opção A — Merge tag customizado**

1. Mailchimp → **Audience** → **Audience fields and *|MERGE|* tags**
2. **Add a merge tag** → Nome: `SITE_URL`, valor padrão: `https://seu-site.lovable.app` (ou a URL do seu site)

**Opção B — Substituir manualmente**

Antes de colar o HTML no Mailchimp, faça um "Localizar e substituir": `*|SITE_URL|*` → `https://sua-url-aqui.com`

### 2. Conteúdo da newsletter

O template já inclui `*|MC:CONTENT|*` — área onde o Mailchimp insere os blocos de conteúdo (texto, imagens etc.) que você adiciona no editor.

- Ao criar a campanha, escolha **Code your own** → **Import HTML**
- Cole o conteúdo do arquivo `newsletter-mailchimp.html`
- No editor, adicione um bloco **Text** ou **Code** para escrever o corpo da newsletter
- O conteúdo aparecerá onde está `*|MC:CONTENT|*`

### 3. Saudação (FNAME)

O template usa `*|FNAME|*` para o nome. No formulário de inscrição, inclua o campo "First Name" e mapeie para o merge tag `FNAME`. Quem não tiver nome verá "Olá ," — você pode trocar por "Olá," se preferir.

### 4. Cancelar inscrição

O link `*|UNSUB|*` é um merge tag nativo do Mailchimp e já está configurado no template.

## Visual

O template usa o visual do site:

- Fundo escuro (#0a0a0a)
- Texto claro (#d4d0c8)
- Acentos dourados (#c8aa6e, #a08a50)
- Tipografia: Lora (corpo), Cinzel (títulos)
