const person ={
    name:"Janu",
    age:40,
    num:3445,
}

const s = Object.keys(person).map((item)=>{
    
   return person[item]
 
});
console.log(s);