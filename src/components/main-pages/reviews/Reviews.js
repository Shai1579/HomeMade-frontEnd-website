import React,{useEffect,useState} from 'react'
import {Grid} from '@material-ui/core';
import '../../../css/review.css'
import './Comments'
import { Container } from '@material-ui/core';
import Comments from './Comments';
export default function Reviews({setLoader,token}) {
    const [meals,setMeals]= useState([])
    const [allmeals,setAllMeals]= useState([])
    const [reviews,setReviews]= useState([])

    useEffect(() => {
    setLoader(true)
     const get_data_review = async()=>{
     const res= await fetch(`http://localhost:7000/reviews/${token}`)
     const data = await res.json()
     console.log(data)
     setMeals(data.meals)
     setReviews(data.cooker_reviews)
     setAllMeals(data.cooker_reviews)
     }
     get_data_review()
     setLoader(false)
    }, [setLoader, token])

const filter_dish=(element)=>{
    if(element !== "כל המנות"){
        let value= reviews.filter(el=>el.meal_name === element)
        setReviews(value)
    }
    else{
        setReviews(allmeals)
    }  
}

const search_meal=(el)=>{
    if(el){
        console.log(el)
        let value= reviews.filter(el=>el.meal_name.includes(el))
        console.log(value)
        if(value.length){
            setReviews(value)
        }
       
    }
    else{
        setReviews(allmeals)
    }
    
}

    return (
        <Container style={{minHeight:'85vh'}}>
         <Grid className='header'>
         <Grid>
         <select onChange={(e)=>{filter_dish(e.target.value)}} className='select_meal'>
             <option value={"כל המנות"} className='options'>כל המנות</option>
             {
              meals.length?
                meals.map(el=>{
                    return(
                  <option className='options' value={el.name}>{el.name}</option>
                    )
                })
             :<option>סטטוס 404</option>}
         </select>
         </Grid>
         <Grid>
             <input onChange={(e)=>{search_meal(e.target.value)}} className="search_meal" placeholder="חיפוש לפי שם מנה"/>
         </Grid>
         </Grid>
         <Grid className='comments-warper'>
        <Comments reviews={reviews}/>
         </Grid>
        </Container>
    )
}
