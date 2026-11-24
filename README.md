# rohu.work

## edit your site
open `content.js`. everything you'd want to change is there:
name, tagline, photo, colors, menu words, links and preview images.
to swap an image, drop the new file in `assets/` and update its name in `content.js`.

## put it live (vercel, free)
1. go to vercel.com, sign up with github
2. new project, then upload this folder (or push it to a github repo and import it)
3. no build settings needed, it's plain html

## connect rohu.work (godaddy)
1. vercel: project, settings, domains, add `rohu.work` and `www.rohu.work`
2. vercel shows you the dns records to add (an A record for `@`, a CNAME for `www`)
3. godaddy: my products, rohu.work, dns. edit the `@` A record and the `www` CNAME to match vercel.
   delete any parked or forwarding records
4. wait 10 to 60 min. https turns on by itself

## updating later
if the folder is on github: edit `content.js` right on github.com, commit, and vercel redeploys in about 30 seconds.
if you uploaded the folder: edit it and upload again.

## font
the design uses creato display bold. if it's installed on your computer you'll see it locally.
for everyone else to see it, drop `CreatoDisplay-Bold.woff2` or `.otf` into `assets/fonts/`.
until then it falls back to helvetica.
