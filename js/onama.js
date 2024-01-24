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
        const item = document.createElement("li")
        item.classList.add("nav-item")
        item.innerHTML = `<a class="nav-link ">Idi na Početak</a>`
        item.addEventListener("click", () => {
            window.scrollTo({top:0, behavior: "smooth"});
        });
        onama.appendChild(item);
    }

    function scrollToTargetAdjusted(elementId) {
        const element = document.getElementById(elementId);
        const headerOffset = 65;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    navigation();

})()