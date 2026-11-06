import { checkPassword, makeCookie, clearCookie, isAuthed } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ authed: isAuthed(req) });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearCookie());
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!process.env.SITE_PASSWORD) {
    return res
      .status(500)
      .json({ error: 'SITE_PASSWORD não está configurada na Vercel.' });
  }

  const password = req.body && req.body.password;
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)); // freia tentativas em massa
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  res.setHeader('Set-Cookie', makeCookie());
  return res.status(200).json({ ok: true });
}
