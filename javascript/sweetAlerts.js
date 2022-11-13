function showingSweetAlert(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    iconColor: "#30a702",
    confirmButtonText: "Ok!",
  });
}
function showingOperationsResult(operation,firstValueBefore,secondValueBefore,firstValueAfter,secondValueAfter){
  Swal.fire({
    html:`
    <div class="sweet-alert-result-wrapper">
      <h1>Operation: <span class="green-string">${operation}</span> </h1> 
      <h2>Before:</h2>
      <div class="results-wrapper">
        <div>${firstValueBefore.name}:<span class="green-string">${firstValueBefore.value}</span></div>
        ${secondValueAfter.value ? `<div>${secondValueBefore.name}: <span class="green-string">${secondValueBefore.value}</span></div>` : ""}
      </div>
      <h2>After:</h2>
      <div class="results-wrapper">
      <div>${firstValueAfter.name}:<span class="green-string">${firstValueAfter.value}</span></div>
      ${secondValueAfter.value ? `<div>${secondValueAfter.name}: <span class="green-string">${secondValueAfter.value}</span></div>` : ""}
      </div>
    </div>
    `,
  })
}