let taskChoice = 4;
let subtask = "country";
subtaskSelectionDraw(taskChoice);
drawValueRequestForm(subtask);

function sendCountryRequest() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: subtask,
            country: document.forms.requestForm.country.value
        },
        success: function (data) {
            updateTable(document.getElementById("responseTable"), JSON.parse(data));
        }
    });
}
function sendPageTypeRequest() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: subtask,
            pageType: document.forms.requestForm.selectPageType.value
        },
        success: function (data) {
            updateTable(document.getElementById("responseTable"), JSON.parse(data));
        }
    });
}
function sendPageAmountRequest() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: subtask,
            minPages: document.forms.requestForm.minPages.value,
            maxPages: document.forms.requestForm.maxPages.value
        },
        success: function (data) {
            updateTable(document.getElementById("responseTable"), JSON.parse(data));
        }
    });
}
function sendUpdateRequest() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: subtask,
            id : document.forms.requestForm.selectId.value,
            brand: document.forms.requestForm.brand.value,
            name: document.forms.requestForm.name.value,
            pageAmount: document.forms.requestForm.pageAmount.value,
            cover: document.forms.requestForm.cover.value,
            country: document.forms.requestForm.country.value,
            pageType: document.forms.requestForm.pageType.value,
        },
        success: function (data) {
            alert(JSON.parse(data));
        }
    });
}
function sendInsertRequest() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: subtask,
            brand: document.forms.requestForm.brand.value,
            name: document.forms.requestForm.name.value,
            pageAmount: document.forms.requestForm.pageAmount.value,
            cover: document.forms.requestForm.cover.value,
            country: document.forms.requestForm.country.value,
            pageType: document.forms.requestForm.pageType.value,
        },
        success: function (data) {
            alert(JSON.parse(data));
        }
    });
}
function sendDeleteRequest() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: subtask,
            id : document.forms.requestForm.selectId.value
        },
        success: function (data) {
            alert(JSON.parse(data));
        }
    });
    setTimeout(updateDeleteRequestForm, 1000);
}

function sendRequest() {
    if (subtask === "country") sendCountryRequest();
    if (subtask === "pageType") sendPageTypeRequest();
    if (subtask === "pageAmount") sendPageAmountRequest();
    if (subtask === "insert") sendInsertRequest(subtask);
    if (subtask === "update") sendUpdateRequest();
    if (subtask === "delete") sendDeleteRequest();
}
//
function subtaskSelectionDraw(task) {
    if (document.getElementById("choiceTaskDiv").lastChild.id === "requestForm")
        document.getElementById("choiceTaskDiv").lastChild.remove();

    let subTaskChoice = document.createElement("div");
    subTaskChoice.setAttribute("class", "requestForm");
    subTaskChoice.id = "requestForm";
    let selectTask = document.createElement("select");
    selectTask.id = "selectTask";
    selectTask.setAttribute("class", "requestInput");
    document.getElementById("choiceTaskDiv").appendChild(subTaskChoice);
    selectTask.addEventListener("change", function () {
        selectListener(this.value)
    });
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");
    let opt3 = document.createElement("option");
    if (task === 4) {
        opt1.innerHTML = "country";
        opt2.innerHTML = "pageType";
        opt3.innerHTML = "pageAmount";
    } else {
        opt1.innerHTML = "insert";
        opt2.innerHTML = "update";
        opt3.innerHTML = "delete";
    }
    selectTask.appendChild(opt1);
    selectTask.appendChild(opt2);
    selectTask.appendChild(opt3);
    subTaskChoice.appendChild(selectTask);
}
function getInput(value) {
    let input = document.createElement("input");
    input.type = "text";
    input.name = value;
    input.setAttribute("class", "requestInput");
    input.id = value;
    if (value === "cover")
        input.placeholder = value + " (hard, soft)"
    else if (value === "pageType")
        input.placeholder = value + " (bold, lined, squared)"
    else
        input.placeholder = value;
    return input;
}
function getButton() {
    let button = document.createElement("button");
    button.setAttribute("class", "requestButton");
    button.innerHTML = "request";
    button.setAttribute("onclick", "sendRequest()");
    button.id = "requestButton"
    return button;
}

function selectUpdateListener(id) {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: 'id',
            id: id,
            brand: document.forms.requestForm.brand.value,
            name: document.forms.requestForm.name.value,
            pageAmount: document.forms.requestForm.pageAmount.value,
            cover: document.forms.requestForm.cover.value,
            country: document.forms.requestForm.country.value,
            pageType: document.forms.requestForm.pageType.value,
        },
        success: function (data) {
            let jsonObject = JSON.parse(data);
            document.forms.requestForm.brand.value = jsonObject[0].brand;
            document.forms.requestForm.name.value = jsonObject[0].name;
            document.forms.requestForm.pageAmount.value = jsonObject[0].pageAmount;
            document.forms.requestForm.cover.value = jsonObject[0].cover;
            document.forms.requestForm.country.value = jsonObject[0].country;
            document.forms.requestForm.pageType.value = jsonObject[0].pageType;
        }
    });
}
function selectDeleteListener(id) {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: 'id',
            id: id
        }
    });
}
function drawIdOptions() {
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',         /* Куда пойдет запрос */
        method: 'post',
        dataType: 'html',
        data: {
            subtask: 'requestIds'
        },
        success: function(data){
            let jsonObject = JSON.parse(data);
            addOptions(jsonObject, "selectId");
        }
    });
}
function getOption(id) {
    let option = document.createElement("option");
    option.innerHTML = id;
    return option;
}
function addOptions(values, selectId) {
    for (let i = 0; i < values.length; i ++)
        document.getElementById(selectId).appendChild(getOption(values[i]));
}
function getSelectId() {
    let select = document.createElement("select");
    select.setAttribute("class", "requestInput");
    select.id = "selectId";
    if(subtask === 'update'){
        select.addEventListener("change", function () {
            selectUpdateListener(this.value)
        });
    }else
        select.addEventListener("change", function () {
            selectDeleteListener(this.value)
        });
    return select;
}
function updateDeleteRequestForm() {
    document.getElementById("requestDiv").remove();
    drawDeleteRequestForm();
}

function getSelectPageType() {
    let select = document.createElement("select");
    select.id = "selectPageType";
    select.setAttribute("class", "requestInput");
    $.ajax({
        url: '/Lesson5_AJAX_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            subtask: "uniquePageType",
            value: "pageType"
        },
        success: function(data) {
            let jsonObject = JSON.parse(data);
            addOptions(jsonObject, select.id);
        }
    })
    return select;
}

function drawValueRequestForm(subtask) {
    let div = document.createElement("div");
    div.id = "requestDiv";
    div.setAttribute("class", "requestForm");
    let form = document.createElement("form");
    form.id = "requestForm";
    form.setAttribute("class", "requestForm");
    let input;
    if (subtask === "country")
        input = getInput(subtask);
    else
        input = getSelectPageType();
    let button = getButton();
    form.appendChild(input);
    div.appendChild(form);
    drawTable(div);
    div.appendChild(button);
    document.getElementById("choiceTaskDiv").appendChild(div);
}
function drawPageAmountRequestForm() {
    let div = document.createElement("div");
    div.id = "requestDiv";
    div.setAttribute("class", "requestForm");
    let form = document.createElement("form");
    form.id = "requestForm";
    form.setAttribute("class", "requestForm");
    let minPagesInput = getInput("minPages");
    let maxPagesInput = getInput("maxPages");
    let button = getButton();
    form.appendChild(minPagesInput);
    form.appendChild(maxPagesInput);
    div.appendChild(form);
    drawTable(div);
    div.appendChild(button);
    document.getElementById("choiceTaskDiv").appendChild(div);
}
function drawInsertEditRequestForm() {
    let div = document.createElement("div");
    div.id = "requestDiv";
    div.setAttribute("class", "requestForm");
    let form = document.createElement("form");
    form.id = "requestForm";
    form.setAttribute("class", "requestForm");
    let brand = getInput("brand");
    let name = getInput("name");
    let pageAmount = getInput("pageAmount");
    pageAmount.addEventListener("change", function () {
        pageAmountValidation();
    });
    let cover = getInput("cover");
    cover.addEventListener("change", function () {
        coverValidation();
    });
    let country = getInput("country");
    let pageType = getInput("pageType");
    pageType.addEventListener("change", function () {
        pageTypeValidation();
    });

    if (subtask === "update") {
        let id = getSelectId();
        form.appendChild(id);
        drawIdOptions();
    }
    form.appendChild(brand);
    form.appendChild(name);
    form.appendChild(pageAmount);
    form.appendChild(cover);
    form.appendChild(country);
    form.appendChild(pageType);
    div.appendChild(form);
    let button = getButton()
    div.appendChild(button);
    document.getElementById("choiceTaskDiv").appendChild(div);
    if (subtask === "update")
        selectUpdateListener(1);
}
function drawDeleteRequestForm(){
    let div = document.createElement("div");
    div.id = "requestDiv";
    div.setAttribute("class", "requestForm");
    let form = document.createElement("form");
    form.id = "requestForm";
    form.setAttribute("class", "requestForm");
    let button = getButton();
    // _____________________
    let id = getSelectId();
    form.appendChild(id);
    drawIdOptions();
    // -----------------
    div.appendChild(form);
    div.appendChild(button);
    document.getElementById("choiceTaskDiv").appendChild(div);
}
function drawInsertUpdateRequestForm() {
    let div = document.createElement("div");
    div.id = "requestDiv";
    div.setAttribute("class", "requestForm");
    let form = document.createElement("form");
    form.id = "requestForm";
    form.setAttribute("class", "requestForm");
    let brand = getInput("brand");
    let name = getInput("name");
    let pageAmount = getInput("pageAmount");
    pageAmount.addEventListener("change", function () {
        pageAmountValidation();
    });
    let cover = getInput("cover");
    cover.addEventListener("change", function () {
        coverValidation();
    });
    let country = getInput("country");
    let pageType = getInput("pageType");
    pageType.addEventListener("change", function () {
        pageTypeValidation();
    });

    if (subtask === "update") {
        let id = getSelectId();
        form.appendChild(id);
        drawIdOptions();
    }
    form.appendChild(brand);
    form.appendChild(name);
    form.appendChild(pageAmount);
    form.appendChild(cover);
    form.appendChild(country);
    form.appendChild(pageType);
    div.appendChild(form);
    let button = getButton()
    div.appendChild(button);
    document.getElementById("choiceTaskDiv").appendChild(div);
    if (subtask === "update")
        selectUpdateListener(1);
}

function selectListener(value) {
    if (document.getElementById("choiceTaskDiv").lastChild.id === "requestDiv")
        document.getElementById("choiceTaskDiv").lastChild.remove();
    subtask = value;
    if (value === "country") drawValueRequestForm(subtask);
    if (value === "pageType") drawValueRequestForm(subtask);
    if (value === "pageAmount") drawPageAmountRequestForm();
    if (value === "insert") drawInsertUpdateRequestForm();
    if (value === "update") drawInsertUpdateRequestForm();
    if (value === "delete") drawDeleteRequestForm();
}
function chooseRequests() {
    taskChoice = 4;
    if (document.getElementById("choiceTaskDiv").lastChild.id === "requestDiv")
        document.getElementById("choiceTaskDiv").lastChild.remove();
    document.getElementById("Task4").innerHTML = "<b>Requests</b>";
    document.getElementById("Task5").innerHTML = "Updates";
    subtaskSelectionDraw(taskChoice);
    subtask = "country";
    drawValueRequestForm(subtask);
}
function chooseUpdates() {
    taskChoice = 5
    if (document.getElementById("choiceTaskDiv").lastChild.id === "requestDiv")
        document.getElementById("choiceTaskDiv").lastChild.remove();
    document.getElementById("Task4").innerHTML = "Requests";
    document.getElementById("Task5").innerHTML = "<b>Updates</b>";
    subtaskSelectionDraw(taskChoice);
    subtask = "insert";
    drawInsertUpdateRequestForm(subtask);
}

//Отображение
function drawTable(div){
    let table = document.createElement("table");
    table.id = "responseTable";
    table.setAttribute("class", "responseTable");
    div.appendChild(table);
}
function updateTable(table, jsonObject){
    while (table.lastChild != null)
        table.lastChild.remove();
    for(let i = 0; i < jsonObject.length; i++){
        table.appendChild(getRow(jsonObject[i]));
    }
}
function getCell(value, entity){
    let cell = document.createElement("td");
    if(value === "id") cell.innerHTML = entity.id;
    if(value === "brand") cell.innerHTML = entity.brand;
    if(value === "name") cell.innerHTML = entity.name;
    if(value === "pageType") cell.innerHTML = entity.pageType;
    if(value === "cover") cell.innerHTML = entity.cover;
    if(value === "country") cell.innerHTML = entity.country;
    if(value === "pageAmount") cell.innerHTML = entity.pageAmount;
    cell.setAttribute("class", "cell");
    return cell;
}
function getRow(entity){
    let row = document.createElement("tr");
    row.appendChild(getCell("id", entity));
    row.appendChild(getCell("brand", entity));
    row.appendChild(getCell("name", entity));
    row.appendChild(getCell("pageType", entity));
    row.appendChild(getCell("cover", entity));
    row.appendChild(getCell("country", entity));
    row.appendChild(getCell("pageAmount", entity));
    return row;
}

//Отработка ошибок ввода
function coverValidation() {
    let val = document.getElementById("cover").value;
    console.log(val !== "hard" && val !== "soft");
    if (val !== "hard" && val !== "soft")
        document.getElementById("cover").style.borderColor = "#EA0A0AFF";
    else
        document.getElementById("cover").style.borderColor = "#b2a0a0";
}
function pageTypeValidation() {
    let val = document.getElementById("pageType").value;
    if (val !== "bold" && val !== "lined" && val !== "squared")
        document.getElementById("pageType").style.borderColor = "#EA0A0AFF";
    else
        document.getElementById("pageType").style.borderColor = "#b2a0a0";
}
function pageAmountValidation() {
    let val = document.getElementById("pageAmount").value;
    if (isNaN(val) || val < 2)
        document.getElementById("pageAmount").style.borderColor = "#EA0A0AFF";
    else
        document.getElementById("pageAmount").style.borderColor = "#b2a0a0";
}