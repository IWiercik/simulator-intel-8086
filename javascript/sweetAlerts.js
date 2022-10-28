function showingSweetAlert(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    iconColor: "#30a702",
    confirmButtonText: "Ok!",
  });
}
