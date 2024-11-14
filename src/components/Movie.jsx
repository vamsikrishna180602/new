import React,{useState} from 'react'
import axios from "axios"


function Movie() {

const [searchMovie,setSearchMovie]= useState("");
const [movieData,setMovieData] = useState([]);
const [loading,setLoading] = useState(false)
const [ error,setError] = useState([])


const handleSubmit = (e) => {
e.preventDefault();
setLoading(true)
setError("")
setMovieData([])
axios 
  .get(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=cfe422613b250f702980a3bbf9e90716`)
  .then((res)=>{
    if(res.data.results.length=== 0){
       setError("no movies found!")
    }else {
    setMovieData(res.data.results)
  }
  })

.catch((err) => {
  setError("something went wrong")
})
.finally(() =>{
  setLoading(false)
})


}


  return (
  
    <div className='flex flex-col items-center min-h-screen'>
      <h1 className='font-bold text-3xl mb-5'>Movies App</h1>
      <form  className='mb-5 ' >
        <input className='border border-grey-400 rounded-md p-1 mr-2' type="text" placeholder='search movie' value={searchMovie}  onChange={(e) => {setSearchMovie(e.target.value)}} />
        <span></span>
        <button className='bg-slate-100 rounded-md p-1' onClick={handleSubmit}>search</button>
      </form>
     
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6 m-5">
  {movieData.map((item) => (
    <div key={item.id} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-6 xl:aspect-w-5 object-cover">
        <img
          src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
          alt={item.title}
          className="h-[300px] w-full object-cover group-hover:opacity"
        />
      </div>
      <h3 className="mt-2 text-xl text-gray-700"><b>{item.title}</b></h3>
      <p className="mt-1 text-md font-medium text-gray-900"><b>Rating :</b>{item.vote_average}/10</p>
      <p>{item.overview.length > 120 ? `${item.overview.slice(0,100)}...`:item.overview}</p>
    </div>
  ))}
      </div>
      <div>
    {loading && <p className="text-xl font-bold">Loading...</p>}
    {error && <p className="text-red-500 text-xl font-bold">{error}</p>}
  </div>
      </div>

  )
}

export default Movie
