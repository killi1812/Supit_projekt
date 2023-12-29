(async () => {
    import("./header.js").then(({navitems}) => {
        navitems("./");
    })


    const getAllKolegij = async () => {
        const response = fetch(
            "https://www.fulek.com/data/api/supit/curriculum-list/hr",
            {

                method: "GET",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await response;
        if (result.status === 401) location.replace("../index.html");
        const dataJson = await result.json();
        return dataJson.data;
    }

    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].kolegij.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].kolegij.substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].kolegij.substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i].kolegij + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {

                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) { //up
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    const removeKolegij = () =>{
        alert("not implementet");
    }

    const createListItem = (kolegij) =>{
    const item = document.createElement("tr");
    item.id = kolegij.id;
    item.innerHTML = `
        <td>${kolegij.kolegij}</td>
        <td>${kolegij.ects}</td>
        <td>${kolegij.sati}</td>
        <td>${kolegij.predavanja}</td>
        <td>${kolegij.vjezbe}</td>
        <td>${kolegij.tip}</td>
        <td>
            <button class="btn bg-danger">
            delete
            </button>
        </td>
        
    `
//TODO rijesi delitanje jako je cudno nemam pojma kako cu da napraviti
        // <th>Kolegij</th>
        // <th>ECTS</th>
        // <th>Sati</th>
        // <th>Predavanja</th>
        // <th>Vježbe</th>
        // <th>Tip</th>
        // <th></th>
    return item
    }
    const kolegiji = await getAllKolegij()
    autocomplete(document.getElementById("kolegij"), kolegiji);
    const dodajKolegij = () =>{
        const value = document.getElementById("kolegij").value;
        if (!value) {
            alert("Error");
            return;
        }
        const lista = document.querySelector("#kolegij-table");
        if(kolegiji.length === 0) return;
        debugger;
        const kolegij = kolegiji.find((kolegij) => kolegij.kolegij === value);
        if(!kolegij) alert(`Kolegij ${value} ne postoji` )
        lista.append(createListItem(kolegij));
    }

    document.querySelector("#submit-kolegiji").addEventListener("click",dodajKolegij);

})()
