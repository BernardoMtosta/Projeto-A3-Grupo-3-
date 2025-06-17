function toggleForm() {
  const signupPanel = document.getElementById("signupPanel");
  const loginForm = document.querySelector(".right-panel");

  signupPanel.classList.toggle("active");
  loginForm.classList.toggle("hidden");
}


// Variáveis globais
let map;
let userLocation;
let marker;
let directionsService;
let directionsRenderer;
let currentMarkers = [];
let currentRoute = null;

//// Função de limpar o mapa/////
function clearMap() {
  // Remove marcadores
  currentMarkers.forEach(marker => marker.setMap(null));
  currentMarkers = [];
  // Remove rota
  if (currentRoute) {
    currentRoute.setMap(null);
    currentRoute = null;
  }
}

/////////////////////////////////////////////////////////////////
function addMarkers() {
  clearMap();
// Marcadores de pontos
const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "purple",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };
  const svgPointicon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
  </svg>`

  const svgPointicon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck-front-fill" viewBox="0 0 16 16">
  <path d="M3.5 0A2.5 2.5 0 0 0 1 2.5v9c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2v-9A2.5 2.5 0 0 0 12.5 0zM3 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.9c0 .625-.562 1.092-1.17.994C10.925 7.747 9.208 7.5 8 7.5s-2.925.247-3.83.394A1.008 1.008 0 0 1 3 6.9zm1 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-5-2h2a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2"/>
</svg>`

 const svgUniversitIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bank2" viewBox="0 0 16 16">
  <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916zM12.375 6v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1z"/>
  </svg>`


  let marker1 = new google.maps.Marker({
    position:{lat: -19.464180534491476, lng: -44.24328951590929}, //Rua Senhor Dos Passos, 260
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
  // Pop up para o marker inicio 
const infoWindow1 = new google.maps.InfoWindow({
  content: '<strong>Rua Senhor Dos Passos, 260</strong><br>Horário de Chegada Previsto: 18:32'
});

marker1.addListener('click', function() {
  infoWindow1.open(map, marker1);
});
///////// Pop up termina aqui   

///////////////////////////////////////////////////////////

currentMarkers.push(marker1);

  let marker2 = new google.maps.Marker({
    position:{ lat:-19.460357809215676, lng:-44.241414321437304}, // Terminal Urbano
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon2),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow2 = new google.maps.InfoWindow({
  content :`
    <strong>Terminal Urbano</strong><br>
    Início do trajeto - 18:30<br>
    <img src="https://setelagoas.com.br/wp-content/uploads/2023/12/terminal-urbano.jpg" alt="Terminal" width="200">`
  
});
marker2.addListener('click', function() {
  infoWindow2.open(map, marker2);
});

///////////////////////////////////////////////////////////

currentMarkers.push(marker2);

  let marker3 = new google.maps.Marker({
    position:{ lat:-19.46633029607159, lng: -44.24475408264267}, // Faculdade Promove - Unidade SEDE
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgUniversitIcon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow3 = new google.maps.InfoWindow({
  content: `<strong>Faculdade Promove</strong><br>
            Previsão de chegada - 18:33<br>
            <img src="https://teclemidia.com/wp-content/uploads/2022/08/promove181021-1200x900.jpg" alt="Promove" width="200">`
});
marker3.addListener('click', function() {
  infoWindow3.open(map, marker3);
});

///////////////////////////////////////////////////////////

  currentMarkers.push(marker3);

  let marker4 = new google.maps.Marker({
    position:{lat: -19.46745606853424, lng: -44.242654263978395}, // R. Cel. Américo Teixeira Guimarães, 196 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });

  const infoWindow4 = new google.maps.InfoWindow({
  content : '<strong>R. Cel. Américo Teixeira Guimarães, 196 - São Geraldo</strong><br>Previsão de chegada - 18:34'
});
marker4.addListener('click', function() {
  infoWindow4.open(map, marker4);
});

///////////////////////////////////////////////////////////

  currentMarkers.push(marker4);

  let marker5 = new google.maps.Marker({
    position:{ lat:-19.469863639528114, lng: -44.24151223954027}, //R. Cel. Américo Teixeira Guimarães, 470 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
  const infoWindow5 = new google.maps.InfoWindow({
  content : '<strong>R. Cel. Américo Teixeira Guimarães, 470 - São Geraldo</strong><br>Previsão de chegada - 18:35'
});
marker5.addListener('click', function() {
  infoWindow5.open(map, marker5);
});
  
  ///////////////////////////////////////////////////////////
  
  currentMarkers.push(marker5);


    let marker6 = new google.maps.Marker({
    position:{ lat:-19.470770033698614, lng: -44.2411907399301}, // R. João Libório Júnior, 460 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
 const infoWindow6 = new google.maps.InfoWindow({
  content : '<strong>R. João Libório Júnior, 460 - São Geraldo</strong><br>Previsão de chegada - 18:36'
});
marker6.addListener('click', function() {
  infoWindow6.open(map, marker6);
});
  ///////////////////////////////////////////////////////////

   currentMarkers.push(marker6);

  let marker7 = new google.maps.Marker({
    position:{ lat:-19.471377958590285, lng: -44.24226383109053}, // R. João Libório Júnior, 586 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow7 = new google.maps.InfoWindow({
  content : '<strong>R. João Libório Júnior, 586 - São Geraldo</strong><br>Previsão de chegada - 18:37'
});
marker7.addListener('click', function() {
  infoWindow7.open(map, marker7);
});
  ///////////////////////////////////////////////////////////

  currentMarkers.push(marker7);
  
  let marker8 = new google.maps.Marker({
    position:{ lat:-19.472061508850956, lng: -44.24373562088151}, // R. João Libório Júnior, 764 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow8 = new google.maps.InfoWindow({
  content : '<strong>R. João Libório Júnior, 764 - São Geraldo</strong><br>Previsão de chegada - 18:38'
});
marker8.addListener('click', function() {
  infoWindow8.open(map, marker8);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker8);

   let marker9 = new google.maps.Marker({
    position:{ lat:-19.471159089807045, lng: -44.24466711088987}, //R. Gen. Osório, 25 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
  const infoWindow9 = new google.maps.InfoWindow({
  content : '<strong>R. Gen. Osório, 25 - São Geraldo</strong><br>Previsão de chegada - 18:40'
});
marker9.addListener('click', function() {
  infoWindow9.open(map, marker9);
});

///////////////////////////////////////////////////////////

  currentMarkers.push(marker9);

  let marker10 = new google.maps.Marker({
    position:{ lat:-19.47115762203111, lng: -44.2457882411309}, //R. Osvaldo Cruz, 470 - São Geraldo
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow10 = new google.maps.InfoWindow({
  content : '<strong>R. Osvaldo Cruz, 470 - São Geraldo</strong><br>Previsão de chegada - 18:41'
});
marker10.addListener('click', function() {
  infoWindow10.open(map, marker10);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker10);

  let marker11 = new google.maps.Marker({
    position:{ lat:-19.472023858828546, lng: -44.24887350584141}, // Rua Pedra Grande, 204
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
  const infoWindow11 = new google.maps.InfoWindow({
  content : '<strong>Rua Pedra Grande, 204</strong><br>Previsão de chegada - 18:43'
});
marker11.addListener('click', function() {
  infoWindow11.open(map, marker11);
});

///////////////////////////////////////////////////////////

  currentMarkers.push(marker11);

  let marker12 =  new google.maps.Marker({
    position:{ lat:-19.47363850286178, lng: -44.25143719523704}, // R. Pedra Grande, 540 - São Dimas
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
  const infoWindow12 = new google.maps.InfoWindow({
  content : '<strong>Rua Pedra Grande, 540 - São Dimas</strong><br>Previsão de chegada - 18:44'
});
marker12.addListener('click', function() {
  infoWindow12.open(map, marker12);
});

///////////////////////////////////////////////////////////

  currentMarkers.push(marker12);

  let marker13 =  new google.maps.Marker({
    position:{ lat:-19.474798934078684, lng: -44.25287323642212}, // R. Pedra Grande, 740 - São Dimas
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow13 = new google.maps.InfoWindow({
  content : '<strong>Rua Pedra Grande, 740 - São Dimas</strong><br>Previsão de chegada - 18:45'
});
marker13.addListener('click', function() {
  infoWindow13.open(map, marker13);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker13);

  let marker14 = new google.maps.Marker({
    position:{ lat:-19.47406068723336, lng: -44.253650930988925}, // R. José Miguel Bichara, 116 - São Dimas
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow14 = new google.maps.InfoWindow({
  content : '<strong>R. José Miguel Bichara, 116 - São Dimas</strong><br>Previsão de chegada - 18:46'
});
marker14.addListener('click', function() {
  infoWindow14.open(map, marker14);
});
///////////////////////////////////////////////////////////

 currentMarkers.push(marker14);

  let marker15 = new google.maps.Marker({
    position:{ lat:-19.4740209579316, lng: -44.25468427679259}, // R. Dr. João Batista, 332 - São Dimas
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow15 = new google.maps.InfoWindow({
  content : '<strong>R. Dr. João Batista, 332 - São Dimas</strong><br>Previsão de chegada - 18:47'
});
marker15.addListener('click', function() {
  infoWindow15.open(map, marker15);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker15);

  let marker16 = new google.maps.Marker({
    position:{ lat:-19.474413577872376, lng: -44.25599036687171}, // R. Dr. João Batista, 478 - São Dimas
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow16 = new google.maps.InfoWindow({
  content : '<strong>R. Dr. João Batista, 478 - São Dimas</strong><br>Previsão de chegada - 18:50'
});
marker16.addListener('click', function() {
  infoWindow16.open(map, marker16);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker16);

  let marker17 = new google.maps.Marker({
    position:{ lat:-19.474792971863394, lng: -44.25739158990841}, // R. Dr. João Batista, 636 - São Jorge
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow17 = new google.maps.InfoWindow({
  content : '<strong>R. Dr. João Batista, 636 - São Dimas</strong><br>Previsão de chegada - 18:52'
});
marker17.addListener('click', function() {
  infoWindow17.open(map, marker17);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker17);

  let marker18 = new google.maps.Marker({
    position:{ lat:-19.475190552883273, lng: -44.25864679274011}, // R. Dr. João Batista, 770 - São Jorge
    icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
  });
const infoWindow18 = new google.maps.InfoWindow({
  content : '<strong>R. Dr. João Batista, 770 - São Dimas</strong><br>Previsão de chegada - 18:55'
});
marker18.addListener('click', function() {
  infoWindow18.open(map, marker18);
});
///////////////////////////////////////////////////////////

  currentMarkers.push(marker18);

  //const svgUniversitIcon = `
  //<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bank2" viewBox="0 0 16 16">
  //<path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916zM12.375 6v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1z"/>
  //</svg>`

    // Una 
   let marker19 = new google.maps.Marker({
  position: { lat: -19.473672781814525, lng: -44.258110004382175 },
  icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgUniversitIcon),
    scaledSize: new google.maps.Size(40, 40)
  },
  map: map,
});

const infoWindow19 = new google.maps.InfoWindow({
  content: `<strong>Faculdade Una</strong><br>
            Previsão de chegada - 19:00 - Fim do Trajeto<br>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSzMQ0TNzbfBqCyF42cxWQuyBkkghIO_2rQ&s" alt="Terminal" width="200">`
});

marker19.addListener('click', function() {
  infoWindow19.open(map, marker19);
});
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////

// Rotas
// Array com as coordenadas dos pontos
const routeCoordinatesUna = [
    { lat: -19.460357809215676, lng: -44.241414321437304 }, // Terminal
    {lat: -19.46066951006829, lng:-44.24082524029431},
    {lat: -19.460957813014804, lng: -44.240793053787115},
    {lat: -19.460922407417407, lng: -44.240782324951375},
    {lat: -19.461160130565908, lng: -44.24107736793405},
    {lat: -19.461423143004968, lng:-44.24107200351617 },
    {lat: -19.461848008351463, lng: -44.24087888447298},
    {lat: -19.46265727262442, lng: -44.24182302201},
    {lat: -19.46271085727255, lng: -44.241872027278255},
    {lat: -19.46310537199793, lng: -44.242097332828656},
    {lat: -19.463051884457094, lng: -44.24393162651921},
    { lat: -19.464180534491476, lng: -44.24328951590929}, // Pt
    {lat: -19.46462674957633, lng: -44.24301975373625},
    {lat: -19.46468365012547, lng: -44.24286552672505},
    {lat: -19.46571782780407, lng: -44.243341246594824},
    { lat: -19.466125986136912, lng: -44.24316545860584},// Pt
    { lat: -19.467338972906898, lng: -44.24259534518369 },// Pt
    { lat: -19.469831111681835, lng: -44.24140315093598},// Pt
    { lat: -19.470822051241473, lng: -44.24089116153965 },// Pt
    { lat: -19.471370561834114, lng: -44.24208575769209},// Pt
    { lat: -19.472594317498682, lng: -44.24429434043715},// Pt
    { lat: -19.471006155671162, lng: -44.24493124524229 },// Pt
    { lat: -19.471227380594247, lng: -44.246512440859235 },// Pt
    { lat: -19.472804344808797, lng: -44.2506887416804 },// Pt
    { lat: -19.47363850286178, lng: -44.25143719523704 },// Pt
    {lat: -19.474392414751275, lng: -44.25201911735474},
    { lat: -19.475039776367137, lng: -44.25311345859954 },// Pt
    { lat: -19.473866431533835, lng: -44.2536445359961 },// Pt
    { lat: -19.4740209579316, lng: -44.25468427679259 },// Pt
    { lat: -19.474413577872376, lng: -44.25599036687171 },// Pt
    { lat: -19.474792971863394, lng: -44.25739158990841 },// Pt
    { lat: -19.475190552883273, lng: -44.25864679274011 },// Pt
  ];

// Criação da rota
currentRoute = new google.maps.Polyline({
  path: routeCoordinatesUna,
  geodesic: true,
  strokeColor: "red",
  strokeOpacity: 0.8,
  strokeWeight: 4,
});

currentRoute.setMap(map);

}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function addMarkersUnifemm(){
  clearMap();
  // Marcadores de pontos
  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "purple",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  const svgPointicon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
  </svg>`

  const svgPointicon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck-front-fill" viewBox="0 0 16 16">
  <path d="M3.5 0A2.5 2.5 0 0 0 1 2.5v9c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2v-9A2.5 2.5 0 0 0 12.5 0zM3 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.9c0 .625-.562 1.092-1.17.994C10.925 7.747 9.208 7.5 8 7.5s-2.925.247-3.83.394A1.008 1.008 0 0 1 3 6.9zm1 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2m8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-5-2h2a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2"/>
</svg>`

 const svgUniversitIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bank2" viewBox="0 0 16 16">
  <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916zM12.375 6v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1z"/>
  </svg>`

  let marker1 = new google.maps.Marker({
    position: { lat: -19.460322438431586, lng: -44.241019358219724 }, // Terminal Urbano
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon2),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
const infoWindow1 = new google.maps.InfoWindow({
  content: '<strong>Terminal Urbado</strong><br>Início do trajeto - 18:30<br><img src="https://setelagoas.com.br/wp-content/uploads/2023/12/terminal-urbano.jpg" alt="Terminal" width="200">'
});

marker1.addListener('click', function() {
  infoWindow1.open(map, marker1);
});
/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker1);

  let marker2 = new google.maps.Marker({
    position: { lat:-19.464174217373383, lng: -44.24330525293914  }, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow2 = new google.maps.InfoWindow({
  content: '<strong>Rua Senhor Dos Passos, 260</strong><br>Horário de Chegada Previsto: 18:32'
});

marker2.addListener('click', function() {
  infoWindow2.open(map, marker2);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker2);

   let marker3 = new google.maps.Marker({
    position: { lat:-19.466290696841664, lng: -44.24480684884705}, // FAculdade Promove
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgUniversitIcon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow3 = new google.maps.InfoWindow({
  content: '<strong>Faculdede Promove</strong><br>Horário de Chegada Previsto: 18:34<br><img src="https://teclemidia.com/wp-content/uploads/2022/08/promove181021-1200x900.jpg" alt="Promove" width="200">'
});

marker3.addListener('click', function() {
  infoWindow3.open(map, marker3);
});

/////////////////////////////////////////////////////////////////
  
  currentMarkers.push(marker3);

  let marker4 = new google.maps.Marker({
    position: { lat:-19.467381292959985, lng: -44.24258638653861}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow4 = new google.maps.InfoWindow({
  content: '<strong>R. Cel. Antônio Andrade, 1204 - São Geraldo, Sete Lagoas</strong><br>Horário de Chegada Previsto: 18:35<br>'
});

marker4.addListener('click', function() {
  infoWindow4.open(map, marker4);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker4);

  let marker5 = new google.maps.Marker({
    position: { lat: -19.469832907893476,lng: -44.24142089498256}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow5 = new google.maps.InfoWindow({
  content: '<strong>R. Elvira de Vasconcelos, 13 - Piedade</strong><br>Horário de Chegada Previsto: 18:36<br>'
});

marker5.addListener('click', function() {
  infoWindow5.open(map, marker5);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker5);

  let marker6 = new google.maps.Marker({
    position: { lat: -19.47088505485426, lng: -44.24110464499268}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
   const infoWindow6 = new google.maps.InfoWindow({
  content: '<strong>R. João Libório Júnior, 460 - São Geraldo, </strong><br>Horário de Chegada Previsto: 18:37<br>'
});

marker6.addListener('click', function() {
  infoWindow6.open(map, marker6);
});


/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker6);

  let marker7 = new google.maps.Marker({
    position: { lat:-19.47141494881151, lng: -44.24226295157203 }, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
   const infoWindow7 = new google.maps.InfoWindow({
  content: '<strong>R. João Libório Júnior, 586 - São Geraldo</strong><br>Horário de Chegada Previsto: 18:38<br>'
});

marker7.addListener('click', function() {
  infoWindow7.open(map, marker7);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker7);
  
let marker8 = new google.maps.Marker({
    position: { lat: -19.472198457761078, lng: -44.24368337154495}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow8 = new google.maps.InfoWindow({
  content: '<strong>R. João Libório Júnior, 764 - São Geraldo</strong><br>Horário de Chegada Previsto: 18:39<br>'
});

marker8.addListener('click', function() {
  infoWindow8.open(map, marker8);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker8);

  let marker9 = new google.maps.Marker({
    position: { lat:-19.471193969859765, lng: -44.24481532020506 }, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow9 = new google.maps.InfoWindow({
  content: '<strong>R. Gen. Osório, 25 - São Geraldo</strong><br>Horário de Chegada Previsto: 18:40<br>'
});

marker9.addListener('click', function() {
  infoWindow9.open(map, marker9);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker9);

  let marker10 = new google.maps.Marker({
    position: { lat:-19.47132549857777, lng: -44.24670716173255}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow10 = new google.maps.InfoWindow({
  content: '<strong>R. Pedra Grande, 83 - São Dimas</strong><br>Horário de Chegada Previsto: 18:41<br>'
});

marker10.addListener('click', function() {
  infoWindow10.open(map, marker10);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker10);

  let marker11 = new google.maps.Marker({
    position: { lat:-19.47216734173203, lng: -44.24885288417179}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow11 = new google.maps.InfoWindow({
  content: '<strong>R. Pedra Grande, 213 - São Dimas</strong><br>Horário de Chegada Previsto: 18:43<br>'
});

marker11.addListener('click', function() {
  infoWindow11.open(map, marker11);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker11);

  let marker12 = new google.maps.Marker({
    position: { lat:-19.473665804680433, lng: -44.25141680573955}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow12 = new google.maps.InfoWindow({
  content: '<strong>R. Pedra Grande, 539 - São Dimas</strong><br>Horário de Chegada Previsto: 18:44<br>'
});

marker12.addListener('click', function() {
  infoWindow12.open(map, marker12);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker12);

  let marker13 = new google.maps.Marker({
    position: { lat:-19.474887111169238, lng: -44.252835675514845}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow13 = new google.maps.InfoWindow({
  content: '<strong>R. Pedra Grande, 740 - São Dimas</strong><br>Horário de Chegada Previsto: 18:45<br>'
});

marker13.addListener('click', function() {
  infoWindow13.open(map, marker13);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker13);

  let marker14 = new google.maps.Marker({
    position: { lat:-19.474024073191348, lng: -44.253597683123694}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow14 = new google.maps.InfoWindow({
  content: '<strong>R. José Miguel Bichara, 109 - São Dimas</strong><br>Horário de Chegada Previsto: 18:46<br>'
});

marker14.addListener('click', function() {
  infoWindow14.open(map, marker14);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker14);

  let marker15 = new google.maps.Marker({
    position: { lat: -19.474133990697, lng: -44.254649249992674}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow15 = new google.maps.InfoWindow({
  content: '<strong>R. Dr. João Batista, 332 - São Dimas</strong><br>Horário de Chegada Previsto: 18:47<br>'
});

marker15.addListener('click', function() {
  infoWindow15.open(map, marker15);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker15);

  let marker16 = new google.maps.Marker({
    position: { lat: -19.47450619250538, lng: -44.25596666054674}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
   const infoWindow16 = new google.maps.InfoWindow({
  content: '<strong>R. Dr. João Batista, 478 - São Dimas</strong><br>Horário de Chegada Previsto: 18:48<br>'
});

marker16.addListener('click', function() {
  infoWindow16.open(map, marker16);
});


/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker16);

  let marker17 = new google.maps.Marker({
    position: { lat: -19.47493658954778, lng: -44.25735577276465}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow17 = new google.maps.InfoWindow({
  content: '<strong>R. Dr. João Batista, 637 - São Jorge</strong><br>Horário de Chegada Previsto: 18:50<br>'
});

marker17.addListener('click', function() {
  infoWindow17.open(map, marker17);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker17);

  let marker18 = new google.maps.Marker({
    position: { lat: -19.475288639530508, lng: -44.258609001062595}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow18 = new google.maps.InfoWindow({
  content: '<strong>R. Dr. João Batista, 770 - São Jorge</strong><br>Horário de Chegada Previsto: 18:51<br>'
});

marker18.addListener('click', function() {
  infoWindow18.open(map, marker18);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker18);

  let marker19 = new google.maps.Marker({
    position: { lat: -19.475983016536393, lng: -44.26041374958017}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow19 = new google.maps.InfoWindow({
  content: '<strong>R. Dr. João Batista, 987 - Santo Antonio</strong><br>Horário de Chegada Previsto: 18:52<br>'
});

marker19.addListener('click', function() {
  infoWindow19.open(map, marker19);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker19);

  let marker20 = new google.maps.Marker({
    position: { lat: -19.476680317073896, lng: -44.26173017792667}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
   const infoWindow20 = new google.maps.InfoWindow({
  content: '<strong>R. Dr. João Batista, 1154 - Santo Antonio</strong><br>Horário de Chegada Previsto: 18:53<br>'
});

marker20.addListener('click', function() {
  infoWindow20.open(map, marker20);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker20);

  let marker21 = new google.maps.Marker({
    position: { lat: -19.47775885255019, lng: -44.26205154679238}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow21 = new google.maps.InfoWindow({
  content: '<strong>R. Afonso Carlos Capanema, 98 - Sete Lagoas</strong><br>Horário de Chegada Previsto: 18:54<br>'
});

marker21.addListener('click', function() {
  infoWindow21.open(map, marker21);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker21);

  let marker22 = new google.maps.Marker({
    position: { lat: -19.479662421219224, lng: -44.26138368259767}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow22 = new google.maps.InfoWindow({
  content: '<strong>R. Afonso Carlos Capanema, 168 - São Cristovao</strong><br>Horário de Chegada Previsto: 18:55<br>'
});

marker22.addListener('click', function() {
  infoWindow22.open(map, marker22);
});

/////////////////////////////////////////////////////////////////
  
  currentMarkers.push(marker22);

  let marker23 = new google.maps.Marker({
    position: { lat: -19.481180348336302, lng: -44.26104701128165}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow23 = new google.maps.InfoWindow({
  content: '<strong>R. Afonso Carlos Capanema, 322 - Vale das Palmeiras</strong><br>Horário de Chegada Previsto: 18:56<br>'
});

marker23.addListener('click', function() {
  infoWindow23.open(map, marker23);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker23);

  let marker24 = new google.maps.Marker({
    position: { lat: -19.481885667972367, lng: -44.26171030302012}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow24 = new google.maps.InfoWindow({
  content: '<strong>R. Fortuna de Minas, 75A - Santo Antonio</strong><br>Horário de Chegada Previsto: 18:57<br>'
});

marker24.addListener('click', function() {
  infoWindow24.open(map, marker24);
});


/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker24);

  let marker25 = new google.maps.Marker({
    position: { lat: -19.482441939726858, lng: -44.26295773516203}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow25 = new google.maps.InfoWindow({
  content: '<strong>R. Fortuna de Minas, 259 - Santo Antonio</strong><br>Horário de Chegada Previsto: 18:58<br>'
});

marker25.addListener('click', function() {
  infoWindow25.open(map, marker25);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker25);

  let marker26 = new google.maps.Marker({
    position: { lat: -19.4827521352618, lng: -44.26383821164144}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow26 = new google.maps.InfoWindow({
  content: '<strong>R. Fortuna de Minas, 335 - Santo Antonio</strong><br>Horário de Chegada Previsto: 18:59<br>'
});

marker26.addListener('click', function() {
  infoWindow26.open(map, marker26);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker26);

  let marker27 = new google.maps.Marker({
    position: { lat: -19.483251700164296, lng: -44.265265098058016}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow27 = new google.maps.InfoWindow({
  content: '<strong>R. Fortuna de Minas, 490 - Santo Antonio</strong><br>Horário de Chegada Previsto: 18:59<br>'
});

marker27.addListener('click', function() {
  infoWindow27.open(map, marker27);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker27);

  let marker28 = new google.maps.Marker({
    position: { lat: -19.483245273956815, lng: -44.265265098058016}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow28 = new google.maps.InfoWindow({
  content: '<strong>Possivel erro</strong><br>Horário de Chegada Previsto: 18:37<br>'
});

marker28.addListener('click', function() {
  infoWindow28.open(map, marker28);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker28);

  let marker29 = new google.maps.Marker({
    position: { lat:-19.48248989067895, lng: -44.26588601770707}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow29 = new google.maps.InfoWindow({
  content: '<strong>R. Gustavo Ferreira Gomes, 46 - Santo Antonio</strong><br>Horário de Chegada Previsto: 19:00<br>'
});

marker29.addListener('click', function() {
  infoWindow29.open(map, marker29);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker29);

  let marker30 = new google.maps.Marker({
    position: { lat:-19.48248989067895, lng: -44.26588601770707}, 
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgPointicon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow30 = new google.maps.InfoWindow({
  content: '<strong>R. Gustavo Ferreira Gomes, 46 - Santo Antonio</strong><br>Horário de Chegada Previsto: 19:01<br>'
});

marker30.addListener('click', function() {
  infoWindow30.open(map, marker30);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker30);

  let marker31 = new google.maps.Marker({
    position: { lat: -19.48255688470481, lng: -44.26685659276452}, // Unifemm
    icon: {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgUniversitIcon),
      scaledSize: new google.maps.Size(40, 40)
    },
    map: map,
  });
  const infoWindow31 = new google.maps.InfoWindow({
  content: '<strong>Faculdede Unifem</strong><br>Horário de Chegada Previsto: 19:05 - Fim do Trajeto<br><img src="https://i0.wp.com/7diasnews.com.br/wp-content/uploads/2023/11/unifemm.jpg?fit=800%2C533&ssl=1" width="200">'
});

marker31.addListener('click', function() {
  infoWindow31.open(map, marker31);
});

/////////////////////////////////////////////////////////////////

  currentMarkers.push(marker31);

//// Rotas////
// Array com as coordenadas dos pontos
const routeCoordinatesUnifemm = [
  { lat: -19.460322438431586, lng: -44.241019358219724 }, // Terminal Urbano - Ponto 1
  {lat: -19.46066951006829, lng:-44.24082524029431},
  {lat: -19.460957813014804, lng: -44.240793053787115},
  {lat: -19.461160130565908, lng: -44.24107736793405},
  {lat: -19.461423143004968, lng:-44.24107200351617 },
  {lat: -19.461848008351463, lng: -44.24087888447298},
  {lat: -19.46265727262442, lng: -44.24182302201},
  {lat: -19.46271085727255, lng: -44.241872027278255},
  {lat: -19.46310537199793, lng: -44.242097332828656},
  {lat: -19.463051884457094, lng: -44.24393162651921},
  { lat: -19.464174217373383, lng: -44.24330525293914 },   // Ponto 2
  {lat: -19.46462674957633, lng: -44.24301975373625},
  {lat: -19.46468365012547, lng: -44.24286552672505},
  {lat: -19.46571782780407, lng: -44.243341246594824},
  //{ lat: -19.466290696841664, lng: -44.24480684884705 },   // Faculdade Promove - Ponto 3
  { lat: -19.467381292959985, lng: -44.24258638653861 },   // Ponto 4
  { lat: -19.469832907893476, lng: -44.24142089498256 },   // Ponto 5
  { lat: -19.47088505485426, lng: -44.24110464499268 },    // Ponto 6
  {lat: -19.471370561834114, lng: -44.24208575769209},    // Ponto 7
  { lat: -19.472198457761078, lng: -44.24368337154495 },   // Ponto 8
  {lat: -19.472564983217918, lng: -44.24428152405622},
  { lat: -19.471193969859765, lng: -44.24481532020506 },   // Ponto 9
  { lat: -19.47132549857777, lng: -44.24670716173255 },    // Ponto 10
  { lat: -19.47216734173203, lng: -44.24885288417179 },    // Ponto 11
  { lat: -19.473665804680433, lng: -44.25141680573955 },   // Ponto 12
  { lat: -19.474887111169238, lng: -44.252835675514845 },  // Ponto 13
  { lat: -19.474024073191348, lng: -44.253597683123694 },  // Ponto 14
  { lat: -19.474133990697, lng: -44.254649249992674 },     // Ponto 15
  { lat: -19.47450619250538, lng: -44.25596666054674 },    // Ponto 16
  { lat: -19.47493658954778, lng: -44.25735577276465 },    // Ponto 17
  { lat: -19.475288639530508, lng: -44.258609001062595 },  // Ponto 18
  { lat: -19.475983016536393, lng: -44.26041374958017 },   // Ponto 19
  { lat: -19.476680317073896, lng: -44.26173017792667 },   // Ponto 20
  { lat: -19.47775885255019, lng: -44.26205154679238 },    // Ponto 21
  { lat: -19.479662421219224, lng: -44.26138368259767 },   // Ponto 22
  { lat: -19.481180348336302, lng: -44.26104701128165 },   // Ponto 23
  { lat: -19.481885667972367, lng: -44.26171030302012 },   // Ponto 24
  { lat: -19.482441939726858, lng: -44.26295773516203 },   // Ponto 25
  { lat: -19.4827521352618, lng: -44.26383821164144 },     // Ponto 26
  { lat: -19.483251700164296, lng: -44.265265098058016 },  // Ponto 27
  { lat: -19.483245273956815, lng: -44.265265098058016 },  // Ponto 28
  { lat: -19.48248989067895, lng: -44.26588601770707 },    // Ponto 29
  { lat: -19.48248989067895, lng: -44.26588601770707 },    // Ponto 30
  { lat: -19.48255688470481, lng: -44.26685659276452 },    // Unifemm - Ponto 31
];

//// Criação da rota////
currentRoute = new google.maps.Polyline({
  path: routeCoordinatesUnifemm,
  geodesic: true,
  strokeColor: "green",
  strokeOpacity: 0.8,
  strokeWeight: 4,
});

currentRoute.setMap(map);

}
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -19.4566, lng: -44.2413  }, // Brasília padrão
    zoom: 14,
  });

  directionsRenderer.setMap(map);

  const originInput = document.getElementById("origin-input");
  const destinationInput = document.getElementById("destination-input");

  new google.maps.places.Autocomplete(originInput);
  new google.maps.places.Autocomplete(destinationInput);


  document.getElementById('showMarkersBtn').addEventListener('click', function() {
  document.getElementById('Box-Horarios').style.display = 'block';
  addMarkers(); 
});

 document.getElementById('showMarkersBtn_Unifem').addEventListener('click', function() {
    document.getElementById('Box-Horarios').style.display = 'block';
    addMarkersUnifemm();
  });
}
//////////////////////////////////////////////////////////////////////////////////////

function showMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      userLocation = { lat: latitude, lng: longitude };
      map.setCenter(userLocation);

      if (marker) {
        marker.setMap(null);
      }

      marker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Sua Localização",
      });

      document.getElementById('map-container').style.display = 'block';
      document.querySelector(".container").style.display = "none";
    }, function(error) {
      alert("Não foi possível obter a localização. Erro: " + error.message);
    });
  } else {
    alert("A Geolocalização não é suportada neste navegador.");
  }
}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function toggleForm() {
  const signupPanel = document.getElementById("signupPanel");
  const loginForm = document.querySelector(".right-panel");

  if (loginForm.style.display !== "none") {
    loginForm.style.display = "none";
    signupPanel.style.display = "block";
  } else {
    signupPanel.style.display = "none";
    loginForm.style.display = "block";
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function toggleForm() {
  const signupPanel = document.getElementById("signupPanel");
  const loginForm = document.querySelector(".right-panel");

  if (!signupPanel.classList.contains("active")) {
    signupPanel.classList.add("active");
    loginForm.style.display = "none";
  } else {
    signupPanel.classList.remove("active");
    loginForm.style.display = "flex";
  }
}
//////////////////////////////////////////////////////////////////////////////////////

 const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const senha = loginForm.querySelector('input[type="password"]').value;

    const resp = await fetch('/usuarios/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, senha })
    });

    console.log('Status do login:', resp.status);

    if (resp.ok) {
      document.querySelector(".container").style.display = "none";
      document.getElementById("map-container").style.display = "block";
    } else {
      alert('Email ou senha inválidos!');
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////
// Pegando todos os botões da página
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Adiciona a classe de animação
    button.classList.add('bounce');

    // Remove a classe depois que a animação terminar (para poder reanimar no próximo clique)
    button.addEventListener('animationend', function() {
      button.classList.remove('bounce');
    }, { once: true });
  });
});

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Pegue os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Monta o objeto usuário
    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Envia para o backend
    const resp = await fetch('/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuario)
    });

    if (resp.ok) {
        alert('Usuário cadastrado com sucesso!');
        this.reset();
    } else {
        alert('Erro ao cadastrar usuário!');
    }
});