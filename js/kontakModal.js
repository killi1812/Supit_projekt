const kontakModal = () => {
    const algebraModal = document.getElementById("algebra-modal");
    if (algebraModal) {
        algebraModal.style.display = "unset";
        return;
    }

    const modal = document.createElement("div");
    modal.id = 'algebra-modal';
    modal.addEventListener("click", (e) => {
        if (e.target !== document.getElementById("algebra-modal"))
            return;
        closeModal();
    })
    modal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Kontakt</h5>
                <button type="button" onclick="closeModal()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Modal body text goes here.</p>
<!--                todo ovdje doati form za kontaktiranje-->
              </div>
              <div class="modal-footer">
                <button type="button" onclick="closeModal()"  class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                <button type="button" class="btn btn-primary">Posalji</button>
              </div>
            </div>
          </div>
       `;

    document.body.append(modal);
}
const closeModal = () => {
//TODO nece se clzati drugi put
    const modal = document.getElementById("algebra-modal");
    modal.style.display = "none";
}