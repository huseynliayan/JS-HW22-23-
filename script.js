if (!localStorage.getItem("bag")) {
  localStorage.setItem("bag", "[]");
}

fetch(`http://localhost:5000/goods`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => {
    const showList = (arr) => {
      document.getElementById("list").innerHTML = "";
      arr.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = `<p>${item.product_name}</p>
           <p>${item.product_description}</p>
           <p>${item.product_price}</p>
           <p>${item.store_name}</p>
           <p>${item.store_address}</p>
           <button id="addBtn">ADD</button>
           <button id="removeBtn">REMOVE</button>`;

        li.querySelector("#addBtn").addEventListener("click", () => {
          let bag = JSON.parse(localStorage.getItem("bag"));
          if (!bag.some((product) => product.id === item.id)) {
            bag.push(item);
            localStorage.setItem("bag", JSON.stringify(bag));
          }
        });
        li.querySelector("#removeBtn").addEventListener("click", () => {
          let bag = JSON.parse(localStorage.getItem("bag"));
          bag = bag.filter((product) => product.id !== item.id);
          localStorage.setItem("bag", JSON.stringify(bag));
        });
        document.getElementById("list").appendChild(li);
      });
    };
    showList(data);
  });
