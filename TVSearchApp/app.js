const form = document.querySelector('#SearchForm');
const div = document.querySelector('#container');

const displayImages = (shows) => {
    for (let show of shows) {
        if (show.show.image) {
            const img = document.createElement('IMG');
            img.src = show.show.image.medium;
            // document.body.append(img);
            div.append(img);
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Borrar las imagenes anteriores
    const images = document.querySelectorAll('img');
    images.forEach((image) => image.remove());
    // console.dir(form)
    // Extraer el valor del input del formulario
    const searchTitle = form.elements.query.value;
    try {
        const config = { params: { q: searchTitle } }
        const resp = await axios.get(`http://api.tvmaze.com/search/shows` , config);
        console.log(resp.data);
        displayImages(resp.data);


    } catch (e) {
        console.log('Error', e);
    }
    // Limpiar el formulario
    form.elements.query.value = '';
})