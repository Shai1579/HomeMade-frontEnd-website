import React,{useEffect,useState} from 'react'
import {domain} from '../../../connection/Config'
import {Grid,Avatar,Container,Button} from '@material-ui/core';
import '../../../css/meals_manage.css'
import SearchMeal from './Search_meal';
import firebase from '../../../connection/firebase' 

export default function Meals_manage({setLoader,token,tokenID}) {
    // const[itemId,setItemId]=useState(0)
    const[available,setAvailable]=useState('')
    const[items,setItems]=useState([])
    const[allItems,setAllItems]=useState([])
    const db = firebase.firestore(); 
    useEffect(()=>{
      
            setLoader(true)
            const get_dishes=async()=>{
                try{
                const res= await fetch(`${domain}/dishes/${token}`)
                const data = await res.json()
                setItems(data.meals)
                setAllItems(data.meals)
                console.log(data.meals)
            }
                catch(err){
                    setLoader(false)
                    console.log(err)
                }
            }
            get_dishes()
        setLoader(false)
    },[setLoader, token])
    
    const notAvialable= async(id,index)=>{
        setLoader(true)
        try{
            await db.collection('meals').doc(id.id).update({
                available:false
            })
    
            let newArr=[...items]
            newArr[index].available = false
            setItems(newArr)
         
        }
        catch(err){
            console.log(err)
            setLoader(false)
        }
        setLoader(false)
    }
    const avialable= async(id,index)=>{
        console.log(id.id)
        setLoader(true)
        try{
            await db.collection('meals').doc(id.id).update({
                available:true
            })
              
                let newArr=[...items]
                newArr[index].available = true
                setItems(newArr)
              
        }
        catch(err){
            console.log(err)
            setLoader(false)
        }
       
        setLoader(false)
    }
    
    const changeAll_available= async()=>{
        console.log(token)
        setLoader(true)
        let my_meals=[]
        let snapshot = await db.collection('meals').where("cooker_id","==",token).get()
        snapshot.forEach(doc => {
            my_meals.push({...doc.data() ,id:doc.id})
          });
          console.log( my_meals)
         try{
            if(available ==="true"){
                my_meals.forEach(async(item)=>{
                 await db.collection('meals').doc(item.id).update({
                        available:true
                    })
                  })
              }
              else{
                my_meals.forEach(async(item)=>{
                   await db.collection('meals').doc(item.id).update({
                        available:false
                    })
                  })   
              }
            let newArr=[]
              snapshot = await db.collection('meals').where("cooker_id","==",token).get()
              snapshot.forEach(doc => {
                newArr.push({...doc.data() ,id:doc.id})
                })
                setItems(newArr)

        }
        catch(err){
            console.log(err)
            setLoader(false)
        }
        setLoader(false)
    }
    return (
        <Container style={{minHeight:'85vh'}}>
            <div className='list-warper'>
            <Grid className='header-warper' style={{ backgroundColor: "rgb(221, 235, 243)"}}>
                <Grid>
                <SearchMeal 
                   items={items} 
                   setItems={setItems}
                    allItems={allItems}/> 
                </Grid>
                <Grid style={{marginBottom:'10px'}}>
                 <button onClick={changeAll_available} className='bt-available'>עדכן את כל המנות </button>
                 <select onChange={(e)=>{setAvailable(e.target.value)}} className='bt-available'>
                 <option value={"true"}>כל המנות זמינות</option>
                 <option value={"false"}>כל המנות לא זמינות</option>
                 </select>
                </Grid>
                   
                 </Grid>
            {items?
            <Grid className='warper-meals'>
                <Grid>
                    <Grid>
                        <h2>שינוי זמינות מנה</h2>
                    </Grid>
                </Grid>
            {items.map((el,index)=>{
                return(
            <Grid className='row' >
             <Grid className='bt-warper' xl={3} md={3} lg={3}>
                 {el.available === true?
                  <Button onClick={()=>{notAvialable(el,index)}} className='bt_avialable'   variant='outlined'>זמין</Button>
                :<Button onClick={()=>{avialable(el,index)}} className='bt_avialable'  variant='outlined'>לא זמין</Button> }
             </Grid>
           
            <Grid xl={3} md={3} lg={3} className="item_cover">
            <h5>{el.name}</h5>
             </Grid>
             <Grid xl={3} md={3} lg={3} className="item_cover">
                <Avatar className="avatar"   src={el.image}/>
             </Grid>
             </Grid>
             
             ) 
            })}
          </Grid>
        :<h3>אין מנות לבשלן....</h3>}
         </div>
        </Container>
    )
}
//allow read: if request.auth != null && resource.data.cooker_id == request.auth.uid

//admin
//.auth()
//.setCustomUserClaims('BJtMmQhghUda8mVGBCbtSjWSBkl1', { role: 'admin' })
