function blog_card(root) {
    var feed      = root.feed;
    var entries   = feed.entry || [];
    var post_cont = document.getElementById("blog");

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var link  = entry.link[1].href;
        
        const card       = document.createElement("div");
        const card_link  = document.createElement("a");

        card.id = "card"

        card_link.href         = link;
        card_link.textContent  = title;
        card_link.target       = "_"

        card.appendChild(card_link);

        post_cont.appendChild(card);
    }
}