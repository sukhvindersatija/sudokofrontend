const puzzle=document.querySelector("#puzzle");
const solve=document.querySelector("#solve")

const size=81;
let submission="";
for(let i=0;i<9;i++){
  for(let j=0;j<9;j++){
    const input=document.createElement('input');
    input.setAttribute('type','number');
    input.setAttribute('min',0);
    input.setAttribute('max',9);
    input.setAttribute('class','box');
    puzzle.appendChild(input);
}
puzzle.appendChild(document.createElement("br"));
}

function populate(mat){
  const inputs=document.querySelectorAll('input');
  let k=0;

  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      inputs[k].value=mat[i][j];
      k++
    }
  }
}
const api_url = "https://sudokoapi.herokuapp.com/";

/* const api_url = "http://localhost:8080/"; */

async function getapi(url) {
    const data={
      submission:submission
    }
    const params={
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }
    const response = await fetch(url,params);


    var data1 = await response.json();
    console.log(data1);
    if (response) {
        console.log(response);
    }
    var solved=data1.solved;
    
    const mat=data1.res;
    if(!solved){
      alert(mat);
      location.reload();
    }
    else{
      console.log(mat);
      populate(mat);
    }

}

solve.addEventListener('click',()=>{
  const inputs=document.querySelectorAll('input');
  inputs.forEach(input=>{
    if(input.value){
      submission+=input.value;
    }
    else{
      submission+='0';
    }
  })
  console.log(submission);
  getapi(api_url);
})

