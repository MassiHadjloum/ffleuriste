/**
 * 
 * @param {string} name
 * @return {HTMLelement}
 */
createDivWithClass = (name) => {
    let div = document.createElement('div');
    div.setAttribute('class', name);
    return div;

}

function Item() {
    this.id = id;
    this.src = src;
    this.titre = titre;
    this.prix = prix;

    this.item = () => {
        let item = createDivWithClass('item')
        let image = createDivWithClass('image');
        let body = createDivWithClass('body');
        let title = createDivWithClass('title');
        let prix = createDivWithClass('prix');
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");

        img.src = this.src;
        image.appendChild(img);
        h3.innerHTML = this.titre;
        title.appendChild(h3);
        p.innerHTML = this.prix;
        prix.appendChild(p);
        body.appendChild(title);
        body.appendChild(prix);
        item.appendChild(image);
        item.appendChild(body);


        item.addEventListener("click", () => {
            console.log("item clicked " + this.id)
        });

        return item;
    };

    console.log(this.item())
}

module.exports = Item;