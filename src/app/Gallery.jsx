import "./Gallery.css"
import Head from 'next/head';

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Gallery</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid-container">
        {/* Images */}
        <div className="grid-item">
          <img src="/nature1.jpg" alt="Image 1" />
          <p className="image-text" >Exploring the serene beauty of untouched landscapes, <br></br>we embark on a journey filled with wonder and discovery</p>
        </div>
     
        <div className="grid-item">
          <img src="/nature2.jpg" alt="Image 2" />
          <p className="image-text" >Exploring the serene beauty of untouched landscapes, <br></br>we embark on a journey filled with wonder and discovery</p>
          </div>
        <div className="grid-item">
          <img src="/nature3.jpg" alt="Image 1" />
          <p className="image-text" >Exploring the serene beauty of untouched landscapes, <br></br>we embark on a journey filled with wonder and discovery</p>
       
        </div>
        <div className="grid-item">
          <img src="/nature4.jpg" alt="Image 2" />
          <p className="image-text" >Exploring the serene beauty of untouched landscapes, <br></br>we embark on a journey filled with wonder and discovery</p>
       
        </div>
        <div className="grid-item">
          <img src="/nature2.jpg" alt="Image 1" />
        
          <p className="image-text" >Exploring the serene beauty of untouched landscapes, <br></br>we embark on a journey filled with wonder and discovery</p>
       </div>
        <div className="grid-item">
          <img src="/nature3.jpg" alt="Image 2" />
          <p className="image-text" >Exploring the serene beauty of untouched landscapes, <br></br>we embark on a journey filled with wonder and discovery</p>
       
        </div>
        {/* Add more grid items here */}
      </div>
      
      <div className="mt-8">
        <br></br>
  
      </div>
    </div>
  );
};

export default Gallery;
