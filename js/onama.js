(() => {
    import("./header.js").then(({navitems}) => {
        navitems(".");
    })
    const navigation = () => {
        const naslovi = document.getElementsByClassName("text-box");
        const onama = document.getElementById("page-navigation");

        for (let i = 0; i < naslovi.length; i++) {
            naslovi[i].id = i.toString();
            const titleWords = naslovi[i].children[0].innerText.split(" ");
            let text = titleWords[0] + " " + titleWords[1];
            if (titleWords[2].length > 3) {
                text += " " + titleWords[2];
            }
            const item = document.createElement("li")
            item.classList.add("nav-item")
            item.innerHTML = `<a class="nav-link ">${text}</a>`
            item.addEventListener("click", () => {
                scrollToTargetAdjusted(i.toString());
            });
            onama.appendChild(item);
        }
    }

    function scrollToTargetAdjusted(elementId) {
        var element = document.getElementById(elementId);
        var headerOffset = 65;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    navigation();

})()