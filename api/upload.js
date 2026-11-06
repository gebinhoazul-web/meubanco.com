import { handleUpload } from '@vercel/blob/client';
import { isAuthed } from '../lib/auth.js';

// O navegador envia o arquivo diretamente ao Vercel Blob (sem passar por aqui),
// então não existe o limite de ~4,5 MB das funções serverless.
// Esta rota só entrega o "token de upload" para quem estiver logado.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async () => {
        // A checagem de login fica aqui porque o callback "upload concluído"
        // vem dos servidores da Vercel, sem o cookie da sessão.
        if (!isAuthed(req)) {
          throw new Error('Não autorizado');
        }
        return {
          addRandomSuffix: true, // deixa a URL impossível de adivinhar
        };
      },
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(json);
  } catch (e) {
    const status = e.message === 'Não autorizado' ? 401 : 400;
    return res.status(status).json({ error: e.message });
  }
}
