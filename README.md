# Meu Cofre

Site pessoal para enviar, listar, baixar e apagar arquivos. Protegido por senha, armazenando no **Vercel Blob**.

## Como publicar na Vercel

### 1. Subir o código
- Opção A (GitHub): crie um repositório, envie esta pasta e importe o repositório em https://vercel.com/new
- Opção B (CLI): na pasta do projeto, rode `npx vercel` (e depois `npx vercel --prod`)

### 2. Criar o armazenamento (Blob)
1. No painel do projeto na Vercel, abra a aba **Storage**.
2. Clique em **Create Database / Store → Blob**.
3. Conecte ao projeto. Isso cria sozinho a variável `BLOB_READ_WRITE_TOKEN`.

### 3. Definir a senha
Em **Settings → Environment Variables**, crie:

| Nome             | Valor                                                  |
|------------------|--------------------------------------------------------|
| `SITE_PASSWORD`  | a senha que você vai usar para entrar                  |
| `SESSION_SECRET` | um texto aleatório longo (ex.: 40 caracteres)          |

### 4. Fazer o deploy de novo
Depois de criar o Blob e as variáveis, faça um **Redeploy** para elas valerem.

## Uso
- Entre com a senha.
- Arraste arquivos ou pastas (ou use os botões). Arquivos grandes vão direto para o Blob em partes.
- Mantenha a aba aberta até todos aparecerem como "✓ salvo".
- Depois de instalar o Linux, abra o mesmo site e baixe tudo de volta.

## Observações importantes
- As URLs dos arquivos são públicas, mas com sufixo aleatório (impossíveis de adivinhar). Só quem tiver o link direto consegue abrir; o site em si exige senha.
- Confira os limites de armazenamento e transferência do seu plano da Vercel antes de enviar muita coisa.
- Só apague os originais depois de baixar uma cópia de teste e confirmar que abre.


## Correção para Blob privado

Este projeto usa um Blob Store **Private**. Por isso, o upload no navegador precisa usar
`access: 'private'` e o SDK `@vercel/blob` versão 2.3.0 ou superior. O pacote e a importação
do navegador já foram atualizados nesta versão corrigida.

Depois de publicar, confirme que `BLOB_READ_WRITE_TOKEN` está configurada no ambiente
Production e faça um novo deploy. Não coloque esse token em variáveis `NEXT_PUBLIC` nem
no HTML/JavaScript do navegador.

