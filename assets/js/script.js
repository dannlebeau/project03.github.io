//Primera Version
/*var url = "https://digimon-api.vercel.app/api/digimon"

var contenido = document.querySelector("#contenido")

//esto presenta en cards

fetch(url)
.then(response => response.json())
.then(datos => {
    console.log(datos)

    for (item of datos){

    contenido.innerHTML += `
    <div class="tarjeta">
        <div class="card" style="width: 18rem;">
        <img src="${item.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.level}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
    </div>    
    `

}

})*/

//Segunda Versión
var url = "https://digimon-api.vercel.app/api/digimon"

var contenido = document.querySelector("#contenido")

fetch(url)
.then(response => response.json())
.then(datos => {
    console.log(datos)
    let contador = 1; // Inicializar el contador en 1
    for (item of datos){
        document.querySelector("#contenido").innerHTML += `
            <tr>
              <td>${contador++}</td> <!-- Incrementar el contador y mostrarlo en la primera columna -->
              <td>${item.name}</td>
              <td class="imagen-digimon"><img src="${item.img}" alt="${item.name}" class="img_digimon"/></td>
              <td>${item.level}</td>
              <td><a href="https://digimon.fandom.com/es/wiki/${item.name}" target="_blank">Detalles</a></td>
            </tr>
        `
    }
})

//Busqueda de Digimon por nombre

document.querySelector("#search-button").addEventListener("click", function() {
  let input = document.querySelector("#search-input").value.toLowerCase(); // Obtener el valor del campo de entrada de texto y convertirlo a minúsculas
  let rows = document.querySelectorAll("tbody tr"); // Obtener todas las filas de la tabla
  rows.forEach(row => {
      let name = row.querySelector("td:nth-child(2)").textContent.toLowerCase(); // Obtener el valor del nombre del Digimon en la fila y convertirlo a minúsculas
      if (name.includes(input)) { // Si el valor de entrada está incluido en el nombre del Digimon en la fila, mostrar la fila
          row.style.display = "";
      } else { // De lo contrario, ocultar la fila
          row.style.display = "none";
      }
  });
});

//Busqueda por nivel

// Agregar evento change al select
document.querySelector("#nivel-select").addEventListener("change", function(){
  filtrarPorNivel(this.value);
});

function filtrarPorNivel(nivel){
  // Obtener todos los elementos de la tabla
  let elementos = document.querySelectorAll("#contenido tr");
  
  // Recorrer los elementos y mostrarlos u ocultarlos según el nivel seleccionado
  for (let i = 0; i < elementos.length; i++){
    let elemento = elementos[i];
    let nivelElemento = elemento.querySelector("td:nth-child(4)").textContent;
    if (nivel === "" || nivel === nivelElemento){
      elemento.style.display = "table-row";
    } else {
      elemento.style.display = "none";
    }
  }
}




//Llama a Gennai
var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}



//Api de TMDb

// Llamada a la API de TMDb

fetch('https://api.themoviedb.org/3/search/tv?api_key=de56eb6f91a9803bcf76be6c9fa18cbe&query=digimon')
  .then(response => response.json())
  .then(data => {
    // Obtener el elemento de la tabla
    const tableBody = document.getElementById('table-body');

    // Iterar por cada serie y crear una fila en la tabla
    data.results.forEach(serie => {
      // Crear la fila y las celdas de la tabla
      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      const linksCell = document.createElement('td');
      const scoreCell = document.createElement('td');
      const posterCell = document.createElement('td');
      
      // Agregar el título y el enlace a la fila, esta bien pero genera un error y hay que reemplazar el & por el guion (-)
      //titleCell.innerText = serie.name;
      //linkCell.innerHTML = `<a href="https://www.crunchyroll.com/${serie.name}" target="_blank">https://www.crunchyroll.com/${serie.name}</a>`;

      // Agregar el título y el enlace a la fila 
        titleCell.innerText = serie.name;
        //const crunchyrollLink = `https://www.crunchyroll.com/${serie.name.replace(/ /g, '-')}`;
        //linkCell.innerHTML = `<a href="${crunchyrollLink}" target="_blank">${crunchyrollLink}</a>`;
        linksCell.innerHTML = `
        <a href="https://www.crunchyroll.com/${serie.name.replace(/\s+/g, '-')}" target="_blank">https://www.crunchyroll.com/${serie.name.replace(/\s+/g, '-')}</a>
        <br>
        <br>
        <a href="https://jkanime.net/${encodeURIComponent(serie.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}" target="_blank">https://jkanime.net/buscar/${serie.name}</a>`;

      // Agregar la puntuación y el poster a la fila
      scoreCell.innerText = serie.vote_average;
      posterCell.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${serie.poster_path}">`;

      // Agregar las celdas a la fila
      row.appendChild(titleCell);
      row.appendChild(linksCell);
      //row.appendChild(jkanimeLinkCell);
      row.appendChild(scoreCell);
      row.appendChild(posterCell);

      // Agregar la fila a la tabla
      tableBody.appendChild(row);
    });
  });



