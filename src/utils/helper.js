import swal from "sweetalert";

const showSwal = (title, icon, buttons) => {
  return swal({ title, icon, buttons });
};
export { showSwal };
