(async () => {
  import("./header.js").then(({ navitems }) => {
    navitems(".");
  });

  // TODO napisati sve novo jer da nesto je isto
  const getAllKolegij = async () => {
    const response = fetch(
      "https://www.fulek.com/data/api/supit/curriculum-list/hr",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response;
    if (result.status === 401) location.replace("../index.html");
    const dataJson = await result.json();
    return dataJson.data;
  };

  const getKolegij = (id) => {
    return $.ajax({
      url: `https://www.fulek.com/data/api/supit/get-curriculum/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      dataType: "json",
    });
  };

  function autocomplete(input, array) {
    $(input).on("input", function () {
      let val = this.value;
      CloseList();
      if (!val) return false;
      let itemsList = document.createElement("DIV");
      itemsList.setAttribute("id", this.id + "-list");
      itemsList.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(itemsList);
      for (let i = 0; i < array.length; i++) {
        if (
          array[i].kolegij.substr(0, val.length).toUpperCase() ==
          val.toUpperCase()
        ) {
          let item = document.createElement("DIV");
          item.innerHTML =
            "<strong>" + array[i].kolegij.substr(0, val.length) + "</strong>";
          item.innerHTML += array[i].kolegij.substr(val.length);
          item.innerHTML +=
            "<input type='hidden' value='" + array[i].kolegij + "'>";
          $(item).on("click", function (e) {
            input.value = this.getElementsByTagName("input")[0].value;
            CloseList();
          });
          itemsList.appendChild(item);
        }
      }
    });

    function CloseList() {
      let lists = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < lists.length; i++) {
        lists[i].parentNode.removeChild(lists[i]);
      }
    }

    document.addEventListener("click", function (e) {
      CloseList();
    });
  }

  function calculateFooter() {
    const rows = [...document.getElementById("kolegij-table").children];
    rows.splice(0, 2);
    const footer = document.querySelector("#kolegij-table tfoot>tr");
    const values = {
      ects: 0,
      sati: 0,
      predavanja: 0,
      vjezbe: 0,
    };
    rows.forEach((row) => {
      values.ects += Number(row.children[1].innerText);
      values.sati += Number(row.children[2].innerText);
      values.predavanja += Number(row.children[3].innerText);
      values.vjezbe += Number(row.children[4].innerText);
    });
    footer.innerHTML = `
        <td  class="hide-phone">Ukupno</td>
        <td  class="hide-phone">${values.ects}</td>
        <td  class="hide-phone">${values.sati}</td>
        <td  class="hide-phone">${values.predavanja}</td>
        <td  class="hide-phone">${values.vjezbe}</td>
        `;
  }

  const removeKolegij = (event) => {
    event.currentTarget.parentElement.parentElement.remove();
    calculateFooter();
  };

  const handleKolegijDetails = async (event) => {
    if (event.explicitOriginalTarget.className === "btn bg-danger") return;
    const rez = await getKolegij(event.currentTarget.id);
    if (rez.statusCode === 401) location.replace("../index.html");
    if (!rez.isSuccess) {
      alert(rez.errorMessages.join("\n"));
    }
    showData(rez.data);
    modal.show();
  };

  const showData = (data) => {
    document.getElementById("kolegij-value").innerHTML = data.kolegij;
    document.getElementById("ects-value").innerHTML = data.ects;
    document.getElementById("predavanja-value").innerHTML = data.predavanja;
    document.getElementById("sati-value").innerHTML = data.sati;
    document.getElementById("semestar-value").innerHTML = data.semestar;
    document.getElementById("tip-value").innerHTML = data.tip;
    document.getElementById("vjezbe-value").innerHTML = data.vjezbe;
  };

  const createListItem = (kolegij) => {
    const item = document.createElement("tr");
    item.id = kolegij.id;
    item.innerHTML = `
        <td>${kolegij.kolegij}</td>
        <td  class="hide-phone">${kolegij.ects}</td>
        <td  class="hide-phone">${kolegij.sati}</td>
        <td  class="hide-phone">${kolegij.predavanja}</td>
        <td  class="hide-phone">${kolegij.vjezbe}</td>
        <td  class="hide-phone">${kolegij.tip}</td>
        <td>
            <button class="btn bg-danger">
            delete
            </button>
        </td>`;
    item.children[6].children[0].addEventListener("click", removeKolegij);
    item.addEventListener("click", handleKolegijDetails);
    return item;
  };

  const dodajKolegij = () => {
    const value = document.getElementById("kolegij").value;

    if (!value) {
      alert("Error");
      return;
    }

    const lista = document.querySelector("#kolegij-table");
    if (kolegijiDictionary.length === 0) return;
    const kolegij = kolegijiDictionary[value];
    if (!kolegij) {
      alert(`Kolegij ${value} ne postoji`);
      return;
    }

    for (let i = 0; i < lista.children.length; i++) {
      // ovdje mora biti dva jednako zato jer je jedno string a drugo number
      if (lista.children[i].id == kolegij.id) {
        alert("Kolegij je već dodan!");
        return;
      }
    }
    lista.append(createListItem(kolegij));
    document.getElementById("kolegij").value = "";
    calculateFooter();
  };

  const modal = new bootstrap.Modal(
    document.getElementById("KolegijModal"),
    {}
  );

  const kolegiji = await getAllKolegij();
  let kolegijiDictionary = {};
  kolegiji.forEach((kolegij) => {
    kolegijiDictionary[kolegij.kolegij] = kolegij;
  });

  autocomplete(document.getElementById("kolegij"), kolegiji);
  document
    .querySelector("#submit-kolegiji")
    .addEventListener("click", dodajKolegij);
})();
