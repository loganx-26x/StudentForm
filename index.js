var jpdbUrl = "http://api.login2explore.com:5577";
var jpdbIrl = "/api/irl";
var jpdbIml = "/api/iml";
var studName = "dbstud";
var relation = "allStuds";
var token = "90932371|-3194927169610916|90253165";

$("#studform").focus();

function saveRecNo2LS(jsonObj) {
  var lvData = JSON.parse(jsonObj.data);
  localStorage.setItem("recno", lvData.rec_no);
}

function getStuRollNoAsJsonObj() {
  var studform = $("#studform").val();
  var jsonStr = {
    id: studform,
  };
  return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
  saveRecNo2LS(jsonObj);
  var record = JSON.parse(jsonObj.data).record;
  $("#fullName").val(record.name);
  $("#class").val(record.class);
  $("#birthdate").val(record.studob);
  $("#address").val(record.stuaddress);
  $("#enrollmentDate").val(record.enrollmentDate);
}

function resetForm() {
  $("#rollNo").val("");
  $("#fullName").val("");
  $("#birthDate").val("");
  $("#class").val("");
  $("#address").val("");
  $("#enrollmentDate").val("");
  $("#sturollno").prop(false);
  $("#save").prop(true);
  $("#change").prop(true);
  $("#reset").prop(true);
  $("#studForm").focus();
}

function validateData() {
  var sturollno, stuname, stuclass, studob, stuaddress, stuenrolldate;
  sturollno = $("#rollno").val();
  stuname = $("#fullName").val();
  stuclass = $("#class").val();
  studob = $("#birthDate").val();
  stuaddress = $("#address").val();
  stuenrolldate = $("#enrollmentDate").val();

  if (sturollno === "") {
    alert("Student ID missing");
    $("#rollNo").focus();
    return "";
  }
  if (stuname === "") {
    alert("Student Name missing");
    $("#fullName").focus();
    return "";
  }
  if (stuclass === "") {
    alert("Student Class missing");
    $("#class").focus();
    return "";
  }
  if (studob === "") {
    alert("Student Birth Date is missing");
    $("#birthdate").focus();
    return "";
  }
  if (stuaddress === "") {
    alert("Student Address missing");
    $("#address").focus();
    return "";
  }
  if (stuenrolldate === "") {
    alert("Student Enrollment Date missing");
    $("#enrollmentDate").focus();
    return "";
  }

  var jsonStrObj = {
    id: sturollno,
    name: stuname,
    salary: stuclass,
    studob: studob,
    stuaddress: stuaddress,
    deduction: stuenrolldate,
  };

  return JSON.stringify(jsonStrObj);
}

function saveData() {
  var jsonStrObj = validateData();

  if (jsonStrObj === "") {
    return "";
  }

  var putRequest = createPUTRequest(
    token,
    jsonStrObj,
    studName,
    relation
  );

  jQuery.ajaxSetup({ async: false });

  var resJsonObj = executeCommandAtGivenBaseUrl(
    putRequest,
    jpdbUrl,
    jpdbIml
  );

  jQuery.ajaxSetup({ async: true });

  resetForm();
  $("#studForm").focus();
}

function getStu() {
  var sturollnoJsonObj = getStuRollNoAsJsonObj();
  var getRequest = createGET_BY_KEYRequest(
    token,
    studName,
    relation,
    stuRollNoJsonObj
  );
  jQuery.ajaxSetup({ async: false });

  var resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    jpdbUrl,
    jpdbURL
  );
  jQuery.ajaxSetup({ async: true });

  if (resJsonObj.status === 400) {
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
  } else if (res.JsonObj.status == 200) {
    $("#rollNo").prop("disabled", true);
    fillData(resJsonObj);

    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
  }
  $("#stuname").focus();
}

function changeData() {
  $("#change").prop("disabled", true);
  jsonChg = validateData();
  var updateRequest = createUPDATERecord(
    token,
    jsonChg,
    studName,
    relation,
    localStorage.getItem("recno")
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    updateRequest,
    jpdbUrl,
    jpdbIml
  );

  resetForm();
  $("#studForm").focus();
}
