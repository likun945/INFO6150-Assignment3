function Student(studentName, teacherName, awardStatus, semester, type, budget, percentage) {
  this.studentName = studentName;
  this.teacherName = teacherName;
  this.awardStatus = awardStatus;
  this.semester = semester;
  this.type = type;
  this.budget = budget;
  this.percentage = percentage;
}

Student.prototype.updateData = function (newData) {
  if (newData.studentName) {
    this.studentName = newData.studentName;
  }
  if (newData.teacherName) {
    this.teacherName = newData.teacherName;
  }
  if (newData.awardStatus) {
    this.awardStatus = newData.awardStatus;
  }
  if (newData.semester) {
    this.semester = newData.semester;
  }
  if (newData.type) {
    this.type = newData.type;
  }
  if (newData.budget) {
    this.budget = newData.budget;
  }
  if (newData.percentage) {
    this.percentage = newData.percentage;
  }
};

function displayName() {
  var nameElement = document.createElement("p");
  nameElement.textContent = "My name: KUN LI";

  var nuidElement = document.createElement("p");
  nuidElement.textContent = "NUID: 001553201";

  var container = document.getElementById("infoContainer");
  container.appendChild(nameElement);
  container.appendChild(nuidElement);
}

function addRowEvent() {
  var addButton = document.getElementById("add");
  addButton.addEventListener("click", function () {
    var table = document.getElementById("myTable");
    var filteredRows = Array.from(document.querySelectorAll('#myTable tr:not(.dropDownTextArea)'));
    if (filteredRows.length > 8) {
      displayPopup('Record addition failed due to exceeding the limit 10', 'error')
    } else {
      var studentNumber = filteredRows.length == 0 ? 1 : Number(filteredRows[filteredRows.length - 1].getAttribute("data-row-id")) + 1;
      var newRow = table.insertRow(-1);
      newRow.setAttribute("data-row-id", studentNumber)
      var studentName = "Student " + studentNumber;
      var teacherName = "Teacher " + studentNumber;
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = '<input type="checkbox"><br><br><img src="down.png" width="25px" onclick="toggle(this)">';
      var cell2 = newRow.insertCell(1);
      cell2.textContent = studentName;
      var cell3 = newRow.insertCell(2);
      cell3.textContent = teacherName;
      var cell4 = newRow.insertCell(3);
      cell4.textContent = "Approved";
      var cell5 = newRow.insertCell(4);
      cell5.textContent = "Fall";
      var cell6 = newRow.insertCell(5);
      cell6.textContent = "TA";
      var cell7 = newRow.insertCell(6);
      cell7.textContent = "12345";
      var cell8 = newRow.insertCell(7);
      cell8.textContent = "100%";
      var cell8 = newRow.insertCell(8);
      cell8.innerHTML = '<button onclick="deleteButtonEvent(this)" class="button_not_show">Delete</button>';
      var cell8 = newRow.insertCell(9);
      cell8.innerHTML = '<td><button onclick="openEditPopup(this)" class="button_not_show">Edit</button></td>';
      var dropDownRow = table.insertRow(-1);
      dropDownRow.classList.add("dropDownTextArea");
      var dropDownCell = dropDownRow.insertCell(0);
      dropDownCell.colSpan = "8";
      dropDownCell.innerHTML = `
        Advisor:<br /><br />
        Award Details<br />
        Summer 1-2014(TA)<br />
        Budget Number: <br />
        Tuition Number: <br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
      `;
      const textContent = studentName + " Record added successfully";
      displayPopup(textContent, 'success');
      addRowSelectedEvent();
    }

  });
}

function addRowSelectedEvent() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var submitButton = document.getElementById("button");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      var row = this.closest("tr");
      if (this.checked) {
        row.style.backgroundColor = "yellow";
        submitButton.classList.add("submitButton_active");
        var buttons = row.querySelectorAll('button.button_not_show');
        buttons.forEach(function (button) {
          button.classList.remove('button_not_show');
        });
      } else {
        row.style.backgroundColor = "";
        var buttons = row.querySelectorAll('button');
        buttons.forEach(function (button) {
          button.classList.add('button_not_show');
        });
        var anyChecked = Array.from(checkboxes).some(function (cb) {
          return cb.checked;
        });
        if (!anyChecked) {
          submitButton.classList.remove("submitButton_active");
        }
      }
    });
  });
}

function deleteButtonEvent(buttonElement) {
  var rowToDelete = buttonElement.closest("tr");
  var studentNameToDelete = rowToDelete.cells[1].textContent;
  rowToDelete.remove();
  var popupText = studentNameToDelete + " Record deleted successfully";
  displayPopup(popupText, 'success');
}

function openEditPopup(element) {
  var row = element.closest("tr");
  var studentName = row.cells[1].textContent;
  var teacherName = row.cells[2].textContent;
  var awardStatus = row.cells[3].textContent;
  var semester = row.cells[4].textContent;
  var type = row.cells[5].textContent;
  var budget = row.cells[6].textContent;
  var percentage = row.cells[7].textContent;
  var student = new Student(studentName, teacherName, awardStatus, semester, type, budget, percentage);
  document.getElementById("editStudentNameInput").value = studentName;
  document.getElementById("editTeacherNameInput").value = teacherName;
  document.getElementById("editAwardStatusInput").value = awardStatus;
  document.getElementById("editSemesterInput").value = semester;
  document.getElementById("editTypeInput").value = type;
  document.getElementById("editBudgetInput").value = budget;
  document.getElementById("editPercentageInput").value = percentage;
  var pop = document.getElementById("editPopup");
  var title = document.getElementById("studentNamePlaceholder");
  title.innerText = studentName;
  pop.style.display = 'block';
  window.student = student;
  window.index = row.getAttribute('data-row-id');
}

function updateData() {
  var student = window.student;
  var studentName = document.getElementById("editStudentNameInput").value;
  var teacherName = document.getElementById("editTeacherNameInput").value;
  var awardStatus = document.getElementById("editAwardStatusInput").value;
  var semester = document.getElementById("editSemesterInput").value;
  var type = document.getElementById("editTypeInput").value;
  var budget = document.getElementById("editBudgetInput").value;
  var percentage = document.getElementById("editPercentageInput").value;
  student.updateData({
    studentName: studentName,
    teacherName: teacherName,
    awardStatus: awardStatus,
    semester: semester,
    type: type,
    budget: budget,
    percentage: percentage
  });
  var pop = document.getElementById("editPopup");
  pop.style.display = 'none';
  displayPopup(studentName + " data updated successfully", 'success');
  var dataUpdatedEvent = new CustomEvent("studentDataUpdated");
  document.dispatchEvent(dataUpdatedEvent);
}

function closeEditPopup() {
  var pop = document.getElementById("editPopup");
  pop.style.display = 'none';
}

function toggle(element) {
  var row = element.closest("tr").nextElementSibling;
  var display = row.style.display;
  if (display == 'none') {
    row.style.display = 'table-row';
  } else {
    row.style.display = 'none';
  }
}

function displayPopup(message, type = 'success', timeout = 5000) {
  var popupText = document.getElementById("popupText");
  var alertMessage = document.getElementById("alertMessage");
  popupText.textContent = message;
  if (type == 'error') {
    alertMessage.style.backgroundColor = "#ff4d4f";
  } else if (type == 'success') {
    alertMessage.style.backgroundColor = "#389e0d";
  }
  alertMessage.style.display = "block";
  setTimeout(function () {
    alertMessage.style.display = "none";
  }, timeout);
}

document.addEventListener("DOMContentLoaded", function () {
  displayName();
  addRowEvent();
  addRowSelectedEvent();

});

document.addEventListener("studentDataUpdated", function (event) {
  var row = document.querySelector('tr[data-row-id="' + window.index + '"]');
  var updatedStudent = window.student;
  if (row) {
    // Update the cells in the row with the new student data
    row.cells[1].textContent = updatedStudent.studentName;
    row.cells[2].textContent = updatedStudent.teacherName;
    row.cells[3].textContent = updatedStudent.awardStatus;
    row.cells[4].textContent = updatedStudent.semester;
    row.cells[5].textContent = updatedStudent.type;
    row.cells[6].textContent = updatedStudent.budget;
    row.cells[7].textContent = updatedStudent.percentage;
  }
});

