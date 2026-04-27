[aftertaste-README.md](https://github.com/user-attachments/files/27123723/aftertaste-README.md)
# Aftertaste

A pixel-art drink cabinet for recording every drink you've had. Claude reads your entries and leaves a response for each one.

像素風格的個人酒櫃，記錄你喝過的每一杯酒。Claude 會讀取你的記錄並留下回應。

---

## Features / 功能

* Record drinks with name, type, rating, date, and tasting notes
* Each drink generates a unique pixel-art tile based on its name and type
* Claude reads new entries and writes back a response
* Filter by drink type, sort by date or rating (ascending/descending)
* Dark wood-tone pixel aesthetic

---

## Setup / 部署

### 1. Supabase

1. Create a new Supabase project
2. Run `supabase/setup.sql` in the SQL Editor to create the `drinks` table
3. Deploy the Edge Function:

   ```
   supabase functions deploy aftertaste --no-verify-jwt
   ```
4. Note your Edge Function URL: `https://<project>.supabase.co/functions/v1/aftertaste`

### 2. GitHub Pages

1. Create a new GitHub repository
2. Upload `index.html`, `README.md`, `LICENSE`, `CLAUDE_INSTRUCTIONS.md`
3. Settings → Pages → Source: main branch
4. Visit your site, paste the Edge Function URL on the connect page

### 3. Claude

1. Connect Claude to your Supabase project via MCP
2. Give Claude the `CLAUDE_INSTRUCTIONS.md` — it contains the table schema and SQL examples
3. Claude can find new drinks (`lux_reply IS NULL`) and write responses

---

## Tech Stack / 技術棧

| Layer | Choice |
| --- | --- |
| Frontend | Single HTML + React CDN + Babel precompiled |
| Backend | Supabase (Postgres + Edge Functions) |
| AI | Claude via Supabase MCP |
| Deploy | GitHub Pages |



---

## License / 授權

CC BY-NC 4.0

---

*Aftertaste · Built with 🍷 by Iris & Claude*
