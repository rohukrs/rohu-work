/*
  ============================================================
  EDIT YOUR WEBSITE HERE
  ============================================================
  this is the only file you need to touch to change your site.
  change the text between the quotes, save, and redeploy.

  menu items:
    label    the word shown in the menu
    link     where it goes when someone clicks it again
             (use "#" for nothing yet, a full https:// link for other sites)
    preview  what pops up when the word is selected, or null for nothing
             style can be:
               "icon"  small round image right next to the word
               "card"  tall rounded card on the right
               "wide"  big panel that runs off the right edge
             image is a file inside the assets folder

  to add an item, copy one { ... } line, paste it, and change it.
  to remove one, delete its line.
  to swap an image, drop a new file into assets/ and change the name here.
*/

window.SITE = {
  name: "rohu",
  tagline: "est 1997",
  photo: "assets/stamp.webp",

  colors: {
    background: "#154dc7",
    text: "#ffc766",
  },

  menu: [
    { label: "life",   link: "#", preview: null },
    { label: "work",   link: "#", preview: { style: "icon", image: "assets/work.webp" } },
    { label: "write",  link: "#", preview: { style: "card", image: "assets/write.webp" } },
    { label: "videos", link: "https://www.youtube.com/@rohukrs", preview: { style: "wide", image: "assets/videos.webp" } },
  ],
};
