const createEmployeeRecord = function (row) {
    return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  const createEmployeeRecords = function (employeeRowData) {
    return employeeRowData.map(function (row) {
      return createEmployeeRecord(row);
    });
  };
  
  const createTimeInEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
  
    return this;
  };
  
  const createTimeOutEvent = function (dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
  
    return this;
  };
  
  const hoursWorkedOnDate = function (date) {
    const timeInEvent = this.timeInEvents.find(function (event) {
      return event.date === date;
    });
  
    const timeOutEvent = this.timeOutEvents.find(function (event) {
      return event.date === date;
    });
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  };
  
  const wagesEarnedOnDate = function (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
  
    return hoursWorked * payRate;
  };
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(
      function (memo, date) {
        return memo + wagesEarnedOnDate.call(this, date);
      }.bind(this),
      0
    );
  
    return payable;
  };
  
  const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce(function (memo, record) {
      return memo + allWagesFor.call(record);
    }, 0);
  };
  
  const findEmployeeByFirstName = function (employeeRecords, firstName) {
    return employeeRecords.find(function (record) {
      return record.firstName === firstName;
    });
  };
  