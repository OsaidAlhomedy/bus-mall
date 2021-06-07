'use strict';

let leftImage = document.getElementById('left');
let midImage = document.getElementById('middle');
let rightImage = document.getElementById('right');
let sectionCont = document.getElementById('container');
let button = document.getElementById('butt');
let tableEl = document.getElementById('results');

let counter = 0;
const rounds = 25 ;

Products.arrAll = [];
let arrayOfNames = [];
let arrayOfVotes = [];
let arrayOfShows = [];


function Products(name,source){
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shows = 0;

  // myChart.config._config.data.labels.push(this.name);
  Products.arrAll.push(this);
  arrayOfNames.push(this.name);

}



// My instances
new Products('bag','imgs/bag.jpg');
new Products('banana','imgs/banana.jpg');
new Products('bathroom','imgs/bathroom.jpg');
new Products('boots','imgs/boots.jpg');
new Products('breakfast','imgs/breakfast.jpg');
new Products('bubblegum','imgs/bubblegum.jpg');
new Products('chair','imgs/chair.jpg');
new Products('cthulhu','imgs/cthulhu.jpg');
new Products('dog-duck','imgs/dog-duck.jpg');
new Products('dragon','imgs/dragon.jpg');
new Products('pen','imgs/pen.jpg');
new Products('pet-sweep','imgs/pet-sweep.jpg');
new Products('scissors','imgs/scissors.jpg');
new Products('shark','imgs/shark.jpg');
new Products('sweep','imgs/sweep.png');
new Products('tauntaun','imgs/tauntaun.jpg');
new Products('unicorn','imgs/unicorn.jpg');
new Products('usb','imgs/usb.gif');
new Products('water-can','imgs/water-can.jpg');
new Products('wine-glass','imgs/wine-glass.jpg');



function randomIndexGen(){
  let randomIndex = Math.floor(Math.random()*Products.arrAll.length);
  return randomIndex;
}

let leftIndex = null;
let midIndex = null;
let rightIndex = null;

function noSameImages(){
  leftIndex = randomIndexGen();
  midIndex = randomIndexGen();
  rightIndex = randomIndexGen();

  while(leftIndex === rightIndex || midIndex === leftIndex || midIndex ===rightIndex){
    leftIndex = randomIndexGen();
    midIndex = randomIndexGen();
    rightIndex = randomIndexGen();
  }

  return [leftIndex,midIndex,rightIndex];
}


let checkIndex=[];

function displayImages(img){

  let indexArr = noSameImages();

  while (checkIndex.includes(indexArr[0]) || checkIndex.includes(indexArr[1]) || checkIndex.includes(indexArr[2])){
    indexArr = noSameImages();
  }
  console.log(indexArr,checkIndex);

  leftImage.src = Products.arrAll[indexArr[0]].source;
  Products.arrAll[indexArr[0]].shows++;
  checkIndex[0]=indexArr[0];

  midImage.src = Products.arrAll[indexArr[1]].source;
  Products.arrAll[indexArr[1]].shows++;
  checkIndex[1]=indexArr[1];

  rightImage.src = Products.arrAll[indexArr[2]].source;
  Products.arrAll[indexArr[2]].shows++;
  checkIndex[2]=indexArr[2];

  if(leftImage.id === img){Products.arrAll[indexArr[0]].votes++;}
  if(midImage.id === img){Products.arrAll[indexArr[1]].votes++;}
  if(rightImage.id === img){Products.arrAll[indexArr[2]].votes++;}

  console.log(indexArr,checkIndex);

}

displayImages(null);



sectionCont.addEventListener('click', handlingEvent);

function handlingEvent(event){
  counter++;
  let img = event.target.id;

  if(event.target.id === 'container'){
    return;
  }

  displayImages(img);

  if(counter === rounds){
    sectionCont.removeEventListener('click', handlingEvent);
  }

}


button.addEventListener('click', resultsFunc);

function resultsFunc(){

  let trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  let thEl = document.createElement('th');
  thEl.textContent = 'Name';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Votes';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Views';
  trEl.appendChild(thEl);

  for(let j=0;j<Products.arrAll.length;j++){

    let tr1El = document.createElement('tr');
    tableEl.appendChild(tr1El);
    let tdEl = document.createElement('td');
    tdEl.textContent = Products.arrAll[j].name;
    tr1El.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = Products.arrAll[j].votes;
    tr1El.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = Products.arrAll[j].shows;
    tr1El.appendChild(tdEl);

    arrayOfVotes.push(Products.arrAll[j].votes);
    arrayOfShows.push(Products.arrAll[j].shows);
    // myChart.config._config.data.datasets[0].data.push(Products.arrAll[j].votes);
    // myChart.config._config.data.datasets[1].data.push(Products.arrAll[j].shows);
  }
  chartRender();
  button.removeEventListener('click', resultsFunc);
}

function chartRender(){

  let ctx = document.getElementById('myChart');
  //eslint-disable-next-line no-undef,no-unused-vars
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayOfNames,
      datasets: [{
        label: '# of Votes',
        data: arrayOfVotes,
        backgroundColor: [
          'rgba(73, 156, 255, 0.36)'
        ],
        borderWidth: 1
      },{
        label: '# of Shows',
        data: arrayOfShows,
        backgroundColor: [
          'rgba(255, 0, 255, 0.36)'
        ],
        borderWidth: 1
      }]
    }
  });

}
