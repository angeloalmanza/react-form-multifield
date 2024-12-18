import { useState } from "react"

function App() {
  const [posts, setPosts] = useState([]);

  // Variabile per l'input
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postAuthor, setPostAuthor] = useState("");

  /**
   *funzione che aggiunge un nuovo post alla lista
   * @param {*} event
   */
  const handlePostForm = (event) => {
    event.preventDefault();

    // Creo l'oggetto del nuovo post
    const newPost = {
      id: Date.now(),
      title: postTitle,
      description: postDescription,
      author: postAuthor
    }

    // Creo la copia della lista, e aggiungo il nuovo Post
    const newArray = [...posts, newPost];

    // Aggiorno lo stato della lista
    setPosts(newArray);

    // Ripulisco il campo del form
    setPostTitle("");
    setPostDescription("");
  };

  /**
   * funzione che cancella un post
   * @param {*} idDaCancellare
   */
  const cancella = (idDaCancellare) => {
    const newArray = posts.filter(curPost => curPost.id !== idDaCancellare)
    setPosts(newArray)
  };

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
                  <div className="card">
                    <div className="card-body">
                      <h4>{curPost.title}</h4>
                      <p>{curPost.description}</p>
                      <h6>{curPost.author}</h6>
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
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postDescription">Contenuto del Post</label>
              <textarea
              type="text"
              className="form-control"
              id="postDescription"
              value={postDescription}
              onChange={(event) => setPostDescription(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postAuthor">Autore del Post</label>
              <input
              type="text"
              className="form-control"
              id="postAuthor"
              value={postAuthor}
              onChange={(event) => setPostAuthor(event.target.value)}
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
