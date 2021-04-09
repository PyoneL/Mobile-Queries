import { Db,taxiCollection,locationCollection } from './firestore'
/*const temp = {
    pickup_datetime:  null,
    dropoff_datetime: null,
    DOLocationID:     null,
    PULocationID:     null,
    trip_distance:    null,
    total_amount:     null,
};*/
function getDateTime(props){
    var date = new Date(props * 1000)
    var day = "0" + date.getDate()
    var mount = "0" + (date.getMonth() + 1)
    var year = date.getFullYear()
    var hour = "0" + date.getHours()
    var min = "0" + date.getMinutes()
    var sec = "0" + date.getSeconds()
        
    return day.substr(-2) + "/" + mount.substr(-2) + "/" + year + " " + hour.substr(-2) + ":" + min.substr(-2) + ":" + sec.substr(-2)
}

const GetArticleOne = async () =>{
    const result = await taxiCollection.orderBy('passenger_count','desc').limit(5).get()
    .then((querySnapshot)=>{
        return querySnapshot.docs.map(doc=> doc.data())
    }) 
    console.log(result)

    result.map((p)=> {
        p.pickup_datetime.seconds = getDateTime(p.pickup_datetime.seconds)
        p.dropoff_datetime.seconds = getDateTime(p.dropoff_datetime.seconds)
    })
    return result
};

const GetArticleTwo = async () =>{
    const result = await taxiCollection.get()
    .then((querySnapshot)=>{
        return querySnapshot.docs.map(doc=> doc.data())
    }) /*
    result.map((p)=> {
        p.pickup_datetime.seconds = getDateTime(p.pickup_datetime.seconds)
        p.dropoff_datetime.seconds = getDateTime(p.dropoff_datetime.seconds)
    })*/
    return result
};

function GetArticleThree(){
    const result =  taxiCollection.orderBy('passenger_count','desc')
    .limit(5)
    .get()
    .then(querySnapshot =>{
      querySnapshot.forEach(documentSnapshot =>{
        console.log(documentSnapshot.data());
      });
    });
};

export {GetArticleOne, GetArticleTwo, GetArticleThree};