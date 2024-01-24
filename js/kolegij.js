(async () => {

    const getIDFromUrl = () => {
        const url = window.location.href;
        const id = url.split("=")[1];
        return id;
    };
    const getKolegij = async (id) => {
        const response = await fetch(
            `https://www.fulek.com/data/api/supit/get-curriculum/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        return data;
    };

    const showData = (data) => {
        document.getElementById("kolegij").innerHTML = data.kolegij;
        document.getElementById("ects").innerHTML = data.ects;
        document.getElementById("predavanja").innerHTML = data.predavanja;
        document.getElementById("sati").innerHTML = data.sati;
        document.getElementById("semestar").innerHTML = data.semestar;
        document.getElementById("tip").innerHTML = data.tip;
        document.getElementById("vjezbe").innerHTML = data.vjezbe;
    };

    const response = await getKolegij(getIDFromUrl());
    if (response.statusCode === 401) location.replace("../index.html");
    if (response.statusCode != 200) return;
    showData(response.data);
})();
