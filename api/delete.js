import { del } from '@vercel/blob';
import { isAuthed } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const url = req.body && req.body.url;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL ausente' });
  }

  try {
    await del(url);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
