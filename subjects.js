let deleteSubject;
let updateSubject;
let addSubject;

 
fetch("http://0.0.0.0:5000/subject/")
  .then((res) => res.json())
  .then((res) => {
    subjects = res;
    const subjectsTable = document.querySelector(".list-group");
    subjectsTable.innerHTML = res
      .map((el, i) => {
        return ` <li class="list-group-item d-flex justify-content-between align-items-center">
              ${el.name}  
              <div>
                <button class="btn btn-primary btn-sm mr-2"> <a href="teacherlist.html" class="link-btn-txt"> Teachers </a> </button>
                <span class="wrapper-change-span-${i + 1}"></span>
                <span class="wrapper-delete-span-${i + 1}"></span>
              </div>
            </li>`;
      })
      .join("");
 
    res.forEach((el, i) => {
 
      const buttonDelete = document.createElement("button");
      buttonDelete.innerText = "Delete";
      buttonDelete.className = "btn btn-danger btn-sm";
      buttonDelete.setAttribute("id", `delete-btn-${i + 1}`);
      const wrapperDelete = document.querySelector(
        `.wrapper-delete-span-${i + 1}`
      );
      wrapperDelete.appendChild(buttonDelete);
 
      const buttonChange = document.createElement("button");
      buttonChange.innerText = "Change";
      buttonChange.className = "btn btn-primary btn-sm mr-2";
      buttonChange.setAttribute("id", `change-btn-${i + 1}`);
      const wrapperChange = document.querySelector(
        `.wrapper-change-span-${i + 1}`
      );
      wrapperChange.appendChild(buttonChange);
 
      $(document).ready(function () {
        // Hide the form initially
        $("#change-form").hide();
 
        // Show the form when the Change button is clicked
        $("#change-btn-" + (i + 1)).click(function () {
          $("#change-form").show();
        });
      });
 
      $(document).ready(function () {
        // Hide the form initially
        $("#delete-form").hide();
 
        // Show the form when the Change button is clicked
        $("#delete-btn-" + (i + 1)).click(function () {
          $("#delete-form").show();
        });
      });
 
      $(document).ready(function () {
        // Hide the form initially
        $("#add-form").hide();
 
        // Show the form when the Change button is clicked
        $("#add-btn").click(function () {
          $("#add-form").show();
        });
      });
 
      buttonDelete.addEventListener("click", () => {
        deleteSubject = function (event) {
          event.preventDefault();
          fetch(`http://0.0.0.0:5000/subject/${el.id}`, { method: "DELETE" })
            .then((res) => window.location.reload())
            .catch((err) => alert(err));
        };
      });
 
      
 
      buttonChange.addEventListener("click", () => {
        const inputName = document.getElementById("new-name");
 
        const teacherIds = document.getElementById("new-ids");  
 
       
 
        updateSubject = function (event) {
          event.preventDefault();
 
          if (!teacherIds.value) {
            inputTeacherIdsValue = el.teacher_ids;
          }

          const body = JSON.stringify({
            name: inputName.value,
            teacher_ids: typeof teacherIds.value === "string" ? teacherIds.value
              .split(",")
              .map((el) => parseInt(el)) : el.teacher_ids
          });
 
          fetch(`http://0.0.0.0:5000/subject/${el.id}`, {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
             
              if (res && res.status > 299) {
                return res.json();
              } else {
                return null;
              }
            })
            .then((res) => {
              if (res) {
                if (res.name && !res.message) {
                  alert(res.name);
                } else if (res.message && !res.name) {
                  alert(res.message);
                } else {
                  alert(res.name, " - ", res.message);
                }
              }
              window.location.reload();
            })
            .catch((err) => {
              alert(err.message);
            })
            .finally((res) => {
              inputName.value = "";
              teacherIds.value = "";
            });
        };
      });
    });
  });
        
 
        addSubject = function (event) {
        let inputNameValue;
        const inputName = document.getElementById("add-name");
        const teacherIds = document.getElementById("add-ids");
         event.preventDefault();
          const body = JSON.stringify({
            name: inputName.value,
            teacher_ids: typeof teacherIds.value === 'string' ? teacherIds.value.split(",")
              .map((el) => parseInt(el)) : [],
          });
          
          fetch(`http://0.0.0.0:5000/subject/`, {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
             
               if (res && res.status > 299) {
                return res.json();
              } else {
                return null;
              } 
            })
            .then((res) => {
              if (res) {
                if (res.name && !res.message) {
                  alert(res.name);
                } else if (res.message && !res.name) {
                  alert(res.message);
                } else {
                  alert(res.name, " - ", res.message);
                }
              } 
             
              window.location.reload();
            })
            .catch((err) => {
              alert(err.message);
            })
            .finally((res) => {
              inputName.value = "";
              teacherIds.value = "";
            });
        };
  
	
