# visadoServicioWeb
Ejemplos de comandos de comandos para la prueba del proyecto:
-------------------------------------------------------------

* ` node  main.js   addArtist  'shakira' 'Colombia'`

 addArtist es el comando para poder agregar un artista al sistema, el cual toma como parámetro un artista y su país


*  `node main.js addAlbum 'shakira' 'AlbumUno' 1995`

 aadAlbum agrega un albúm a un artista, que ya existe en el sistema. Los parametros son el nombre del artista al que se le quiere agregar   el albúm, seguido del nombre del disco y del año de creación del mismo

*  `node main.js addTrack  'AlbumnUno' 'track1' 150 'pop'`

 addTrack agrega un track a un disco determinado. Los parametros son el nombre del disco al que se le quiere agregar el track, el nombre  del mismo, su duración y el género al que pertenece.

* `node main.js addPlaylist 'miListaDeReproducion' 'rock' 'pop' 2000`

addPlaylist genera una lista de reproducción nueva. Los parametros que toma son el nombre que le querramos dar, los generos que deseemos con su respectiva duración

* `node main.js getArtistByName 'shakira'`

getArtisByName devuelve todo el contenido cargado en el sistema de ese artista, albumes con track y pais de origen del artista. El parámetro que toma es el nombre del artista.

* ` node main.js getAlbumByName 'AlbumUno'`

getAlbumByName devuelve el contenido de un albúm con los tracks que contiene y el artista que lo creo. Toma como parámetro el nombre del albúm

* `node main.js getTrackByName 'tackUno'`

getTrackByName toma como parámetro el nombre del track y  devuelve el contenido del mismo con sus respectivos datos, como son la duración y el género al que pertenece.

*`node main.js getPlaylistByName ´miListadeReproduccion´`
getPlaylistByName toma como parámetro el nombre de la lista de reproducción que deseamos buscar y devuelve la duración y los genéros que contiene. 


