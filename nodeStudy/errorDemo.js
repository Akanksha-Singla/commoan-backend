try {
  const m = 1;
  const n = m + z; // if error occurs here it will be caught in  catch block
  console.log("this code will get skipped if error at above line");
  
} catch (err) {
  console.log("undefied error occured");
} 

try {
  const m = null; // control comes here
  if(m==null)
      throw new Error("value is null")  // explicit error throwing
  const n = 34/m;
  console.log(n);
  
} catch (err) {  // error gets handled here
  console.log("null error occured"); 
  console.log(err);
  
} 
finally{
  console.log("this code always executes");
  
}