import { useEffect, useState } from 'react';
import axios from 'axios'
import PostCards from '../post-cards/PostCards';
import { BASEURL } from '../../assets/util';



const HomePage = () => {
  const [post, setPost] = useState([])
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // ==> SET/READ DATA 
    (async () => {
        const { data: posts } = await axios.get(BASEURL)
        setPost(posts)
    })();

  }, [])


  // ===> UPDATE DATA
  const handleUpdate = async(obj, shutModal) => {
    const { data: posts } = await axios.put(BASEURL + `/${obj.id}`, obj)

    let localPost = post.map((response) => {
        if (response.id === posts.id){
            return posts
        }
        return response;
    })

    if (localPost.length){
        setPost(localPost);
        shutModal(false)
    }

  }

  // ===> CREATE DATA
  const postData = async (e) => {
    e.preventDefault()
    const {data: res} = await axios.post(BASEURL, {
        body,
        title,
    })

    const posts = [res, ...post]
    setPost(posts)
  }

  // ==> DELETE DATA 
  const handleDelete = async (id) => {
    const previousPost = post

    const posts = post.filter(p => p.id !== id)

    setPost(posts)

    // try delete selected post:
    //  if failed, revert back to post prev state
    try{
      await axios.delete(BASEURL + `/${id}`)
    } catch(e){
        alert('Something Went Wrong While Deleting Post')
        setPost(previousPost)
    }
  }

  return (
    <div className="App">
      {/* create data with form */}
      <form onSubmit={(e) => postData(e)}className="update-form">
          <div className='update-form-lists'>
              <input required type='text' placeholder='Enter Post Title' value={title} onChange={(e) => setTitle(e.target.value)}/>

              <input type='text' required value={body} placeholder='Enter Post Body' onChange={(e) => setBody(e.target.value)}/>
          </div>

          <button 
            disabled={title.length >= 1 && body.length >= 3 ? false : true} 
            type='submit'
          >Create Post</button>
       </form>

      <PostCards 
        onUpdate={handleUpdate} 
        onDelete={(id) => handleDelete(id)} 
        data={post} 
      />

    </div>
  );
}

export default HomePage;
