const itemsContainer = document.querySelector("#list-items")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75"
  itemsContainer.append(colourCard)

  const colourCardBody = document.createElement("article")
  colourCardBody.className = "card-body"
  colourCard.append(colourCardBody)

  const colourCardTitle = document.createElement("h5")
  colourCardTitle.className = "card-title"
  colourCardTitle.innerText = item.name
  colourCardBody.append(colourCardTitle)

  const colourCardText = document.createElement("p")
  colourCardText.className = "card-text"
  colourCardText.innerText = item.pantone_value
  colourCardBody.append(colourCardText)

  const colourCardColour = document.createElement("figure")
  colourCardColour.style = "background-color: " + item.color + ";"
  colourCardColour.innerText = item.color
  colourCardBody.append(colourCardColour)

  const colourCardBreak = document.createElement("br")
  itemsContainer.append(colourCardBreak)
}

async function fetchColorsList() {
    const url = "https://reqres.in/api/unknown";
    const options = {
        method: "GET",
        headers: {
            "x-api-key": "reqres-free-v1"
        }
    };

    try {
        // petición a la API.
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("resouesta", result);
        // la lista de colores, que está en la propiedad data
        const colors = result.data;

        //guardar
        localStorage.setItem("colors", JSON.stringify(colors));

        // 3. Recorremos la lista de colores.
        for (const color of colors) {
            addItem(color);
        }

    } catch (error) {
        console.error("error al obtener los colores:", error);
    }
}


function loadColorsFromStorage() {
  const storedColors = localStorage.getItem("colors");

  if (storedColors) {
    const colors = JSON.parse(storedColors);
    for (const color of colors) {
      addItem(color);
    }
  } else {
    console.log("No hay colores guardados en localStorage.");
  }
}
fetchColorsList()
loadColorsFromStorage()

