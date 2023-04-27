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




