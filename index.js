/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!

 */
let twoRows = [
    ["moe", "sizlak", "barkeep", 2,[{hour:12}],[{hour: 14}]],
    ["bartholomew", "simpson", "scamp", 3,[{hour:10}],[{hour: 15}]]
  ];

let createEmployeeRecord = function(array) {
    return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
     }
     
  }

let createEmployeeRecords = function(array) {
    return array.map(function(e){
    return createEmployeeRecord(e);
    
    });
  }
  let createTimeInEvent = function(dateStamp) {
    let d = dateStamp.slice(0,10);
    let h = dateStamp.slice(11,13);
    this.timeInEvents.push ({ "type": "TimeIn", "hour": (parseInt(h)*100), "date": d})
    return this;
  
  }
  let createTimeOutEvent = function(dateStamp) {
    let d = dateStamp.slice(0,10);
    let h = dateStamp.slice(11,13);
    this.timeOutEvents.push ({ "type": "TimeOut", "hour": (parseInt(h)*100), "date": d})
    return this;

    
  }
  let hoursWorkedOnDate = function(soughtDate){
      console.log(this.timeInEvents)
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}



//   let hoursWorkedOnDate = function(findDate){
//       debugger
//     let out = this.timeOutEvents.find(function(o){
//       return o.date === findDate
//     })
//     let inn = this.timeInEvents.find(function(i){
//       return i.date === findDate
      
//     })
//     return (out.hour - inn.hour) / 100;
//     //  debugger
    
  
//   }
  let wagesEarnedOnDate = function(dateSought){
    let rate = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour
    return parseFloat(rate.toString())
  }
  
  let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}



  let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
    
  }
  
  let calculatePayroll = function(srcArray){
    return srcArray.reduce(function(accum, empl){
      return accum + allWagesFor.call(empl)
  }, 0)
  
  }
  hoursWorkedOnDate();
  
  