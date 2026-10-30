/* ==========================================================================
   DATOS DE LA WEB — el único archivo que hay que editar.

   Para añadir una casa: copia un bloque completo de PROPIEDADES
   (desde { hasta },), cambia el id (minúsculas, sin acentos ni espacios)
   y sube sus fotos a /fotos/<id>/ con los nombres que pongas aquí.

   Si un apartado no existe o está vacío (planos, galeria, recorrido2…),
   esa sección no se muestra. Si falta una foto, se ve un degradado
   elegante con el nombre de la estancia en lugar de una imagen rota.
   ========================================================================== */

const AGENCIA = {
    nombre: "Casa Áurea",
    lemaCatalogo: "Propiedades singulares",
    introCatalogo: "Una selección privada de viviendas exclusivas. Entra en cada una y recórrela espacio a espacio.",
    // Número de WhatsApp con prefijo de país, sin "+", espacios ni guiones. ¡Cámbialo por el tuyo!
    whatsapp: "34600000000",
    telefonos: ["+34 600 00 00 00", "+34 910 00 00 00"]
};

const PROPIEDADES = [
{
    id: "duplex-bernabeu",
    nombre: "Dúplex Bernabéu",
    zona: "Paseo de la Castellana · Madrid",
    tipo: "Dúplex",
    estado: "Exclusiva",
    lema: "El corazón de la Castellana",
    precio: "Precio a consultar",
    portada: "portada.jpg",
    video: "portada.mp4",   // opcional: vídeo de fondo en la portada (si no existe, se ve la foto)
    cifras: [["2", "Plantas"], ["2", "Dormitorios"], ["3", "Baños"], ["1", "Piscina privada"]],
    recorrido1: {
        titulo: "Planta uno",
        intro: "Luz natural durante todo el día y espacios que fluyen entre sí.",
        espacios: [
            { foto: "salon.jpg", titulo: "Salón comedor", texto: "Amplio y abierto, con balcón corrido sobre la Castellana." },
            { foto: "estar.jpg", titulo: "Sala de estar", texto: "Un segundo salón independiente para leer, recibir o desconectar." },
            { foto: "escalera.jpg", titulo: "Dos dormitorios, dos baños", texto: "Distribución cómoda unida por una escalera de caracol." }
        ]
    },
    recorrido2: {
        titulo: "Planta dos",
        intro: "La ciudad a tus pies: terraza, invernadero y piscina privada.",
        espacios: [
            { foto: "cocina2.jpg", titulo: "Segunda cocina", texto: "Completa y con despensa." },
            { foto: "invernadero.jpg", titulo: "Terraza e invernadero", texto: "Terraza panorámica con invernadero acristalado y zona chill out." },
            { foto: "piscina.jpg", titulo: "Piscina en la azotea", texto: "Una piscina privada sobre los tejados de Madrid." }
        ]
    },
    panoramica: { foto: "vistas.jpg", video: "vistas.mp4", texto: "Vistas al Santiago Bernabéu" },
    planos: [
        { foto: "plano-1.svg", titulo: "Planta 1", estancias: ["Salón comedor", "Sala de estar", "Cocina con office", "Dormitorio principal en suite", "Balcón", "Segundo dormitorio con baño", "Pasillo con armarios empotrados"] },
        { foto: "plano-2.svg", titulo: "Planta 2", estancias: ["Piscina privada", "Terraza", "Cocina comedor", "Sala de estar", "Invernadero", "Baño completo con ducha"] }
    ],
    dormitorio: {
        foto: "dormitorio.jpg",
        titulo: "Suite principal",
        texto: "Un refugio privado con vestidor, baño en suite y balcón propio.",
        puntos: ["Vestidor iluminado", "Baño en suite", "Balcón privado"]
    },
    bano: {
        foto: "bano.jpg",
        titulo: "Piedra, luz y calma",
        texto: "Acabados en piedra natural y superficies oscuras para una atmósfera serena y exclusiva.",
        puntos: ["Doble lavabo tallado", "Ducha de obra acristalada", "Iluminación ambiental", "Cromoterapia"]
    },
    galeria: [
        { foto: "g1.jpg", texto: "Vistas al estadio" },
        { foto: "g2.jpg", texto: "Invernadero" },
        { foto: "g3.jpg", texto: "Vestidor iluminado" },
        { foto: "g4.jpg", texto: "Ducha con cromoterapia" },
        { foto: "g5.jpg", texto: "Vistas desde la azotea" },
        { foto: "g6.jpg", texto: "Atardecer sobre la Castellana y Torre Picasso" }
    ],
    cerca: [["Estadio Santiago Bernabéu", "2 min"], ["Metro Santiago Bernabéu", "3 min"]]
},
// ← para añadir una casa, copia este bloque, cambia el id y súbele sus fotos a /fotos/<id>/

// ----- Ejemplo inventado: un ático -----
{
    id: "atico-jeronimos",
    nombre: "Ático Los Jerónimos",
    zona: "Retiro · Madrid",
    tipo: "Ático",
    estado: "Nuevo",
    lema: "El Retiro, como jardín propio",
    precio: "3.200.000 €",
    portada: "portada.jpg",
    cifras: [["210", "m² útiles"], ["3", "Dormitorios"], ["3", "Baños"], ["60", "m² de terraza"]],
    recorrido1: {
        titulo: "La vivienda",
        intro: "Una sola planta en un edificio de 1920, ordenada alrededor de la luz del parque.",
        espacios: [
            { foto: "salon.jpg", titulo: "Salón", texto: "Tres balcones al Retiro y suelos de roble en espiga." },
            { foto: "cocina.jpg", titulo: "Cocina", texto: "Abierta, en mármol verde y latón." },
            { foto: "biblioteca.jpg", titulo: "Biblioteca", texto: "Las molduras originales, restauradas una a una." }
        ]
    },
    recorrido2: {
        titulo: "La cubierta",
        intro: "Por una escalera de caracol, el Madrid de los tejados.",
        espacios: [
            { foto: "terraza.jpg", titulo: "Terraza", texto: "Sesenta metros entre las copas de los árboles." },
            { foto: "pergola.jpg", titulo: "Pérgola", texto: "Sombra de glicinia en verano, sol en invierno." },
            { foto: "piscina.jpg", titulo: "Piscina de inmersión", texto: "Pequeña, templada y con vistas al Palacio de Cristal." }
        ]
    },
    panoramica: { foto: "parque.jpg", texto: "Cada estación del parque, desde tu ventana" },
    planos: [
        { foto: "plano-1.svg", titulo: "Planta de vivienda", estancias: ["Salón · 46 m²", "Cocina · 20 m²", "Biblioteca · 16 m²", "Suite principal · 30 m²", "Dos dormitorios dobles", "Tres baños"] }
    ],
    dormitorio: {
        foto: "dormitorio.jpg",
        titulo: "Despertar entre árboles",
        texto: "Al fondo de la casa, mirando al parque. Por la mañana solo se oyen pájaros.",
        puntos: ["Vistas al Retiro", "Baño en suite con ventana", "Armarios de nogal a medida"]
    },
    bano: {
        foto: "bano.jpg",
        titulo: "Lo que tenía alma",
        texto: "Se conservó lo original y se renovó todo lo demás.",
        puntos: ["Suelos hidráulicos recuperados", "Mármol verde Guatemala", "Carpintería de madera original"]
    },
    galeria: [
        { foto: "g1.jpg", texto: "Balcones al parque" },
        { foto: "g2.jpg", texto: "Biblioteca" },
        { foto: "g3.jpg", texto: "Terraza al atardecer" },
        { foto: "g4.jpg", texto: "Piscina de inmersión" },
        { foto: "g5.jpg", texto: "Escalera de caracol" }
    ],
    cerca: [["Parque del Retiro", "1 min"], ["Museo del Prado", "6 min"], ["Puerta de Alcalá", "8 min"], ["Estación de Atocha", "12 min"]]
},

// ----- Ejemplo inventado: una villa (sin planos ni galería: esas secciones no se muestran) -----
{
    id: "villa-sierra-blanca",
    nombre: "Villa Sierra Blanca",
    zona: "Sierra Blanca · Marbella",
    tipo: "Villa",
    estado: "Reservado",
    lema: "El Mediterráneo, en primera fila",
    precio: "6.900.000 €",
    portada: "portada.jpg",
    cifras: [["640", "m² construidos"], ["5", "Dormitorios"], ["6", "Baños"], ["2.100", "m² de parcela"]],
    recorrido1: {
        titulo: "Planta principal",
        intro: "Todo mira al mar.",
        espacios: [
            { foto: "salon.jpg", titulo: "Salón", texto: "Abierto a la terraza de punta a punta." },
            { foto: "cocina.jpg", titulo: "Cocina", texto: "Blanca, luminosa y con despensa." },
            { foto: "comedor.jpg", titulo: "Comedor", texto: "Para cenas largas con la ventana abierta." }
        ]
    },
    recorrido2: {
        titulo: "Exterior",
        intro: "Agua, sombra y horizonte.",
        espacios: [
            { foto: "piscina.jpg", titulo: "Piscina infinita", texto: "El agua se funde con el mar." },
            { foto: "terraza.jpg", titulo: "Terraza", texto: "Doscientos metros entre olivos y lavanda." },
            { foto: "jardin.jpg", titulo: "Jardín", texto: "Mediterráneo y de bajo consumo." }
        ]
    },
    panoramica: { foto: "mar.jpg", texto: "En días claros, al fondo se ve África" },
    dormitorio: {
        foto: "dormitorio.jpg",
        titulo: "Dormir con el mar",
        texto: "Se duerme con las ventanas abiertas y el sonido de las olas.",
        puntos: ["Terraza privada al mar", "Vestidor", "Baño con ducha exterior"]
    },
    bano: {
        foto: "bano.jpg",
        titulo: "Cal, piedra y madera",
        texto: "La arquitectura de siempre del sur, con acabados de hoy.",
        puntos: ["Microcemento a la cal", "Piedra de Macael", "Carpintería de iroko"]
    },
    cerca: [["Sendero de Sierra Blanca", "3 min"], ["Club social", "9 min"], ["Playa de Nagüeles", "25 min"]]
}
];
