import { list } from '@vercel/blob';
import { isAuthed } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const files = [];
    let cursor;
    do {
      const page = await list({ cursor, limit: 1000 });
      for (const b of page.blobs) {
        files.push({
          pathname: b.pathname,
          url: b.url,
          downloadUrl: b.downloadUrl,
          size: b.size,
          uploadedAt: b.uploadedAt,
        });
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    files.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    return res.status(200).json({ files });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
