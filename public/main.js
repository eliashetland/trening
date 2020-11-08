fetch('/all')
  .then(res => res.json())
  .then((program)=>{
    console.log(program);
  




//henter inn elentene 
const tekstEl = document.querySelector("#tekst");
document.querySelectorAll(".element").forEach(el => {
    el.addEventListener("mouseover", e => {
      tekstEl.innerHTML = String(e.target.id);
      tekstEl.style.animationName = "nyTekst";
    });
    el.addEventListener("mouseout", e => {
      tekstEl.style.animationName = "";
      tekstEl.innerHTML = "";
    });
    el.addEventListener("click", display);
  });



//display span 
const spanEl = document.querySelector("#ovelserTilGruppe");
const valgtGruppeEl = document.querySelector("#valgtGruppe");
const ovelsedivEl = document.querySelector("#ovelsedivEl");
let currentGroup;




function display(e) {
  spanEl.style.display = "block";
  valgtGruppeEl.innerHTML = e.target.id;
  currentGroup = e.target.id;
  ovelsedivEl.innerHTML = "";

  //legger til en tilbakeknapp
  let tilbake = document.createElement("button");
  tilbake.innerHTML = "Tilbake";
  tilbake.addEventListener("click", () => spanEl.style.display = "none");
  ovelsedivEl.appendChild(tilbake);

 //create program
  for (let prop in program[`${e.target.id}`]) {
    
    let ovelsediv = document.createElement("div"); //lager ett divelement
    ovelsediv.className = "listePunkter";
   
    ovelsedivEl.appendChild(ovelsediv); //legger divelementet til i containerelementet
    let ovelse = document.createElement("p"); //lager ett p element

    ovelse.innerHTML = prop; // setter innholdet i p elementet til navnet på den tilhørende øvelsen
    ovelsediv.appendChild(ovelse); //legger til p elemetet i divelement

    ovelse.addEventListener("click", zoomIn);
  }
}

function zoomIn(e) {

  let divEl = e.target.parentElement;
  let contentHeader = e.target.innerHTML;
  let content;
  
  if (program[currentGroup][contentHeader] != undefined){

    content = program[currentGroup][contentHeader].body;
    let imgSrc = program[currentGroup][contentHeader].img;
    if (divEl) {
      divEl.innerHTML = "";
      createContent(divEl, imgSrc, contentHeader, content);
    }
  }
}

function createContent(divEl, imgsrc, header, content){

  let expandDiv = document.createElement("div"); //lager ett divelement
  expandDiv.className = "expand";
  expandDiv.addEventListener("click", shrink);
  divEl.appendChild(expandDiv); //legger divelementet til i containerelementet

  let ovelsebilde = document.createElement("img");
  ovelsebilde.width = "300px";
  ovelsebilde.height = "300px";
  ovelsebilde.src = `${imgsrc}`;
 
  ovelsebilde.className = "ovelsebilde";
  expandDiv.appendChild(ovelsebilde);

  let contentDiv = document.createElement("div"); 
  contentDiv.className = "contentDiv";
  expandDiv.appendChild(contentDiv);

  let ovelseH3 = document.createElement("h3"); 
  ovelseH3.className = "ovelseH3";
  ovelseH3.innerHTML = `${header}`;
  contentDiv.appendChild(ovelseH3);

  let ovelseP = document.createElement("p"); 
  ovelseP.className = "ovelseP";
  ovelseP.innerHTML = `${content}`;
  contentDiv.appendChild(ovelseP);


}



function shrink(e) {
  let divEl = e.currentTarget.parentElement;
  let ovelseHeader = e.currentTarget.getElementsByClassName("ovelseH3")[0].innerHTML;

  divEl.innerHTML = "";
  
  let ovelseP = document.createElement("p");
  ovelseP.innerHTML = ovelseHeader;

  divEl.appendChild(ovelseP);

  divEl.addEventListener("click", zoomIn); //denner er veldig problematisk ????+
  
}

})