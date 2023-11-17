const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const tabBtn=document.getElementById("save-btn")
const ulEl=document.getElementById("ul-el")
const delEl=document.getElementById("delete-btn")
const LeadsfromLocalstorage=JSON.parse(localStorage.getItem("myLeads"))

let myLeads=[]

 
if(LeadsfromLocalstorage){
  myLeads=LeadsfromLocalstorage
  render(myLeads)
}

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
 // console.log(tabs[0].url)
  })

}) 


inputBtn.addEventListener("click",function(){
  myLeads.push(inputEl.value)    //After being pushed to the array we do not need the value that the user has put in so we can clear it out
  inputEl.value=""
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  render(myLeads)
})

delEl.addEventListener("dblclick",function(){
  if(LeadsfromLocalstorage){
    localStorage.clear()                          //Explicitly deleting the saved items
    myLeads=[]                                    //Emptying the previously populated array 
    render(myLeads)                                 // Then rendering it to show there's nothing there
  }
})


function render(leads){
let listItems=""
for(let i=0;i<myLeads.length;i++){
    //listItems += "<li><a href= ' " + leads[i] +"' target='_blank'>"+ leads[i] + "</a></li>"
    
    listItems +=`
              <li>
                      <a href= ' ${leads[i]}' target='_blank'>${leads[i]}</a>
              </li>`

  }

ulEl.innerHTML=listItems
}

