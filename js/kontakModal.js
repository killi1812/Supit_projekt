(() => {

  const kontakModalInit = () => {
    const modal = document.createElement("div");

    modal.classList.add("modal");
    modal.classList.add("fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("data-bs-backdrop","static");
  
    modal.id = "algebra-modal";
     modal.addEventListener("click", (e) => {
       if (e.target !== document.getElementById("algebra-modal")) return;
       closeModal();
     });

    modal.innerHTML = `
          <div class="modal-dialog phone-container">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title">Kontakt</h3>
                <button type="button" data-bs-dismiss="modal" class="btn-close" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form action="https://www.fulek.com/mvc/supit/project-contact-form" >
                  <div class="mb-3">
                    <label for="FullName" class="form-label">Puno Ime</label>
                    <input name="FullName" type="text" class="form-control" id="FullName">
                  </div>
                  <div class="mb-3">
                    <label for="Email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="Email" name="Email" aria-describedby="emailHelp">
                  </div>
                  <div class="mb-3">
                      <select name="Importance" class="form-select" aria-label="Default select example">
                          <option selected>Važnost</option>
                          <option value="1">Visoka</option>
                          <option value="2">Srednja</option>
                          <option value="3">Niska</option>
                    </select>
                </div>      
                  <div class="mb-3">
                    <label for="Message" class="form-label">Poruka</label>
                    <textarea class="form-control" id="Message"  name="Message" rows="3"></textarea>
                  </div>
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" value="true" name="ReceiveNewsletter" id="ReceiveNewsletter">
                    <label class="form-check-label" for="ReceiveNewsletter">Želim primati obavijesti</label>
                  </div>
                    <div class="modal-footer">
                    <button type="button" data-bs-dismiss="modal" class="btn btn-secondary btn-mrgl " data-bs-dismiss="modal">Zatvori</button>
                    <button type="submit" class="btn btn-primary btn-mrgl ">Posalji</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       `;
  
    document.body.append(modal);
  }
  const closeModal = () => {
    //TODO nece se clzati drugi put
    const algebraModal = bootstrap.Modal.getInstance(
      document.getElementById("algebra-modal")
    );
    algebraModal.hide();
  };
  
kontakModalInit();

})()

const kontakModal = () => {
  const algebramodal = document.getElementById("algebra-modal");
  const algebraModal = bootstrap.Modal.getOrCreateInstance(algebramodal);
  algebraModal.show();
};
