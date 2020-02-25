import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getPosts } from '../redux/actions/fooActions';
import { setCount } from '../redux/actions/counter'

import Data from "../data/quiz";
import Link from "next/link";
import PageHead from "../components/Head";
import './index.css'

const Index = props => {
  return (
        <div id="index">
    <PageHead/>
 

   <div className="container"> 
     <div className="container-desc">
       <h2>Can you hear me, Major Tom?</h2>
         <br />
         <h4>Intenta cantar la canción principal de David Bowie correctamente.</h4>
      
        <p>Hace 50 años, se lanzó una de las principales canciones del siglo XX: 
  
          "Space Oddity". La composición se volvió legendaria y se usó
          muy a menudo en películas, programas de televisión, comerciales, videojuegos, y 
          también fue interpretada regularmente por otros músicos.
          Te sugerimos que cantes 
          "Space Oddity" por enésima vez y que no mezcles las palabras. 
          <br/>
          ¿Puedes manejarlo?
          <br/> <br/>
          Ten, Nine, Eight, Seven, Six, Five, Four, Three, Two, One…
      </p>
     </div>
       <div className="btn-submit">
         <Link href="/questions/[id]" as={`/questions/${props.questions[0].id}`}>
          
           <button>Liftoff!</button>
         </Link>
       </div>
   </div>
   </div>
  );
};

Index.getInitialProps = async ({ store, isServer, pathname, query }) => {
  await store.dispatch(setCount(0));
  const data = Data.questions;
  return { questions: data };
};

export default connect(
  state => state,
  { setCount }
)(Index);

