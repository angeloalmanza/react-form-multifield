import { useState } from "react"

function App() {
  const initialDataForm = {
    title: "",
    description: "",
    author: "",
    image: "", 
    category: "",
    available: false
  }

  const [posts, setPosts] = useState([]);

  // Variabile per l'input
  const [formData, setFormData] = useState(initialDataForm)

  /**
   *funzione che aggiunge un nuovo post alla lista
   * @param {*} event
   */
  const handlePostForm = (event) => {
    event.preventDefault();

    // Creo l'oggetto del nuovo post
    const newPost = {
      ...formData,
      id: Date.now()
    }

    // Creo la copia della lista, e aggiungo il nuovo Post
    const newArray = [...posts, newPost];

    // Aggiorno lo stato della lista
    setPosts(newArray);

    // Ripulisco il campo del form
    setFormData(initialDataForm)
  };

  /**
   * funzione che cancella un post
   * @param {*} idDaCancellare
   */
  const cancella = (idDaCancellare) => {
    const newArray = posts.filter(curPost => curPost.id !== idDaCancellare)
    setPosts(newArray)
  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;
    let newValue;

    if(event.target.type === "checkbox"){
      newValue = event.target.checked;
    }else{
      newValue = event.target.value;
    }

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    }
    setFormData(newData);
  }

  return (
    <>
      <div className="container">
        <section>
          <h1>I miei Post</h1>

          {/* Card per i post */}
          {posts.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {posts.map((curPost) => (
                <div className="col" key={curPost.id}>
                  <div className="card mb-3">
                    <img src={curPost.image || "https://via.placeholder.com/150"} className="card-img-top h-50"/>
                    <div className="card-body">
                      <h4>{curPost.title}</h4>
                      <p>{curPost.description}</p>
                      <h6>{curPost.author}</h6>
                      <h6>{curPost.category}</h6>
                      <p>
                        Stato:{" "}
                        {curPost.available ? "Pubblicato" : "Non Pubblicato"}
                      </p>
                      <button onClick={() => {cancella(curPost.id)}} className="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <p>Nessun Post inserito</p>
          )}
        </section>
        
        {/* Sezione del form */}
        <section>
          <h3>Inserisci un nuovo post</h3>
          <form onSubmit={handlePostForm}>
            <div className="mb-3">
              <label htmlFor="postTitle">Titolo del Post</label>
              <input 
              type="text"
              className="form-control"
              id="postTitle"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postDescription">Contenuto del Post</label>
              <textarea
              type="text"
              className="form-control"
              id="postDescription"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postAuthor">Autore del Post</label>
              <input
              type="text"
              className="form-control"
              id="postAuthor"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postImage"> URL Immagine del Post (lascia vuoto per immagine di default)</label>
              <input
              type="text"
              className="form-control"
              id="postImage"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postCategory">Categoria</label>
              <select
                className="form-control"
                id="postCategory"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Notizie">Notizie</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Sport">Sport</option>
                <option value="Intrattenimento">Intrattenimento</option>
                <option value="Giardinaggio">Giardinaggio</option>
              </select>
            </div>
            <div className="mb-3 form-check">
              <label htmlFor="postAvailable">Pubblica subito</label>
              <input
                type="checkbox"
                className="form-check-input"
                id="postAvailable"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Aggiungi</button>
          </form>
        </section>
      </div>
    </>
  )
}

export default App
