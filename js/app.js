const lodder=loadding=>{
    const Loadding=document.getElementById('Loading');
    if(loadding){
        Loadding.classList.remove('d-none');
    }
    else{
        Loadding.classList.add('d-none');
    }
}

lodder(true);
fetch(`https://openapi.programming-hero.com/api/ai/tools`)
.then(res=>res.json())
.then(data=>DisplayData(data.data.tools));


const DisplayData=(data)=>{
   
    const container=document.getElementById('container');
    data.forEach(tools=>{
    const div=document.createElement('div')
    div.classList.add('col');
    div.innerHTML=`
    
    <div class="card h-100 m-2">
      <img  style="max-height: 180px;" src="${tools.image}" class="card-img-top" alt="No Image Found">
      <div class="card-body">
        <h5 class="card-title">Feature</h5>
        <ol>
          <li>${tools.features[0]}</li>
          <li>${tools.features[1]}</li>
          <li>${tools.features[2]}</li>
        </ol>
      </div>
      <hr>
      <footer class="ps-3">
          <h5 class="card-title">${tools.name}</h5>
          <P><i class="fa-regular fa-calendar-days" style="color: #9311d0;"></i>    ${tools.published_in}
          </P>
          <div>
          <button onclick="LoadMoreData('${tools.id}')" id="" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <i class="fa-solid fa-arrow-right" style="color: #09ddec;"></i>
        </button>
          </div>
      </footer>
  </div>
    `;
    lodder(false);
 container.appendChild(div)

   })

   
}

const LoadMoreData= async Id=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${Id}`
    const res=await fetch(url);
    const data=await res.json();
    showModalData(data);

}

const showModalData=id=>{
    
    const description=document.getElementById('description');
    description.innerText=id.data.description;
    document.getElementById('modalImg').src=id.data.image_link[0];
    
    document.getElementById('basic').innerText=`${id.data.pricing[0].price ==='0'?"Free of cost":id.data.pricing[0].price} ${id.data.pricing[0].plan}` ;
    document.getElementById('pro').innerText=`${id.data.pricing[1].price} ${id.data.pricing[1].plan}`;
    document.getElementById('enterprise').innerText=`${id.data.pricing[2].price} ${id.data.pricing[2].plan}`;
    document.getElementById('examples').innerText=`${id.data.input_output_examples[0].input }`;
}