const defaultBaseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";
const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdrawnSelect=document.querySelectorAll(".dropdown select");
const msg=document.querySelector(".msg")

let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");

//console.log(countryList);
for(let select of dropdrawnSelect){
    for(currcode in countryList){ 
        //console.log(currcode,countryList[currcode]);
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="USD";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="INR";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        console.log(event);
        updateFlag(event.target);
    
    });
}

const updateFlag = (element) => {
    //console.log(element);
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newScr=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let Img=element.parentElement.querySelector("img");
    Img.src=newScr;

}

const updateRate = async()=>{
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal==""|| amtVal<1){
        amtVal=1;
        amt.value="1";
    }

    console.log(fromCurr,toCurr);
    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response= await fetch(URL);
    //console.log(response);
    let data=await response.json();
    //console.log(data);
    let rate= data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmt = amtVal * rate;
    console.log("final amount = ",finalAmt);
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

}
btn.addEventListener("click",(event)=>{
    //console.log(event);
    event.preventDefault();
    updateRate();
})

window.addEventListener("load",()=>{
    updateRate();
})