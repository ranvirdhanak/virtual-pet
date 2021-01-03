
var backgroundImg;
var dog;
var foodS;
var foodStock;
var database;
var dogHappy;
var milk;
var foodObj;
var lastFed;
var addFood;
var fedTime;

function preload()
{

  backgroundImg = loadImage("background.png");
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}
function setup() {
 createCanvas(1000,500);
 database = firebase.database()

 foodObj = new Food()
 foodStock = database.ref('Food');
 foodStock.on("value",readStock);

 dog = createSprite(900,300,150,150);
 dog.addImage(dogImg);
dog.scale = 0.15;

 

 feed = createButton("feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood = createButton("add food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);

 

}



function draw() {  
 background(46,139,87);

 foodObj.display();
  
 fedTime = database.ref("FeedTime");
 fedTime.on("value",function(data){
lastFed = data.val();
 })

  //if(keyWentDown(UP_ARROW)){
  //writeStock(foodS);
  //dog.addImage(dogHappy);
 

  //}


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("last feed: " + lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
  text("last feed: 12 AM ",350,30);
  }else{
    text("last feed: " + lastFed + " AM ",350,30);
  }

drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){

  dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
Food: foodObj.getFoodStock(),
FeedTime: hour()

  })
}

function addFoods(){
foodS++;
database.ref("/").update({
Food: foodS


})


}







