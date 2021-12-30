const baseUrl = "products.json";
//const url = "http://makeup-api.herokuapp.com/api/v1/products.json";

function carregaDados() {
  fetch(baseUrl, {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "*" },
    mode: "cors",
    cache: "default",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      baseDados = ordenaMelhoresAvaliados(json);
      baseDadosFiltrada = ordenaMelhoresAvaliados(json);
      //console.log(json);
      geraCatalogo(baseDados);
      menuMarca(json);
      menuTipo(json);
    })
    .catch((error) => {
      console.log(error);
    });
}

var baseDados;
var baseDadosFiltrada;

//FUNÇÃO PARA RECEBER TODOS OS PRODUTOS DO CATALÓGO
function geraCatalogo(json) {
  let recebeCatalogo = "";

  for (item of json) {
    recebeCatalogo +=
      "<div " +
      'class="product"' +
      'data-name="' +
      item["name"] +
      '"' +
      'data-brand="' +
      verificaNulo2(item["brand"]) +
      '"' +
      'data-type="' +
      verificaNulo2(item["product_type"]) +
      '"' +
      'tabindex="' +
      item["id"] +
      '"' +
      ">" +
      '<figure class="product-figure">' +
      "<img " +
      'src="' +
      item["image_link"] +
      '"' +
      'width="215"' +
      'height="215"' +
      'alt="' +
      item["name"] +
      '"' +
      "onerror=\"javascript:this.src='img/unavailable.png'\"" +
      "></img>" +
      "</figure>" +
      '<section class="product-description">' +
      '<h1 class="product-name">' +
      item["name"] +
      "</h1>" +
      '<div class="product-brands">' +
      '<span class="product-brand background-brand">' +
      item["brand"] +
      "</span>" +
      '<span class="product-brand background-price">' +
      "R$" +
      (item["price"] * 5.5).toFixed(2) +
      "</span>" +
      "</div>" +
      "</section>" +
      '<section class="product-details" id= "detalhesProdutos">' +
      '<div class="details-row">' +
      "<div>Brand</div>" +
      '<div class="details-bar">' +
      '<div class="details-bar-bg" style="width= 250">' +
      verificaNulo2(item["brand"]) +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="details-row">' +
      "<div>Price</div>" +
      '<div class="details-bar">' +
      '<div class="details-bar-bg" style="width= 250">' +
      "R$" +
      verificaNulo(item["price"] * 5.5).toFixed(2) +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="details-row">' +
      "<div>Rating</div>" +
      '<div class="details-bar">' +
      '<div class="details-bar-bg" style="width= 250">' +
      verificaNulo(item["rating"]).toFixed(1) +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="details-row">' +
      "<div>Category</div>" +
      '<div class="details-bar">' +
      '<div class="details-bar-bg" style="width= 250"></div>' +
      "</div>" +
      "</div>" +
      '<div class="details-row">' +
      "<div>Product_type</div>" +
      '<div class="details-bar">' +
      '<div class="details-bar-bg" style="width= 250">' +
      verificaNulo2(item["product_type"]) +
      "</div>" +
      "</div>" +
      "</div>" +
      "</section>" +
      "</div>";
  }
  //console.log(recebeCatalogo);
  //console.log(document.getElementById("catalogo2"));
  document.getElementById("catalogo2").innerHTML = recebeCatalogo;
}

//FUNÇÃO PARA VERIFICAR DADOS NULOS E CONVERTER PARA 0
function verificaNulo(valor) {
  if (valor === null) {
    return 0;
  } else {
    return valor;
  }
}

//FUNÇÃO PARA VERIFICAR DADOS NULOS E CONVERTER PARA VAZIO
function verificaNulo2(valor) {
  if (valor === null) {
    return "";
  } else {
    return valor;
  }
}

//FUNÇÃO PARA BUSCAR PELO NOME
document.getElementById("filter-name").addEventListener("change", filtraNome);

function filtraNome() {
  let dadosFiltrados;
  let nomeProduto = document.getElementById("filter-name").value.toLowerCase();
  dadosFiltrados = baseDadosFiltrada.filter((p) => {
    return p.name.toLowerCase().includes(nomeProduto);
  });

  baseDadosFiltrada = dadosFiltrados;
  geraCatalogo(dadosFiltrados);
}

//FUNÇÃO PARA FILTRAR PELA MARCA
function menuMarca(json) {
  let menu1 = '<option value="Todos">Todos</option>';

  let ordenaMarcas = json.sort((a, b) => {
    return verificaNulo2(a.brand).localeCompare(verificaNulo2(b.brand));
  });
  let marcasUnicas = [];

  for (item of ordenaMarcas) {
    if (
      !marcasUnicas.includes(verificaNulo2(item.brand)) &&
      item.brand !== null
    ) {
      marcasUnicas.push(item.brand);
    }
  }

  for (item of marcasUnicas) {
    menu1 += '<option value="' + item + '"> ' + item + " </option>";
  }
  document.getElementById("filter-brand").innerHTML = menu1;
}

document.getElementById("filter-brand").addEventListener("change", filtraMarca);

function filtraMarca() {
  let dadosFiltrados;
  let selecionadoTodos = document.getElementById("filter-brand").value;

  if (selecionadoTodos === "Todos") {
    baseDadosFiltrada = baseDados;
    //menuTipo(baseDados);
    geraCatalogo(baseDados);
  } else {
    let marcaProduto = document
      .getElementById("filter-brand")
      .value.toLowerCase();
    dadosFiltrados = baseDadosFiltrada.filter((p) => {
      return verificaNulo2(p.brand).toLowerCase().includes(marcaProduto);
    });
    baseDadosFiltrada = dadosFiltrados;
    menuTipo(baseDadosFiltrada);
    geraCatalogo(dadosFiltrados);
  }
}

//FUNÇÃO PARA FILTRAR PELO TIPO
function menuTipo(json) {
  let menu2 = '<option value="Todos">Todos</option>';

  let ordenaTipos = json.sort((a, b) => {
    return verificaNulo2(a.product_type).localeCompare(
      verificaNulo2(b.product_type)
    );
  });
  let tiposUnicos = [];
  //console.log("ordenaTipos");
  //console.log(ordenaTipos);

  for (item of ordenaTipos) {
    //console.log(item);
    if (
      !tiposUnicos.includes(verificaNulo2(item.product_type)) &&
      item.product_type !== null
    ) {
      //console.log(item.product_type);
      tiposUnicos.push(item.product_type);
    }
  }
  //console.log("tiposUnicos")
  //console.log(tiposUnicos);

  for (item of tiposUnicos) {
    menu2 += '<option value="' + item + '"> ' + item + " </option>";
  }
  document.getElementById("filter-type").innerHTML = menu2;
}

document.getElementById("filter-type").addEventListener("change", filtraTipo);

function filtraTipo() {
  let dadosFiltrados;
  let selecionadoTodos = document.getElementById("filter-type").value;

  if (selecionadoTodos === "Todos") {
    baseDadosFiltrada = baseDados;
    //menuMarca(baseDados);
    geraCatalogo(baseDados);
  } else {
    let tipoProduto = document
      .getElementById("filter-type")
      .value.toLowerCase();
    dadosFiltrados = baseDadosFiltrada.filter((p) => {
      return verificaNulo2(p.product_type).toLowerCase().includes(tipoProduto);
    });
    baseDadosFiltrada = dadosFiltrados;
    menuMarca(baseDadosFiltrada);
    geraCatalogo(dadosFiltrados);
  }
}

//FUNÇÃO PARA ORDENAR PELO RATING
function ordenaMelhoresAvaliados(json) {
  let dadosOrdenados = json.sort((a, b) => {
    return verificaNulo(b.rating) - verificaNulo(a.rating);
  });
  return dadosOrdenados;
}

// FUNÇÃO PARA ORDENAR PELAS OUTRAS ALTERNATIVAS
function ordenarAlternativas(json, filtro) {
  let dadosOrdenados;
  if (filtro === "melhores-avaliados") {
    dadosOrdenados = ordenaMelhoresAvaliados(json);
  } else if (filtro === "menores-precos") {
    dadosOrdenados = json.sort((a, b) => {
      return verificaNulo(a.price) - verificaNulo(b.price);
    });
  } else if (filtro === "maiores-precos") {
    dadosOrdenados = json.sort((a, b) => {
      return verificaNulo(b.price) - verificaNulo(a.price);
    });
  } else if (filtro === "a-z") {
    dadosOrdenados = json.sort((a, b) => {
      return verificaNulo2(a.name).localeCompare(verificaNulo2(b.name));
    });
  } else if (filtro === "z-a") {
    dadosOrdenados = json.sort((a, b) => {
      return verificaNulo2(b.name).localeCompare(verificaNulo2(a.name));
    });
  }
  return dadosOrdenados;
}

document.getElementById("sort-type").addEventListener("change", selecionaOpcao);

function selecionaOpcao() {
  let escolha = document.getElementById("sort-type").value;
  let escolha2 = ordenarAlternativas(baseDados, escolha);
  baseDadosFiltrada = escolha2;
  geraCatalogo(escolha2);
}
