/* ==========================================================================
   FOTOS Y VÍDEOS DE PRUEBA — solo para ver cómo queda la web.

   La web busca primero cada archivo en fotos/<id>/. Si no está, usa la
   dirección de esta lista. Cuando subas tus fotos reales, se verán ellas.

   Para quitar la prueba: borra este archivo y la línea
   <script src="prueba.js"></script> de index.html.

   Fotos: Unsplash (uso libre, https://unsplash.com/license).
   ========================================================================== */

(function () {
    const u = (id) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=1800&q=80";

    window.FOTOS_PRUEBA = {
        // ---------- Dúplex Bernabéu ----------
        "duplex-bernabeu/portada.jpg": u("photo-1600607687939-ce8a6c25118c"),
        "duplex-bernabeu/salon.jpg": u("photo-1600210492486-724fe5c67fb0"),
        "duplex-bernabeu/estar.jpg": u("photo-1493809842364-78817add7ffb"),
        "duplex-bernabeu/escalera.jpg": u("photo-1600566753086-00f18fb6b3ea"),
        "duplex-bernabeu/cocina2.jpg": u("photo-1556909114-f6e7ad7d3136"),
        "duplex-bernabeu/invernadero.jpg": u("photo-1600607688969-a5bfcd646154"),
        "duplex-bernabeu/piscina.jpg": u("photo-1571896349842-33c89424de2d"),
        "duplex-bernabeu/vistas.jpg": u("photo-1477959858617-67f85cf4f1df"),
        "duplex-bernabeu/dormitorio.jpg": u("photo-1505693416388-ac5ce068fe85"),
        "duplex-bernabeu/bano.jpg": u("photo-1552321554-5fefe8c9ef14"),
        "duplex-bernabeu/g1.jpg": u("photo-1600585154526-990dced4db0d"),
        "duplex-bernabeu/g2.jpg": u("photo-1600607687644-c7171b42498f"),
        "duplex-bernabeu/g3.jpg": u("photo-1617806118233-18e1de247200"),
        "duplex-bernabeu/g4.jpg": u("photo-1584622650111-993a426fbf0a"),
        "duplex-bernabeu/g5.jpg": u("photo-1505761671935-60b3a7427bad"),
        "duplex-bernabeu/g6.jpg": u("photo-1480714378408-67cf0d13bc1b"),

        // ---------- Ático Los Jerónimos ----------
        "atico-jeronimos/portada.jpg": u("photo-1502672260266-1c1ef2d93688"),
        "atico-jeronimos/salon.jpg": u("photo-1507089947368-19c1da9775ae"),
        "atico-jeronimos/cocina.jpg": u("photo-1484154218962-a197022b5858"),
        "atico-jeronimos/biblioteca.jpg": u("photo-1600573472550-8090b5e0745e"),
        "atico-jeronimos/terraza.jpg": u("photo-1600047509807-ba8f99d2cdde"),
        "atico-jeronimos/pergola.jpg": u("photo-1600566752355-35792bedcfea"),
        "atico-jeronimos/piscina.jpg": u("photo-1582268611958-ebfd161ef9cf"),
        "atico-jeronimos/parque.jpg": u("photo-1449824913935-59a10b8d2000"),
        "atico-jeronimos/dormitorio.jpg": u("photo-1540518614846-7eded433c457"),
        "atico-jeronimos/bano.jpg": u("photo-1620626011761-996317b8d101"),
        "atico-jeronimos/g1.jpg": u("photo-1522708323590-d24dbb6b0267"),
        "atico-jeronimos/g2.jpg": u("photo-1560448204-e02f11c3d0e2"),
        "atico-jeronimos/g3.jpg": u("photo-1600210491892-03d54c0aaf87"),
        "atico-jeronimos/g4.jpg": u("photo-1600121848594-d8644e57abab"),
        "atico-jeronimos/g5.jpg": u("photo-1595526114035-0d45ed16cfbf"),

        // ---------- Villa Sierra Blanca ----------
        "villa-sierra-blanca/portada.jpg": u("photo-1613490493576-7fde63acd811"),
        "villa-sierra-blanca/salon.jpg": u("photo-1600566753190-17f0baa2a6c3"),
        "villa-sierra-blanca/cocina.jpg": u("photo-1600585154340-be6161a56a0c"),
        "villa-sierra-blanca/comedor.jpg": u("photo-1600596542815-ffad4c1539a9"),
        "villa-sierra-blanca/piscina.jpg": u("photo-1564013799919-ab600027ffc6"),
        "villa-sierra-blanca/terraza.jpg": u("photo-1499793983690-e29da59ef1c2"),
        "villa-sierra-blanca/jardin.jpg": u("photo-1512917774080-9991f1c4c750"),
        "villa-sierra-blanca/mar.jpg": u("photo-1507525428034-b723cf961d3e"),
        "villa-sierra-blanca/dormitorio.jpg": u("photo-1595526114035-0d45ed16cfbf"),
        "villa-sierra-blanca/bano.jpg": u("photo-1552321554-5fefe8c9ef14")

        // Vídeos: añade aquí la dirección de un .mp4 con la misma clave que en
        // propiedades.js, por ejemplo:
        // "duplex-bernabeu/portada.mp4": "https://…/video.mp4"
    };
})();
